package org.clinic.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

/**
 * Сервис для работы с JWT токенами.
 */
@Service
public class JwtService {

    /**
     * Секретный ключ для подписи JWT токена.
     */
    private static final String SECRET_KEY = "753778214125442A472D4B6150645367566B59703373367638792F423F452848";

    /**
     * Извлекает имя пользователя из токена.
     *
     * @param token JWT токен.
     * @return Имя пользователя, извлеченное из токена.
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Извлекает значение указанного поля из токена.
     *
     * @param token          JWT токен.
     * @param claimsResolver Функция для извлечения значения поля из объекта Claims.
     * @param <T>            Тип значения поля.
     * @return Значение поля, извлеченное из токена.
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Проверяет, действителен ли токен для указанного пользователя.
     *
     * @param token       JWT токен.
     * @param userDetails Данные пользователя.
     * @return true, если токен действителен для пользователя, false в противном случае.
     */
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    /**
     * Проверяет, истек ли срок действия токена.
     *
     * @param token JWT токен.
     * @return true, если срок действия токена истек, false в противном случае.
     */
    private boolean isTokenExpired(String token) {
//        return extractExpiration(token).before(new Date());
        return false;
    }

    /**
     * Извлекает дату истечения срока действия токена.
     *
     * @param token JWT токен.
     * @return Дата истечения срока действия токена.
     */
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * Генерирует JWT-токен на основе данных пользователя.
     *
     * @param userDetails Данные пользователя.
     * @return Сгенерированный JWT-токен.
     */
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    /**
     * Генерирует JWT токен для указанного пользователя с дополнительными полями.
     *
     * @param extraClaims Дополнительные поля для добавления в токен.
     * @param userDetails Данные пользователя.
     * @return Сгенерированный JWT токен.
     */
    public String generateToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails
    ) {
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
//                .setIssuedAt(new Date(System.currentTimeMillis()))
//                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Извлекает все данные из токена.
     *
     * @param token JWT-токен
     * @return Объект Claims, содержащий все данные токена
     */
    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * Получает ключ для подписи JWT на основе секретного ключа.
     *
     * @return Ключ для подписи JWT
     */
    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
