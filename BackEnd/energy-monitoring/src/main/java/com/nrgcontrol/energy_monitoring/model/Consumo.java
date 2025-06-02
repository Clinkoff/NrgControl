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
    private Double powerFromSensors;

    @Column(nullable = false)
    private LocalDateTime timestamp;

    // NOVOS CAMPOS OPCIONAIS - O Hibernate vai criar automaticamente
    @Column(nullable = true, length = 20)
    private String loadProfile; // IDLE, OFFICE, GAMING, RENDERING

    @Column(nullable = true)
    private Double temperatureCpu; // Temperatura da CPU se disponível

    @Column(nullable = true)
    private Integer processCount; // Número de processos ativos

    @Column(nullable = true, name = "custo_estimado")
    private Double custoEstimado; // Custo estimado por hora baseado no consumo atual

    // Construtores
    public Consumo() {
    }

    // Construtor original (mantém compatibilidade)
    public Consumo(double cpuUsagePercent, long memoryUsageBytes, double totalPowerWatts, Double powerFromSensors) {
        this.cpuUsagePercent = cpuUsagePercent;
        this.memoryUsageBytes = memoryUsageBytes;
        this.totalPowerWatts = totalPowerWatts;
        this.powerFromSensors = powerFromSensors;
        this.timestamp = LocalDateTime.now();
    }

    // Construtor completo (opcional)
    public Consumo(double cpuUsagePercent, long memoryUsageBytes, double totalPowerWatts, 
                   Double powerFromSensors, String loadProfile, Double temperatureCpu, 
                   Integer processCount, Double custoEstimado) {
        this.cpuUsagePercent = cpuUsagePercent;
        this.memoryUsageBytes = memoryUsageBytes;
        this.totalPowerWatts = totalPowerWatts;
        this.powerFromSensors = powerFromSensors;
        this.loadProfile = loadProfile;
        this.temperatureCpu = temperatureCpu;
        this.processCount = processCount;
        this.custoEstimado = custoEstimado;
        this.timestamp = LocalDateTime.now();
    }

    // Getters e Setters existentes
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

    // Getters e Setters dos novos campos
    public String getLoadProfile() {
        return loadProfile;
    }

    public void setLoadProfile(String loadProfile) {
        this.loadProfile = loadProfile;
    }

    public Double getTemperatureCpu() {
        return temperatureCpu;
    }

    public void setTemperatureCpu(Double temperatureCpu) {
        this.temperatureCpu = temperatureCpu;
    }

    public Integer getProcessCount() {
        return processCount;
    }

    public void setProcessCount(Integer processCount) {
        this.processCount = processCount;
    }

    public Double getCustoEstimado() {
        return custoEstimado;
    }

    public void setCustoEstimado(Double custoEstimado) {
        this.custoEstimado = custoEstimado;
    }
}