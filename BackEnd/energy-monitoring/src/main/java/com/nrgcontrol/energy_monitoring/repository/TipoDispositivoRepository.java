package com.nrgcontrol.energy_monitoring.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nrgcontrol.energy_monitoring.model.TipoDispositivo;

public interface TipoDispositivoRepository extends JpaRepository<TipoDispositivo, Long> {
    // Métodos adicionais de consulta podem ser definidos aqui, se necessário
    TipoDispositivo findByNome(String nome);
    TipoDispositivo findByConsumoMedio(Double consumoMedio);
}
