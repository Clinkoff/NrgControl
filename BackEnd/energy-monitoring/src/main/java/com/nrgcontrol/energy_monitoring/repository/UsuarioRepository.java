package com.nrgcontrol.energy_monitoring.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nrgcontrol.energy_monitoring.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    
    Optional<Usuario> findByEmail(String email);
}