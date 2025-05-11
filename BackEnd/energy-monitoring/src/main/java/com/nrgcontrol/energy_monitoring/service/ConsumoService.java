package com.nrgcontrol.energy_monitoring.service;

import com.nrgcontrol.energy_monitoring.model.Consumo;
import com.nrgcontrol.energy_monitoring.repository.ConsumoRepository;
import oshi.SystemInfo;
import oshi.hardware.CentralProcessor;
import oshi.hardware.HardwareAbstractionLayer;
import oshi.hardware.PowerSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

@Service
public class ConsumoService {

    private final SystemInfo si = new SystemInfo();
    private final HardwareAbstractionLayer hal = si.getHardware();
    private final ConsumoRepository consumoRepository;

    private static final double BASE_POWER_CPU_IDLE = 20.0;
    private static final double MAX_POWER_CPU = 100.0;
    private static final double MEMORY_POWER_PER_GB = 3.0;

    @Autowired
    public ConsumoService(ConsumoRepository consumoRepository) {
        this.consumoRepository = consumoRepository;
    }

    public Consumo getConsumoDetalhado() {
        CentralProcessor processor = hal.getProcessor();
        long memoryUsageBytes = hal.getMemory().getTotal() - hal.getMemory().getAvailable();
        double cpuUsage = getCpuUsagePercent(processor);
        double powerFromSensors = getPowerFromSensors();
        double totalPower = estimateTotalPower(cpuUsage, memoryUsageBytes);

        Consumo consumo = new Consumo(cpuUsage, memoryUsageBytes, totalPower, powerFromSensors);
        consumoRepository.save(consumo);

        return new Consumo(cpuUsage, memoryUsageBytes, totalPower, powerFromSensors);
    }

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

        // Ordena por timestamp para garantir a sequência correta
        consumos.sort(Comparator.comparing(Consumo::getTimestamp));

        double totalEnergy = 0.0;
        LocalDateTime prevTimestamp = consumos.get(0).getTimestamp();

        for (Consumo consumo : consumos) {
            Duration duration = Duration.between(prevTimestamp, consumo.getTimestamp());
            double timeHours = duration.getSeconds() / 3600.0; // Converte para horas
            totalEnergy += consumo.getTotalPowerWatts() * timeHours; // Acumula em Watt-horas
            prevTimestamp = consumo.getTimestamp();
        }

        return totalEnergy;
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
        double cpuPower = BASE_POWER_CPU_IDLE + (cpuUsage / 100) * (MAX_POWER_CPU - BASE_POWER_CPU_IDLE);
        double memoryUsageGB = memoryUsageBytes / (1024.0 * 1024 * 1024);
        double memoryPower = memoryUsageGB * MEMORY_POWER_PER_GB;
        return cpuPower + memoryPower;
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