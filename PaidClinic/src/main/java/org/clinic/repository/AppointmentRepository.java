package org.clinic.repository;

import org.clinic.entity.AppointmentEntity;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.List;

/**
 * Репозиторий {@code AppointmentRepository} для управления сущностями администратора {@link AppointmentEntity}.
 */
@Repository
public interface AppointmentRepository extends JpaRepository<AppointmentEntity, Integer> {

    /**
     * Метод для поиска всех приемов у врача, соответствующих указанному шаблону 'example',
     * и возврата их с учетом настройки постраничности 'pageable'.
     *
     * @param example  шаблон для поиска сущностей
     * @param pageable настройка постраничности
     * @return страница приемов, соответствующих указанному шаблону
     */
    Page<AppointmentEntity> findAll(Example example, Pageable pageable);

    List<AppointmentEntity> findAllByDatetimeBeforeAndDatetimeAfterOrderByDatetime(Timestamp datetime, Timestamp datetime2);
}
