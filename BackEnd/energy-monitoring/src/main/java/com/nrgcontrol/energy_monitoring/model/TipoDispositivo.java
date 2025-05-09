package com.nrgcontrol.energy_monitoring.model;

import jakarta.persistence.*;

@Entity
public class TipoDispositivo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private Double consumoMedio; // Em kWh, por exemplo

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public Double getConsumoMedio() { return consumoMedio; }
    public void setConsumoMedio(Double consumoMedio) { this.consumoMedio = consumoMedio; }
}