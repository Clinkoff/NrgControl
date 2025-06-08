package com.nrgcontrol.energy_monitoring.controller.usuario;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nrgcontrol.energy_monitoring.model.Usuario;
import com.nrgcontrol.energy_monitoring.service.UsuarioService;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public Usuario criarUsuario(@RequestParam String nome, @RequestParam String email,
            @RequestParam String senha_hash) {
        return usuarioService.criarUsuario(nome, email, senha_hash);
    }

    @GetMapping("/{id}")
    public Usuario getUsuario(@PathVariable int id) {
        return usuarioService.encontrarPorId(id);
    }

    @GetMapping("/protegido")
    public ResponseEntity<Map<String, String>> protegido() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Accesso concedido");
        return ResponseEntity.ok(response);
    }
}
