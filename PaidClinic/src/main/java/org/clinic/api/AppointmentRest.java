package org.clinic.api;


import org.clinic.entity.AppointmentEntity;
import org.clinic.entity.ServiceEntity;
import org.clinic.repository.AppointmentRepository;
import org.clinic.repository.PatientRepository;
import org.clinic.repository.ServiceRepository;
import org.clinic.security.JwtService;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.*;

/**
 * Rest-контроллер для работы с записями на прием к врачу.
 */
@RestController
@RequestMapping("/api/appointments")
public class AppointmentRest {

    private final AppointmentRepository appointmentRepository;
    private final JdbcTemplate jdbcTemplate;
    private final PatientRepository patientRepository;
    private final JwtService jwtService;
    private final ServiceRepository serviceRepository;

    /**
     * Конструктор класса, в котором устанавливаются все необходимые зависимости.
     *
     * @param appointmentRepository репозиторий для работы с записями на прием к врачу
     * @param jdbcTemplate          объект для выполнения запросов к базе данных
     * @param patientRepository     репозиторий для работы с пациентами
     * @param jwtService            объект для работы с JWT-токенами
     */
    public AppointmentRest(AppointmentRepository appointmentRepository, JdbcTemplate jdbcTemplate,
                           PatientRepository patientRepository, JwtService jwtService,
                           ServiceRepository serviceRepository) {

        this.appointmentRepository = appointmentRepository;
        this.jdbcTemplate = jdbcTemplate;
        this.patientRepository = patientRepository;
        this.jwtService = jwtService;
        this.serviceRepository = serviceRepository;
    }

    /**
     * Получение всех записей на прием к врачу
     *
     * @return Список всех записей на прием к врачу
     */
    @GetMapping
    public List<AppointmentEntity> getAllRawAppointments() {
        return appointmentRepository.findAll();
    }

