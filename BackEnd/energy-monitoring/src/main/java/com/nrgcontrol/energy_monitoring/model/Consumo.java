package com.nrgcontrol.energy_monitoring.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "consumo", indexes = {@Index(name = "idx_timestamp", columnList = "timestamp")})
public class Consumo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private double cpuUsagePercent;

    @Column(nullable = false)
    private long memoryUsageBytes;

    @Column(nullable = false)
    private double totalPowerWatts;

    @Column(nullable = true)
    private Double powerFromSensors; // Double para suportar NULL no MySQL

    @Column(nullable = false)
    private LocalDateTime timestamp;

    public Consumo() {
    }

    public Consumo(double cpuUsagePercent, long memoryUsageBytes, double totalPowerWatts, Double powerFromSensors) {
        this.cpuUsagePercent = cpuUsagePercent;
        this.memoryUsageBytes = memoryUsageBytes;
        this.totalPowerWatts = totalPowerWatts;
        this.powerFromSensors = powerFromSensors;
        this.timestamp = LocalDateTime.now();
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getCpuUsagePercent() {
        return cpuUsagePercent;
    }

    public void setCpuUsagePercent(double cpuUsagePercent) {
        this.cpuUsagePercent = cpuUsagePercent;
    }

    public long getMemoryUsageBytes() {
        return memoryUsageBytes;
    }

    public void setMemoryUsageBytes(long memoryUsageBytes) {
        this.memoryUsageBytes = memoryUsageBytes;
    }

    public double getTotalPowerWatts() {
        return totalPowerWatts;
    }

    public void setTotalPowerWatts(double totalPowerWatts) {
        this.totalPowerWatts = totalPowerWatts;
    }

    public Double getPowerFromSensors() {
        return powerFromSensors;
    }

    public void setPowerFromSensors(Double powerFromSensors) {
        this.powerFromSensors = powerFromSensors;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}