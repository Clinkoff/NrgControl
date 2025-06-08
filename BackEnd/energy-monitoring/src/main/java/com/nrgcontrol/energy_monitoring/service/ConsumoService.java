package com.nrgcontrol.energy_monitoring.service;

import com.nrgcontrol.energy_monitoring.model.Consumo;
import com.nrgcontrol.energy_monitoring.repository.ConsumoRepository;
import oshi.SystemInfo;
import oshi.hardware.CentralProcessor;
import oshi.hardware.HardwareAbstractionLayer;
import oshi.hardware.PowerSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

@Service
public class ConsumoService {

    private static final Logger logger = LoggerFactory.getLogger(ConsumoService.class);

    private final SystemInfo si = new SystemInfo();
    private final HardwareAbstractionLayer hal = si.getHardware();
    private final ConsumoRepository consumoRepository;

    @Value("${energy.tarifa-kwh:0.75}") // R$ 0,75 por kWh (média Brasil)
    private double tarifaKwh;

    @Value("${energy.cpu-max-power:90.0}")
    private double maxPowerCpu;

    @Value("${energy.gpu-max-power:240.0}")
    private double maxPowerGpu;

    @Value("${energy.cpu-idle-power:12.0}")
    private double basePowerCpuIdle;

    @Value("${energy.gpu-idle-power:15.0}")
    private double basePowerGpuIdle;

    private static final double MEMORY_POWER_PER_GB = 0.75;
    private static final double BASE_POWER_OTHER = 20.0;
    private static final double LOAD_FACTOR_OTHER = 10.0;

    @Autowired
    public ConsumoService(ConsumoRepository consumoRepository) {
        this.consumoRepository = consumoRepository;
    }

    public Consumo getConsumoDetalhado() {
        CentralProcessor processor = hal.getProcessor();
        long memoryUsageBytes = hal.getMemory().getTotal() - hal.getMemory().getAvailable();
        double cpuUsage = getCpuUsagePercent(processor);
        double totalPower = estimateTotalPower(cpuUsage, memoryUsageBytes);
        
        validatePowerEstimate(totalPower);
        
        Double powerFromSensors = getPowerFromSensors();

        Consumo consumo = new Consumo(cpuUsage, memoryUsageBytes, totalPower, powerFromSensors);
        
        double custoHora = calcularCustoEstimado(totalPower);
        consumo.setCustoEstimado(custoHora);
        
        String loadProfile = detectLoadProfile(cpuUsage, memoryUsageBytes);
        consumo.setLoadProfile(loadProfile);
        
        consumoRepository.save(consumo);
        return consumo;
    }

    @Cacheable(value = "consumo-cache", key = "#startDate + '-' + #endDate", 
               condition = "#endDate.isBefore(T(java.time.LocalDateTime).now().minusHours(1))")
    public List<Consumo> getConsumoByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return consumoRepository.findByDateRange(startDate, endDate);
    }

    public Double getAveragePowerByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        Double average = consumoRepository.findAveragePowerByDateRange(startDate, endDate);
        return average != null ? average : 0.0;
    }

    public Double getTotalPowerByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        List<Consumo> consumos = consumoRepository.findByDateRange(startDate, endDate);
        if (consumos.isEmpty()) return 0.0;

        return calculateEnergyWithInterpolation(consumos);
    }

    // MÉTODO PARA CALCULAR CUSTO 
    public double calcularCustoEstimado(double energiaWh) {
        // Converte Wh para kWh e multiplica pela tarifa
        double energiaKwh = energiaWh / 1000.0;
        return energiaKwh * tarifaKwh;
    }

    public double calcularCustoPeriodo(LocalDateTime startDate, LocalDateTime endDate) {
        Double totalEnergy = getTotalPowerByDateRange(startDate, endDate);
        return calcularCustoEstimado(totalEnergy != null ? totalEnergy : 0.0);
    }

    private double getCpuUsagePercent(CentralProcessor processor) {
        long[][] prevTicks = processor.getProcessorCpuLoadTicks();
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        double[] load = processor.getProcessorCpuLoadBetweenTicks(prevTicks);
        return load[0] * 100;
    }

    private double estimateTotalPower(double cpuUsage, long memoryUsageBytes) {

        double cpuLoadFactor = cpuUsage / 100.0;
        double cpuPower = basePowerCpuIdle + (maxPowerCpu - basePowerCpuIdle) * Math.pow(cpuLoadFactor, 1.5);

        double gpuLoadFactor = Math.min(cpuLoadFactor * 1.2, 1.0);
        double gpuPower = basePowerGpuIdle + (maxPowerGpu - basePowerGpuIdle) * gpuLoadFactor;

        double memoryUsageGB = memoryUsageBytes / (1024.0 * 1024 * 1024);
        double memoryPower = memoryUsageGB * MEMORY_POWER_PER_GB;

        double otherPower = BASE_POWER_OTHER + (LOAD_FACTOR_OTHER * cpuLoadFactor);

        return cpuPower + gpuPower + memoryPower + otherPower;
    }

    private double calculateEnergyWithInterpolation(List<Consumo> consumos) {
        if (consumos.size() < 2) return 0.0;
        
        consumos.sort(Comparator.comparing(Consumo::getTimestamp));
        double totalEnergy = 0.0;
        
        for (int i = 1; i < consumos.size(); i++) {
            Consumo prev = consumos.get(i-1);
            Consumo current = consumos.get(i);
            
            Duration duration = Duration.between(prev.getTimestamp(), current.getTimestamp());
            double hours = duration.getSeconds() / 3600.0;
            
            // Média entre duas medições para maior precisão
            double avgPower = (prev.getTotalPowerWatts() + current.getTotalPowerWatts()) / 2.0;
            totalEnergy += avgPower * hours;
        }
        
        return totalEnergy;
    }

    private void validatePowerEstimate(double power) {
        if (power < 10 || power > 500) {
            logger.warn("Estimativa de energia suspeita: {}W - Verifique os sensores", power);
        }
        if (power < 0) {
            logger.error("Estimativa de energia negativa: {}W - Erro nos cálculos", power);
        }
    }

    private String detectLoadProfile(double cpuUsage, long memoryUsageBytes) {
        double memoryUsageGB = memoryUsageBytes / (1024.0 * 1024 * 1024);
        
        if (cpuUsage < 10 && memoryUsageGB < 4) {
            return "IDLE";
        } else if (cpuUsage > 80 && memoryUsageGB > 8) {
            return "RENDERING";
        } else if (cpuUsage > 50 || memoryUsageGB > 6) {
            return "GAMING";
        } else {
            return "OFFICE";
        }
    }

    private double getPowerFromSensors() {
        List<PowerSource> powerSources = hal.getPowerSources();
        if (!powerSources.isEmpty()) {
            PowerSource powerSource = powerSources.get(0);
            double powerUsageRate = powerSource.getPowerUsageRate();
            return powerUsageRate > 0 ? powerUsageRate : 0.0;
        }
        return 0.0;
    }
}