package com.nrgcontrol.energy_monitoring.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.nrgcontrol.energy_monitoring.model.Usuario;
import com.nrgcontrol.energy_monitoring.repository.UsuarioRepository;

@Service
public class UsuarioService {
   @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public Usuario criarUsuario(String nome, String email, String senha_hash) {
        Usuario usuario = new Usuario(nome, email, passwordEncoder.encode(senha_hash));
        return usuarioRepository.save(usuario);
    }

    public Usuario encontrarPorId(int id) {
        return usuarioRepository.findById(id).orElse(null);
    }
}