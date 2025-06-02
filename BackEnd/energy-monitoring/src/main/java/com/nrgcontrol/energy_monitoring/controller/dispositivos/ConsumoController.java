package com.nrgcontrol.energy_monitoring.controller.dispositivos;

import com.nrgcontrol.energy_monitoring.model.Consumo;
import com.nrgcontrol.energy_monitoring.service.ConsumoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/consumo")
public class ConsumoController {

    @Autowired
    private ConsumoService consumoService;

    // GET /api/consumo/detalhado
    @GetMapping("/detalhado")
    public Consumo getConsumoDetalhado() {
        return consumoService.getConsumoDetalhado();
    }

    // GET /api/consumo/atual
    @GetMapping("/atual")
    public Map<String, Object> getConsumoAtual() {
        Consumo consumo = consumoService.getConsumoDetalhado();
        Map<String, Object> response = new HashMap<>();
        response.put("consumoWatts", consumo.getTotalPowerWatts());

        double custoHora = consumoService.calcularCustoEstimado(consumo.getTotalPowerWatts());
        response.put("custoEstimadoPorHora", custoHora);
        response.put("custoEstimadoPorDia", custoHora * 24);

        return response;
    }

    // GET /api/consumo/historico?start=...&end=...
    @GetMapping("/historico")
    public List<Consumo> getConsumoHistorico(
            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        return consumoService.getConsumoByDateRange(startDate, endDate);
    }

    // GET /api/consumo/media?start=...&end=...
    @GetMapping("/media")
    public Map<String, Object> getMediaConsumo(
            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        Double media = consumoService.getAveragePowerByDateRange(startDate, endDate);
        return Map.of("mediaWatts", media != null ? media : 0.0);
    }

    // GET /api/consumo/total?start=...&end=...
    @GetMapping("/total")
    public Map<String, Object> getTotalConsumo(
            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        Double total = consumoService.getTotalPowerByDateRange(startDate, endDate);
        return Map.of("totalWatts", total != null ? total : 0.0);
    }

    // GET /api/consumo/custo?start=...&end=...
    @GetMapping("/custo")
    public Map<String, Object> getCustoPeriodo(
            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {

        Double totalEnergia = consumoService.getTotalPowerByDateRange(startDate, endDate);
        Double custoTotal = consumoService.calcularCustoPeriodo(startDate, endDate);
        Double mediaConsumo = consumoService.getAveragePowerByDateRange(startDate, endDate);

        Map<String, Object> response = new HashMap<>();
        response.put("energiaTotal", totalEnergia != null ? totalEnergia : 0.0);
        response.put("custoTotal", custoTotal != null ? custoTotal : 0.0);
        response.put("consumoMedio", mediaConsumo != null ? mediaConsumo : 0.0);
        response.put("periodo", Map.of("inicio", startDate, "fim", endDate));

        return response;
    }

    // GET /api/consumo/resumo-diario
    @GetMapping("/resumo-diario")
    public Map<String, Object> getResumoDiario() {
        LocalDateTime inicioDia = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
        LocalDateTime agora = LocalDateTime.now();

        Double consumoMedio = consumoService.getAveragePowerByDateRange(inicioDia, agora);
        Double consumoTotal = consumoService.getTotalPowerByDateRange(inicioDia, agora);
        Double custoAteAgora = consumoService.calcularCustoPeriodo(inicioDia, agora);

        long horasPassadas = java.time.Duration.between(inicioDia, agora).toHours();
        if (horasPassadas == 0) horasPassadas = 1;

        double projecaoDia = (consumoTotal != null ? consumoTotal : 0.0) * (24.0 / horasPassadas);
        double projecaoCustoDia = consumoService.calcularCustoEstimado(projecaoDia);

        return Map.of(
            "consumoMedio", consumoMedio != null ? consumoMedio : 0.0,
            "consumoTotalHoje", consumoTotal != null ? consumoTotal : 0.0,
            "custoAteAgora", custoAteAgora,
            "projecaoConsumoCompleto", projecaoDia,
            "projecaoCustoCompleto", projecaoCustoDia,
            "horasMonitoradas", horasPassadas
        );
    }

    // GET /api/consumo/resumo-semanal
    @GetMapping("/resumo-semanal")
    public Map<String, Object> getResumoSemanal() {
        LocalDateTime umaSemanaAtras = LocalDateTime.now().minusDays(7);
        LocalDateTime agora = LocalDateTime.now();

        Double consumoMedio = consumoService.getAveragePowerByDateRange(umaSemanaAtras, agora);
        Double consumoTotal = consumoService.getTotalPowerByDateRange(umaSemanaAtras, agora);
        Double custoSemana = consumoService.calcularCustoPeriodo(umaSemanaAtras, agora);

        return Map.of(
            "consumoMedio", consumoMedio != null ? consumoMedio : 0.0,
            "consumoTotal", consumoTotal != null ? consumoTotal : 0.0,
            "custoTotal", custoSemana != null ? custoSemana : 0.0,
            "mediaPorDia", (consumoTotal != null ? consumoTotal : 0.0) / 7.0,
            "custoPorDia", (custoSemana != null ? custoSemana : 0.0) / 7.0
        );
    }
}
