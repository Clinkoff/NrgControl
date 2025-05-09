package com.nrgcontrol.energy_monitoring.model;

import jakarta.persistence.*;

@Entity
public class ConsumoDispositivo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double consumo; // Em kWh
    private String dataRegistro;

    @ManyToOne
    @JoinColumn(name = "dispositivo_id")
    private Dispositivo dispositivo;

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Double getConsumo() { return consumo; }
    public void setConsumo(Double consumo) { this.consumo = consumo; }
    public String getDataRegistro() { return dataRegistro; }
    public void setDataRegistro(String dataRegistro) { this.dataRegistro = dataRegistro; }
    public Dispositivo getDispositivo() { return dispositivo; }
    public void setDispositivo(Dispositivo dispositivo) { this.dispositivo = dispositivo; }
}