package com.nrgcontrol.energy_monitoring.controller.dispositivos;

import com.nrgcontrol.energy_monitoring.model.Consumo;

import com.nrgcontrol.energy_monitoring.service.ConsumoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/consumo")
public class ConsumoController {

    @Autowired
    private ConsumoService consumoService;

    @GetMapping
    public Consumo getConsumoDetalhado() {
        return consumoService.getConsumoDetalhado();
    }

    @GetMapping("/historico")
    public List<Consumo> getConsumoHistorico(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        return consumoService.getConsumoByDateRange(startDate, endDate);
    }

    @GetMapping("/media")
    public Double getMediaConsumo(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        return consumoService.getAveragePowerByDateRange(startDate, endDate);
    }

    @GetMapping("/total")
    public Double getTotalConsumo(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        return consumoService.getTotalPowerByDateRange(startDate, endDate);
    }
}