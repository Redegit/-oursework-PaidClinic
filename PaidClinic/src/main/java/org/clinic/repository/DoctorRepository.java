package org.clinic.repository;

import org.clinic.entity.DoctorEntity;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Репозиторий {@code DoctorRepository} для управления сущностями администратора {@link DoctorEntity}.
 */
@Repository
public interface DoctorRepository extends JpaRepository<DoctorEntity, Integer> {

    /**
     * Метод для поиска докторов по специализации.
     *
     * @param specialization специализация доктора
     * @return список докторов, имеющих указанную специализацию
     */
    List<DoctorEntity> findBySpecialization(String specialization);

    /**
     * Метод для поиска всех докторов, соответствующих указанному шаблону 'example',
     * и возврата их с учетом настройки постраничности 'pageable'.
     *
     * @param example  шаблон для поиска сущностей
     * @param pageable настройка постраничности
     * @return страница докторов, соответствующих указанному шаблону
     */
    Page<DoctorEntity> findAll(Example example, Pageable pageable);
}
