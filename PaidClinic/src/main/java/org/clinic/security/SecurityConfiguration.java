package org.clinic.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Конфигурация безопасности приложения, включая фильтры аутентификации, авторизации и установку правил доступа.
 * Для обеспечения безопасности, применяется фильтр аутентификации на основе токена JWT, а также установка правил
 * доступа на основе ролей пользователя. Данный класс содержит настройки Spring Security, необходимые для
 * работы с различными запросами на основе конкретных правил доступа.
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    /**
     * Фильтр аутентификации на основе токена JWT.
     */
    private final JwtAuthenticationFilter jwtAuthFilter;

    /**
     * Провайдер аутентификации, используемый для проверки правильности логина и пароля.
     */
    private final AuthenticationProvider authenticationProvider;

    /**
     * Создание цепочки фильтров для обработки запросов с учетом правил доступа. В частности, включает
     * установку правил доступа на основе ролей пользователя и настройку фильтров аутентификации.
     *
     * @param http - объект, представляющий настройки безопасности HTTP-запросов.
     * @return объект типа SecurityFilterChain - цепочка фильтров, обрабатывающая запросы с учетом правил доступа.
     * @throws Exception если возникает ошибка при настройке цепочки фильтров безопасности.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .cors().and()
                .authorizeHttpRequests()
                .requestMatchers("/api/auth/**",
                        "/api/doctors/getwithspecs",
                        "/api/services/getwithspecs").permitAll()
                .requestMatchers("/api/patients/get/**",
                        "/api/patients/update/**",
                        "/api/appointments/extended_info/**",
                        "/api/doctors/specializations",
                        "/api/services/getbyspec/**",
                        "/api/doctors/getbyspec/**",
                        "/api/appointments/create").hasAnyAuthority("USER", "ADMIN")
                .anyRequest().hasAuthority("ADMIN")
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}