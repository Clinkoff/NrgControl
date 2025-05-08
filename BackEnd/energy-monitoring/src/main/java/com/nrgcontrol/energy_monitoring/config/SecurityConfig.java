package com.nrgcontrol.energy_monitoring.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.nrgcontrol.energy_monitoring.model.Usuario;
import com.nrgcontrol.energy_monitoring.repository.UsuarioRepository;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
@Autowired
    private UsuarioRepository usuarioRepository;

    @SuppressWarnings("removal")
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable() // Desativa CSRF para simplificar testes (não use em produção)
            .authorizeHttpRequests(authorizeRequests ->
                authorizeRequests
                    .requestMatchers("/api/usuarios/**", "/login").permitAll() // Permite acesso público
                    .anyRequest().authenticated()
            )
            .formLogin().permitAll() // Habilita o login padrão
            .and()
            .logout().permitAll();
        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return email -> {
            Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado: " + email));
            return org.springframework.security.core.userdetails.User
                .withUsername(email)
                .password(usuario.getSenha_hash())
                .roles("USER")
                .build();
        };
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}