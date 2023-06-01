package org.clinic.repository;

import org.clinic.entity.PatientEntity;
import org.clinic.security.user.User;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Репозиторий {@code PatientRepository} для управления сущностями администратора {@link PatientEntity}.
 */
@Repository
public interface PatientRepository extends JpaRepository<PatientEntity, Integer> {

    /**
     * Метод для поиска всех пациентов, соответствующих указанному шаблону 'example',
     * и возврата их с учетом настройки постраничности 'pageable'.
     *
     * @param example  шаблон для поиска сущностей
     * @param pageable настройка постраничности
     * @return страница пациентов, соответствующих указанному шаблону
     */
    Page<PatientEntity> findAll(Example example, Pageable pageable);

    /**
     * Возвращает опциональный объект с сущностью пользователя, связанной с заданным номером телефона.
     *
     * @param phone номер телефона, связанный с искомым пользователем
     * @return опциональный объект с найденной сущностью пользователя
     */
    Optional<User> findByPhoneNumber(String phone);

    /**
     * Возвращает опциональный объект с сущностью пациента, связанной с заданным номером телефона.
     *
     * @param phone номер телефона, связанный с искомым пациентом
     * @return опциональный объект с найденной сущностью пациента
     */
    Optional<PatientEntity> findPatientEntityByPhoneNumber(String phone);

    /**
     * Возвращает сущность пациента, связанную с заданным номером телефона.
     *
     * @param phone номер телефона, связанный с искомым пациентом
     * @return найденная сущность пациента
     */
    PatientEntity getByPhoneNumber(String phone);
}
