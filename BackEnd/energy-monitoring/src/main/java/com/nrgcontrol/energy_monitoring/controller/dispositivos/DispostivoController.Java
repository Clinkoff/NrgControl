package com.nrgcontrol.energy_monitoring.controller;

import com.nrgcontrol.energy_monitoring.model.Dispositivo;
import com.nrgcontrol.energy_monitoring.model.TipoDispositivo;
import com.nrgcontrol.energy_monitoring.model.ConsumoDispositivo;
import com.nrgcontrol.energy_monitoring.repository.DispositivoRepository;
import com.nrgcontrol.energy_monitoring.repository.TipoDispositivoRepository;
import com.nrgcontrol.energy_monitoring.repository.ConsumoDispositivoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dispositivos")
public class DispositivoController {

    @Autowired
    private DispositivoRepository dispositivoRepository;

    @Autowired
    private TipoDispositivoRepository tipoDispositivoRepository;

    @Autowired
    private ConsumoDispositivoRepository consumoDispositivoRepository;

    @GetMapping
    public List<Dispositivo> getAllDispositivos() {
        return dispositivoRepository.findAll();
    }

    @PostMapping
    public Dispositivo createDispositivo(@RequestBody Dispositivo dispositivo) {
        return dispositivoRepository.save(dispositivo);
    }

    @GetMapping("/tipos")
    public List<TipoDispositivo> getAllTiposDispositivo() {
        return tipoDispositivoRepository.findAll();
    }

    @PostMapping("/tipos")
    public TipoDispositivo createTipoDispositivo(@RequestBody TipoDispositivo tipoDispositivo) {
        return tipoDispositivoRepository.save(tipoDispositivo);
    }

    @GetMapping("/{dispositivoId}/consumos")
    public List<ConsumoDispositivo> getConsumosByDispositivo(@PathVariable Long dispositivoId) {
        return consumoDispositivoRepository.findByDispositivoId(dispositivoId); // Adicione esse método no repositório se necessário
    }

    @PostMapping("/{dispositivoId}/consumos")
    public ConsumoDispositivo createConsumo(@PathVariable Long dispositivoId, @RequestBody ConsumoDispositivo consumo) {
        Dispositivo dispositivo = dispositivoRepository.findById(dispositivoId)
            .orElseThrow(() -> new RuntimeException("Dispositivo não encontrado"));
        consumo.setDispositivo(dispositivo);
        return consumoDispositivoRepository.save(consumo);
    }
}