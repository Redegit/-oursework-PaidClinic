package org.clinic.api;


import org.clinic.entity.ServiceEntity;
import org.clinic.repository.ServiceRepository;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * Контроллер REST API для управления операциями CRUD для сущности ServiceEntity.
 */
@RestController
@RequestMapping("/api/services")
public class ServiceRest {

    private final ServiceRepository serviceRepository;

    public ServiceRest(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    /**
     * Обработчик GET-запросов на получение списка всех услуг.
     *
     * @return список всех услуг.
     */
    @GetMapping
    public List<ServiceEntity> getAllServices() {
        return serviceRepository.findAll();
    }

    /**
     * Обработчик GET-запросов на получение услуги по id.
     *
     * @param id id услуги.
     * @return ResponseEntity с найденной услугой или сообщением ошибки.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ServiceEntity> getServiceById(@PathVariable int id) {
        Optional<ServiceEntity> service = serviceRepository.findById(id);
        return service.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Обработчик GET-запросов на получение услуг по специализации.
     *
     * @param specialization специализация услуги.
     * @return ResponseEntity с отображением услуг, соответствующих специализации или сообщением ошибки.
     */
    @GetMapping("/getbyspec/{specialization}")
    public ResponseEntity<Map<String, String>> getServiceBySpec(@PathVariable String specialization) {

        List<ServiceEntity> services = serviceRepository.findBySpecialization(specialization);

        Map<String, String> response = new HashMap<>();

        services.forEach(service -> {
            response.put(service.getName(), String.valueOf(service.getId()));
        });
        return ResponseEntity.ok(response);
    }

    /**
     * Обработчик GET-запросов на получение всех услуг с учетом их специализации.
     *
     * @return ResponseEntity с отображением всех услуг с учетом специализации или сообщением ошибки.
     */
    @GetMapping("/getwithspecs")
    public ResponseEntity<Map<String, Object>> getServicesWithSpecs() {

        List<ServiceEntity> services = serviceRepository.findAll();

        List<String> specs = new ArrayList<>();

        for (var service : services) {
            specs.add(service.getSpecialization());
        }

        Map<String, List<String>> response = new HashMap<>();

        services.forEach(service -> {
            String spec = service.getSpecialization();
            if (response.containsKey(spec)) {
                List<String> list = new ArrayList<String>(response.get(spec));
                list.add(service.getName());
                response.put(spec, list);
            } else {
                response.put(spec, Collections.singletonList(service.getName()));
            }
        });

        for (Map.Entry<String, List<String>> entry : response.entrySet()) {
            Collections.sort(entry.getValue());
        }

        Map<String, Object> responseSorted = new TreeMap<String, Object>(response);

        return ResponseEntity.ok(responseSorted);
    }

    /**
     * Обработчик POST-запросов на создание новой услуги.
     *
     * @param service данные новой услуги.
     * @return сохраненную услугу.
     */
    @PostMapping("/create")
    public ServiceEntity createService(@RequestBody ServiceEntity service) {
        return serviceRepository.save(service);
    }

    /**
     * Получение среза списка услуг с сортировкой и пагинацией.
     *
     * @param pageIndex     номер страницы
     * @param pageSize      размер страницы
     * @param sortDirection направление сортировки
     * @param sortBy        поле для сортировки
     * @param example       пример объекта услуги для фильтрации
     * @return срез записей на прием с сортировкой и пагинацией
     */
    @PostMapping("/slice")
    public Map<String, Object> getServicesSlice(
            @RequestParam int pageIndex,
            @RequestParam int pageSize,
            @RequestParam Sort.Direction sortDirection,
            @RequestParam String sortBy,
            @RequestBody(required = false) ServiceEntity example
    ) {
        Page<ServiceEntity> page;
        System.out.println(example);
        if (example != null) {
            ExampleMatcher matcher = ExampleMatcher.matching()
                    .withIgnoreCase()
                    .withIgnoreNullValues()
                    .withIgnorePaths("id")
                    .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING);
            Example<Object> queryExample = Example.of(example, matcher);

            page = serviceRepository.findAll(queryExample, PageRequest.of(pageIndex, pageSize, sortDirection, sortBy));

        } else {
            page = serviceRepository.findAll(PageRequest.of(pageIndex, pageSize, sortDirection, sortBy));
        }

        int totalPages = page.getTotalPages();

        Map<String, Object> result = new HashMap<>();
        result.put("data", page);
        result.put("totalPages", totalPages);
        return result;
    }

    /**
     * Обновление объекта услуги
     *
     * @param service новый объект услуги
     * @return объект ResponseEntity со статусом ok или notFound
     */
    @PutMapping("/update")
    public ResponseEntity<ServiceEntity> updateService(@RequestBody ServiceEntity service) {
        try {
            serviceRepository.save(service);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Удаление объекта услуги по его идентификатору
     *
     * @param id идентификатор услуги
     * @return пустой объект ResponseEntity или со статусом notFound
     */
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable int id) {
        Optional<ServiceEntity> service = serviceRepository.findById(id);
        if (service.isPresent()) {
            serviceRepository.delete(service.get());
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
