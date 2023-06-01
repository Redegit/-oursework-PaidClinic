package org.clinic.api;


import org.clinic.entity.DoctorEntity;
import org.clinic.repository.DoctorRepository;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * Контроллер для работы с данными о докторах.
 */
@RestController
@RequestMapping("/api/doctors")
public class DoctorRest {

    private final DoctorRepository doctorRepository;

    /**
     * Конструктор, принимающий репозиторий докторов для работы с данными.
     *
     * @param doctorRepository репозиторий докторов
     */
    public DoctorRest(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    /**
     * Получение списка всех докторов.
     *
     * @return список всех докторов
     */
    @GetMapping
    public List<DoctorEntity> getAllDoctors() {
        return doctorRepository.findAll();
    }

    /**
     * Получение объекта доктора по его идентификатору.
     *
     * @param id идентификатор доктора
     * @return объект доктора или ответ с статусом "не найдено"
     */
    @GetMapping("/{id}")
    public ResponseEntity<DoctorEntity> getDoctorById(@PathVariable int id) {
        Optional<DoctorEntity> doctor = doctorRepository.findById(id);
        return doctor.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Получение списка докторов по их специализации.
     *
     * @param specialization специализация доктора
     * @return список докторов с указанной специализацией и их идентификаторы
     */
    @GetMapping("/getbyspec/{specialization}")
    public ResponseEntity<Map<String, String>> getDoctorBySpec(@PathVariable String specialization) {

        List<DoctorEntity> doctors = doctorRepository.findBySpecialization(specialization);

        Map<String, String> response = new HashMap<>();

        doctors.forEach(doctor -> {
            response.put(doctor.getLastName() + " " + doctor.getFirstName() + " " + doctor.getPatronymic(), String.valueOf(doctor.getId()));
        });
        return ResponseEntity.ok(response);
    }

    /**
     * Получение списка всех специализаций докторов.
     *
     * @return список всех специализаций докторов
     */
    @GetMapping("/specializations")
    public ResponseEntity<List<String>> getAllSpecs() {

        List<DoctorEntity> doctors = doctorRepository.findAll();

        List<String> response = new ArrayList<>();

        doctors.forEach(doctor -> {
            String specialization = doctor.getSpecialization();
            if (!response.contains(specialization)) {
                response.add(specialization);
            }
        });
        return ResponseEntity.ok(response);
    }

    /**
     * Получение списка докторов, сгруппированных по специализации.
     *
     * @return список докторов, сгруппированных по специализации
     */
    @GetMapping("/getwithspecs")
    public ResponseEntity<Map<String, Object>> getDoctorsWithSpecs() {

        List<DoctorEntity> doctors = doctorRepository.findAll();

        List<String> specs = new ArrayList<>();

        for (var doctor : doctors) {
            specs.add(doctor.getSpecialization());
        }

        Map<String, List<String>> response = new HashMap<>();

        doctors.forEach(doctor -> {
            String spec = doctor.getSpecialization();
            String name = doctor.getLastName() + " " + doctor.getFirstName() + " " + doctor.getPatronymic();
            if (response.containsKey(spec)) {
                List<String> list = new ArrayList<String>(response.get(spec));
                list.add(name);
                response.put(spec, list);
            } else {
                response.put(spec, Collections.singletonList(name));
            }
        });

        for (Map.Entry<String, List<String>> entry : response.entrySet()) {
            Collections.sort(entry.getValue());
        }

        Map<String, Object> responseSorted = new TreeMap<String, Object>(response);

        return ResponseEntity.ok(responseSorted);
    }

    /**
     * Обновление данных о докторе.
     *
     * @param doctor объект доктора со новыми данными
     * @return ответ с статусом "успех" или "ошибка"
     */
    @PutMapping("/update")
    public ResponseEntity<Object> updatePatient(@RequestBody DoctorEntity doctor) {
        try {
            doctorRepository.save(doctor);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Создание нового доктора.
     *
     * @param doctor объект нового объекта доктора
     * @return объект созданного доктора
     */
    @PostMapping("/create")
    public DoctorEntity createDoctor(@RequestBody DoctorEntity doctor) {
        return doctorRepository.save(doctor);
    }

    /**
     * Удаление доктора по его идентификатору.
     *
     * @param id идентификатор доктора для удаления
     * @return ответ с статусом "успех" или "ошибка"
     */
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteDoctor(@PathVariable int id) {
        Optional<DoctorEntity> doctor = doctorRepository.findById(id);
        if (doctor.isPresent()) {
            doctorRepository.delete(doctor.get());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Получение среза списка врачей с сортировкой и пагинацией.
     *
     * @param pageIndex     номер страницы
     * @param pageSize      размер страницы
     * @param sortDirection направление сортировки
     * @param sortBy        поле для сортировки
     * @param example       пример врача для фильтрации
     * @return срез записей на прием с сортировкой и пагинацией
     */
    @PostMapping("/slice")
    public Map<String, Object> getPatientsSlice(
            @RequestParam int pageIndex,
            @RequestParam int pageSize,
            @RequestParam Sort.Direction sortDirection,
            @RequestParam String sortBy,
            @RequestBody(required = false) DoctorEntity example
    ) {
        Page<DoctorEntity> page;
        if (example != null) {
            ExampleMatcher matcher = ExampleMatcher.matching()
                    .withIgnoreCase()
                    .withIgnoreNullValues()
                    .withIgnorePaths("id")
                    .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING);
            Example<Object> queryExample = Example.of(example, matcher);

            page = doctorRepository.findAll(queryExample, PageRequest.of(pageIndex, pageSize, sortDirection, sortBy));

        } else {
            page = doctorRepository.findAll(PageRequest.of(pageIndex, pageSize, sortDirection, sortBy));
        }

        int totalPages = page.getTotalPages();

        Map<String, Object> result = new HashMap<>();
        result.put("data", page);
        result.put("totalPages", totalPages);
        return result;
    }
}
