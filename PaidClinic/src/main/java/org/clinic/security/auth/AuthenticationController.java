package org.clinic.security.auth;


import lombok.RequiredArgsConstructor;
import org.clinic.entity.PatientEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST-контроллер для обработки запросов авторизации
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthenticationController {

    /**
     * Сервис, который осуществляет регистрацию и аутентификацию пользователей
     */
    private final AuthenticationService service;

    /**
     * Обрабатывает POST-запрос на регистрацию пациента
     *
     * @param patient - сущность пациента, полученная из тела запроса
     * @return объект ResponseEntity с телом AuthenticationResponse в случае успешной регистрации
     */
    @PostMapping("/patient/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody PatientEntity patient
    ) {
        return ResponseEntity.ok(service.registerPatient(patient));
    }

    /**
     * Обрабатывает POST-запрос на аутентификацию пациента
     *
     * @param request - объект AuthenticationRequest, содержащий имя пользователя и пароль
     * @return объект ResponseEntity с телом AuthenticationResponse в случае успешной аутентификации
     */
    @PostMapping("/patient/login")
    public ResponseEntity<AuthenticationResponse> authenticatePatient(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticatePatient(request));
    }

    /**
     * Обрабатывает POST-запрос на аутентификацию администратора
     *
     * @param request - объект AuthenticationRequest, содержащий имя пользователя и пароль
     * @return объект ResponseEntity с телом AuthenticationResponse в случае успешной аутентификации
     */
    @PostMapping("/admin/login")
    public ResponseEntity<AuthenticationResponse> authenticateAdmin(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticateAdmin(request));
    }
}