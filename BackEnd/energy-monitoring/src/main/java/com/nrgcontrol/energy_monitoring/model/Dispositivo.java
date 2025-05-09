package com.nrgcontrol.energy_monitoring.model;

import java.util.List;

import jakarta.persistence.*;

@Entity
public class Dispositivo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String modelo;

    @ManyToOne
    @JoinColumn(name = "tipo_dispositivo_id")
    private TipoDispositivo tipoDispositivo;

    @OneToMany(mappedBy = "dispositivo")
    private List<ConsumoDispositivo> consumos;

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getModelo() { return modelo; }
    public void setModelo(String modelo) { this.modelo = modelo; }
    public TipoDispositivo getTipoDispositivo() { return tipoDispositivo; }
    public void setTipoDispositivo(TipoDispositivo tipoDispositivo) { this.tipoDispositivo = tipoDispositivo; }
    public List<ConsumoDispositivo> getConsumos() { return consumos; }
    public void setConsumos(List<ConsumoDispositivo> consumos) { this.consumos = consumos; }
}