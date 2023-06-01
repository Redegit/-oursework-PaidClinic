package org.clinic.security;

import lombok.RequiredArgsConstructor;
import org.clinic.security.user.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Класс конфигурации Spring, содержащий настройки приложения
 */
@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    /**
     * Репозиторий пользователей
     */
    private final UserRepository userRepository;

    /**
     * Создание сервиса пользователя
     *
     * @return сервис пользователя, основанный на репозитории
     */
    @Bean
    public UserDetailsService userDetailsService() {
        return username -> userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    /**
     * Создание провайдера аутентификации
     *
     * @return провайдер аутентификации, основанный на сервисе пользователей и кодировщике паролей
     */
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    /**
     * Создание менеджера аутентификации
     *
     * @param config конфигурация аутентификации
     * @return менеджер аутентификации
     * @throws Exception исключение, возникающее в случае ошибки создания менеджера аутентификации
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    /**
     * Создание кодировщика паролей
     *
     * @return кодировщик паролей BCrypt
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
