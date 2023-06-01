package org.clinic.security.auth;

import lombok.RequiredArgsConstructor;
import org.clinic.entity.AdminEntity;
import org.clinic.entity.PatientEntity;
import org.clinic.repository.AdminRepository;
import org.clinic.repository.PatientRepository;
import org.clinic.security.JwtService;
import org.clinic.security.user.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Сервис аутентификации для пациентов и администраторов.
 */
@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final PatientRepository patientRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final AdminRepository adminRepository;

    /**
     * Регистрация нового пациента в системе, и сохранение его в базу данных.
     *
     * @param patient новый пациент
     * @return объект {@link AuthenticationResponse} с JWT-токеном и ID пациента
     */
    public AuthenticationResponse registerPatient(PatientEntity patient) {
        patient.setPassword(passwordEncoder.encode(patient.getPassword()));
        patientRepository.save(patient);
        var jwtToken = jwtService.generateToken(patient);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .id(patient.getId())
                .build();
    }

    /**
     * Аутентифицирует пациента, проверяя его имя пользователя и пароль, и возвращает JWT-токен и ID пациента.
     *
     * @param request объект {@link AuthenticationRequest} с данными аутентификации пациента
     * @return объект {@link AuthenticationResponse} с JWT-токеном и ID пациента
     */
    public AuthenticationResponse authenticatePatient(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        PatientEntity patient = (PatientEntity) patientRepository.findByPhoneNumber(request.getUsername())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(patient);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .id(patient.getId())
                .build();
    }


    /**
     * Метод для аутентификации администратора и генерации JWT-токена.
     *
     * @param request Запрос аутентификации администратора
     * @return ResponseEntity со статусом ОК и объектом AuthenticationResponse, содержащим JWT-токен
     */
    public AuthenticationResponse authenticateAdmin(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        AdminEntity admin = (AdminEntity) adminRepository.findByUsername(request.getUsername())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(admin);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}