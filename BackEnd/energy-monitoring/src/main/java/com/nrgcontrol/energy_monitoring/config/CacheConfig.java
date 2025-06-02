package com.nrgcontrol.energy_monitoring.config;

import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableCaching
public class CacheConfig {
    // Melhoria 9: Habilitar cache no Spring Boot
    // Esta classe só precisa existir com as anotações acima
    // O Spring Boot vai configurar automaticamente o cache simples
}