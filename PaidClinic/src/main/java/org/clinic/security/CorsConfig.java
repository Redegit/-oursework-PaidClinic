package org.clinic.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Класс конфигурации для Cross-Origin Resource Sharing (CORS).
 * Позволяет настроить доступ к ресурсам с других источников.
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    /**
     * Регистрирует отображения CORS-запросов.
     * Разрешены любые источники.
     * Разрешены методы "GET", "POST", "PUT", "DELETE".
     * Разрешены любые заголовки.
     *
     * @param registry Реестр CORS-отображений.
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .maxAge(3600);
    }
}