package com.nrgcontrol.energy_monitoring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nrgcontrol.energy_monitoring.model.Dispositivo;

public interface DispositivoRepository extends JpaRepository<Dispositivo, Long> {
    List<Dispositivo> findByTipoDispositivoId(Long tipoDispositivoId);
    List<Dispositivo> findByNomeContaining(String nome);
    List<Dispositivo> findByModeloContaining(String modelo);
    List<Dispositivo> findByTipoDispositivoNomeContaining(String tipoDispositivoNome);
}