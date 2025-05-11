package com.nrgcontrol.energy_monitoring.repository;

import com.nrgcontrol.energy_monitoring.model.Consumo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ConsumoRepository extends JpaRepository<Consumo, Long> {

    @Query("SELECT c FROM Consumo c WHERE c.timestamp >= :startDate AND c.timestamp < :endDate")
    List<Consumo> findByDateRange(LocalDateTime startDate, LocalDateTime endDate);

    @Query("SELECT AVG(c.totalPowerWatts) FROM Consumo c WHERE c.timestamp >= :startDate AND c.timestamp < :endDate")
    Double findAveragePowerByDateRange(LocalDateTime startDate, LocalDateTime endDate);
}