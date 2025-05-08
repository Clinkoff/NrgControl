package com.nrgcontrol.energy_monitoring.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name ="usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String senha_hash;

    @Column(name = "criado_em", nullable = false, updatable = false)
    private LocalDateTime criado_em;

    @Column(name = "atualizado_em")
    private LocalDateTime atualizado_em;

    @Column(name = "verificado_em")
    private LocalDateTime verificado_em;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    // Construtor
    public Usuario() {
        this.criado_em = LocalDateTime.now();
        this.status = Status.ATIVO;
    }

    public Usuario(String nome, String email, String senha_hash) {
        this();
        this.nome = nome;
        this.email = email;
        this.senha_hash = senha_hash;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha_hash() {
        return senha_hash;
    }

    public void setSenha_hash(String senha_hash) {
        this.senha_hash = senha_hash;
    }

    public LocalDateTime getCriado_em() {
        return criado_em;
    }

    public LocalDateTime getAtualizado_em() {
        return atualizado_em;
    }

    public void setAtualizado_em(LocalDateTime atualizado_em) {
        this.atualizado_em = atualizado_em;
    }

    public LocalDateTime getVerificado_em() {
        return verificado_em;
    }

    public void setVerificado_em(LocalDateTime verificado_em) {
        this.verificado_em = verificado_em;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

   
    public boolean validarSenha(String senha) {
        // Implemente a lógica de validação de senha (ex: comparar com o hash armazenado)
        return this.senha_hash.equals(senha); // Implementação temporária - substitua por técnicas adequadas de hash em produção
    }

    // Enum para status
    public enum Status {
        ATIVO, INATIVO
    }
}

