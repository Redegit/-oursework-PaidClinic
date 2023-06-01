package org.clinic.security.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Класс, представляющий ответ на запрос аутентификации.
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {

    /**
     * Токен аутентификации.
     */
    @JsonProperty("token")
    private String token;

    /**
     * Идентификатор пользователя
     */
    @JsonProperty("id")
    private int id;
}