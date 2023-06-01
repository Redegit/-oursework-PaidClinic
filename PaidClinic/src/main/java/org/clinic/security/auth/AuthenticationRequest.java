package org.clinic.security.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Класс, представляющий запрос на аутентификацию пользователя.
 * Используется для передачи имени пользователя и пароля в методы аутентификации.
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationRequest {

    /**
     * Имя пользователя для аутентификации.
     */
    private String username;
    /**
     * Пароль пользователя для аутентификации.
     */
    String password;
}