    /**
     * Получение записи на прием к врачу по идентификатору
     *
     * @param id Идентификатор записи на прием к врачу
     * @return Объект ResponseEntity с найденной записью на прием к врачу или ошибкой 404, если запись не найдена
     */
    @GetMapping("/{id}")
    public ResponseEntity<AppointmentEntity> getAppointmentById(@PathVariable int id) {
        Optional<AppointmentEntity> appointment = appointmentRepository.findById(id);
        return appointment.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Получение списка записей на прием к врачу с расширенной информацией о враче и услуге
     *
     * @param token JWT-токен авторизации
     * @return Список записей на прием к врачу с расширенной информацией о враче и услуге
     */
    @GetMapping("/extended_info/")
    public List<Map<String, Object>> getAppointmentsWithDoctorInfo(@RequestHeader("Authorization") String token) {

        token = token.substring(7);
        int patient_id = patientRepository.getByPhoneNumber(jwtService.extractUsername(token)).getId();

        String sql = "SELECT doctor.specialization, " +
                "doctor.last_name || ' ' || doctor.first_name || ' ' || COALESCE(doctor.patronymic, '')  \"doctor\", " +
                "appointment.datetime, " +
                "service.name \"service\", " +
                "service.cost AS \"cost\" " +
                "FROM appointment " +
                "JOIN doctor ON appointment.doctor_id = doctor.id " +
                "JOIN service ON appointment.service_id = service.id " +
                "WHERE appointment.patient_id = " + patient_id + " " +
                "ORDER BY appointment.datetime DESC;";

        return jdbcTemplate.queryForList(sql);
    }

    /**
     * Получение среза записей на прием с сортировкой и пагинацией.
     *
     * @param pageIndex     номер страницы
     * @param pageSize      размер страницы
     * @param sortDirection направление сортировки
     * @param sortBy        поле для сортировки
     * @return срез записей на прием с сортировкой и пагинацией
     */
    @PostMapping("/slice")
    public Map<String, Object> getPatientsSlice(
            @RequestParam int pageIndex,
            @RequestParam int pageSize,
            @RequestParam Sort.Direction sortDirection,
            @RequestParam String sortBy
    ) {

        Page<AppointmentEntity> page;
        page = appointmentRepository.findAll(PageRequest.of(pageIndex, pageSize, sortDirection, sortBy));

        int totalPages = page.getTotalPages();

        Map<String, Object> result = new HashMap<>();
        result.put("data", page);
        result.put("totalPages", totalPages);
        return result;
    }

    /**
     * Создание новой записи о приеме
     *
     * @param appointment объект приема у врача
     */
    @PostMapping("/create")
    public AppointmentEntity createAppointment(@RequestBody AppointmentEntity appointment) {

        return appointmentRepository.save(appointment);
    }

    /**
     * Перезаписывание объекта приема
     *
     * @param appointment новый объект приема
     * @return Объект ResponseEntity с статусом ok или badRequest
     */
    @PutMapping("/update")
    public ResponseEntity<Object> updateAppointment(@RequestBody AppointmentEntity appointment) {
        try {
            appointmentRepository.save(appointment);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Обновление записи и приеме по id
     *
     * @param id          id приема
     * @param appointment обновленный объект приема у врача
     * @return Объект ResponseEntity со статусом ok и обновленным объектом или notFound, если объекта с данным id не найдено
     */
    @PutMapping("/{id}")
    public ResponseEntity<AppointmentEntity> updateAppointment(@PathVariable int id, @RequestBody AppointmentEntity appointment) {
        Optional<AppointmentEntity> existingAppointment = appointmentRepository.findById(id);
        if (existingAppointment.isPresent()) {
            appointment.setId(id);
            appointmentRepository.save(appointment);
            return ResponseEntity.ok(appointment);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Удаление записи о приеме
     *
     * @param id id записи
     * @return Пустой объект ResponseEntity или со статусом notFound, если записи с таким id не существует
     */
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable int id) {
        Optional<AppointmentEntity> appointment = appointmentRepository.findById(id);
        if (appointment.isPresent()) {
            appointmentRepository.delete(appointment.get());
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    /**
     * Получение статистики количества посещений и суммарной стоимости услуги за определенный месяц.
     * Месяц задается при помощи сдвига diffMonths относительно текущего месяца.
     *
     * @param diffMonths сдвиг по месяцам относительно текущего
     * @return Список объектов, содержащих дату, к-во посещений и суммарную стоимость услуг
     */
    @GetMapping("/statistics")
    public List<Map<String, Object>> getStatistics(
            @RequestParam int diffMonths
    ) {

        // Определение класса DayStatistics
        class DayStatistics {
            private final int count;
            private final BigDecimal totalCost;

            public DayStatistics(int count, BigDecimal totalCost) {
                this.count = count;
                this.totalCost = totalCost;
            }

            public int getCount() {
                return count;
            }

            public BigDecimal getTotalCost() {
                return totalCost;
            }
        }

        LocalDateTime currentDateTime = LocalDateTime.now().minusMonths(diffMonths);
        Month month = currentDateTime.getMonth();
        int year = currentDateTime.getYear();
        LocalDateTime startDateTime = LocalDateTime.of(year, month, 1, 0, 0);
        LocalDateTime endDateTime = startDateTime.plusMonths(1).minusSeconds(1);

        List<AppointmentEntity> appointments =
                appointmentRepository.findAllByDatetimeBeforeAndDatetimeAfterOrderByDatetime(
                        Timestamp.valueOf(endDateTime), Timestamp.valueOf(startDateTime));

        Map<LocalDate, DayStatistics> countByDay = new HashMap<>();

        // Подсчет количества записей по дням
        for (AppointmentEntity appointment : appointments) {
            LocalDateTime datetime = appointment.getDatetime().toLocalDateTime();

            Optional<ServiceEntity> service = serviceRepository.findById(appointment.getServiceId());
            BigDecimal cost;
            if (service.isPresent()) {
                cost = service.get().getCost();
            } else {
                cost = BigDecimal.valueOf(0);
            }
            LocalDate day = datetime.toLocalDate();

            // Если в таблице уже есть данные для этого дня, то нужно обновить их значение
            if (countByDay.containsKey(day)) {
                DayStatistics stats = countByDay.get(day);
                int newCount = stats.getCount() + 1;
                BigDecimal newTotalCost = stats.getTotalCost().add(cost);
                countByDay.put(day, new DayStatistics(newCount, newTotalCost));
            } else { // Если нет, то нужно создать новую запись
                countByDay.put(day, new DayStatistics(1, cost));
            }
        }

        List<Map<String, Object>> result = new ArrayList<>();

        LocalDate currentDate = startDateTime.toLocalDate();
        LocalDate endDate = endDateTime.toLocalDate();
        while (!currentDate.isAfter(endDate)) {

            Map<String, Object> item = new HashMap<>();
            item.put("Дата", currentDate);
            item.put("Число посещений", countByDay.getOrDefault(
                    currentDate, new DayStatistics(0, BigDecimal.valueOf(0))).getCount());
            item.put("Доход", countByDay.getOrDefault(
                    currentDate, new DayStatistics(0, BigDecimal.valueOf(0))).getTotalCost());
            result.add(item);

            currentDate = currentDate.plusDays(1);
        }

        return result;
    }
}
