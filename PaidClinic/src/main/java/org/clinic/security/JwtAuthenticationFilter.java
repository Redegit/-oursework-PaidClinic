package org.clinic.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Фильтр аутентификации JWT, который проверяет наличие токена авторизации в заголовке запроса.
 * Если токен присутствует, фильтр извлекает из него имя пользователя, загружает информацию о пользователе
 * из сервиса UserDetailsService и устанавливает аутентификационный токен в контекст безопасности Spring.
 */
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    /**
     * Сервис для работы с JWT токенами.
     */
    private final JwtService jwtService;

    /**
     * Сервис для загрузки информации о пользователе.
     */
    private final UserDetailsService userDetailsService;

    /**
     * Метод фильтрации запросов, который проверяет наличие токена авторизации в заголовке запроса.
     * Если токен присутствует, фильтр извлекает из него имя пользователя, загружает информацию о пользователе
     * из сервиса UserDetailsService и устанавливает аутентификационный токен в контекст безопасности Spring.
     *
     * @param request     HTTP запрос.
     * @param response    HTTP ответ.
     * @param filterChain Цепочка фильтров для обработки запроса.
     * @throws ServletException Если происходит ошибка в процессе фильтрации.
     * @throws IOException      Если происходит ошибка ввода-вывода.
     */
    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String username;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        jwt = authHeader.substring(7);
        username = jwtService.extractUsername(jwt);
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
            if (jwtService.isTokenValid(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );
                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
    }
}
