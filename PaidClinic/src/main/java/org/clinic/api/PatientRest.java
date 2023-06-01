package org.clinic.api;


import org.apache.commons.beanutils.PropertyUtils;
import org.clinic.entity.PatientEntity;
import org.clinic.repository.PatientRepository;
import org.clinic.security.JwtService;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.InvocationTargetException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Контроллер для работы с данными о пациентах.
 */
@RestController
@RequestMapping("/api/patients")
public class PatientRest {

    private final PatientRepository patientRepository;

    private final JwtService jwtService;

    /**
     * Конструктор, принимающий репозиторий пациентов и сервис для генерации JWT токенов.
     *
     * @param patientRepository репозиторий пациентов
     * @param jwtService        сервис для генерации JWT токенов
     */
    public PatientRest(PatientRepository patientRepository, JwtService jwtService) {
        this.patientRepository = patientRepository;
        this.jwtService = jwtService;
    }

    /**
     * Получение списка всех пациентов.
     *
     * @return список всех пациентов
     */
    @GetMapping
    public List<PatientEntity> getAllPatients() {
        return patientRepository.findAll();
    }

    /**
     * Получение среза списка пациентов с сортировкой и пагинацией.
     *
     * @param pageIndex     номер страницы
     * @param pageSize      размер страницы
     * @param sortDirection направление сортировки
     * @param sortBy        поле для сортировки
     * @param example       пример объекта пациента для фильтрации
     * @return срез записей на прием с сортировкой и пагинацией
     */
    @PostMapping("/slice")
    public Map<String, Object> getPatientsSlice(
            @RequestParam int pageIndex,
            @RequestParam int pageSize,
            @RequestParam Sort.Direction sortDirection,
            @RequestParam String sortBy,
            @RequestBody(required = false) PatientEntity example
    ) {
        Page<PatientEntity> page;
        if (example != null) {
            ExampleMatcher matcher = ExampleMatcher.matching()
                    .withIgnoreCase()
                    .withIgnoreNullValues()
                    .withIgnorePaths("id")
                    .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING);
            Example<Object> queryExample = Example.of(example, matcher);

            page = patientRepository.findAll(queryExample, PageRequest.of(pageIndex, pageSize, sortDirection, sortBy));

        } else {
            page = patientRepository.findAll(PageRequest.of(pageIndex, pageSize, sortDirection, sortBy));
        }

        int totalPages = page.getTotalPages();

        Map<String, Object> result = new HashMap<>();
        result.put("data", page);
        result.put("totalPages", totalPages);
        return result;
    }

    /**
     * Получение данных о пациенте по токену авторизации.
     *
     * @param token токен авторизации
     * @return объект пациента или ответ с статусом "не найдено"
     */
    @GetMapping("/get")
    public ResponseEntity<PatientEntity> getPatientById(@RequestHeader("Authorization") String token) {

        token = token.substring(7);
        Optional<PatientEntity> patient = patientRepository.findPatientEntityByPhoneNumber(jwtService.extractUsername(token));

        return patient.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Создание записи о новом пациенте.
     *
     * @param patient объект нового пациента
     * @return объект созданного пациента
     */
    @PostMapping("/create")
    public PatientEntity createPatient(@RequestBody PatientEntity patient) {
        return patientRepository.save(patient);
    }

    /**
     * Обновление данных о пациенте.
     *
     * @param patient объект пациента со новыми данными
     * @return ответ с статусом "успех" или "ошибка"
     */
    @PutMapping("/update")
    public ResponseEntity<Object> updatePatient(@RequestBody PatientEntity patient) {
        try {
            patientRepository.save(patient);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }


    /**
     * Обновление данных о пациенте по токену авторизации.
     *
     * @param token токен авторизации
     * @return объект пациента или ответ с статусом "не найдено"
     */
    @PutMapping("/update/byToken")
    public ResponseEntity<PatientEntity> updatePatient(@RequestHeader("Authorization") String token, @RequestBody Map<String, String> props) {

        token = token.substring(7);
        Optional<PatientEntity> existingPatient = patientRepository.findPatientEntityByPhoneNumber(jwtService.extractUsername(token));

        if (existingPatient.isPresent()) {
            PatientEntity patient = existingPatient.get();
            for (String key : props.keySet()) {
                try {
                    if (Objects.equals(key, "birthDate")) {
                        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
                        try {
                            java.util.Date utilDate = format.parse(props.get(key));
                            java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());
                            patient.setBirthDate(sqlDate);
                        } catch (ParseException e) {
                            throw new RuntimeException(e);
                        }
                    } else {
                        PropertyUtils.setProperty(patient, key, props.get(key));
                    }
                } catch (IllegalAccessException | InvocationTargetException | NoSuchMethodException ignored) {
                }
            }
            patientRepository.save(patient);
            return ResponseEntity.ok(patient);
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * Удаление объекта пациента по его идентификатору
     *
     * @param id идентификатор пациента
     * @return объект ResponseEntity со статусом ok или notFound
     */
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable int id) {
        Optional<PatientEntity> patient = patientRepository.findById(id);
        if (patient.isPresent()) {
            patientRepository.delete(patient.get());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
