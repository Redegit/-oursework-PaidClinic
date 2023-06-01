package org.clinic.repository;

import org.clinic.entity.ServiceEntity;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Репозиторий {@code ServiceRepository} для управления сущностями администратора {@link ServiceEntity}.
 */
@Repository
public interface ServiceRepository extends JpaRepository<ServiceEntity, Integer> {

    /**
     * Найти все услуги по указанной специализации.
     *
     * @param specialization специализация для поиска.
     * @return список услуг с указанной специализацией.
     */
    List<ServiceEntity> findBySpecialization(String specialization);

    /**
     * Найти все услуги, соответствующие указанному примеру, на заданной странице.
     *
     * @param example  пример для поиска.
     * @param pageable информация о странице.
     * @return страница найденных услуг.
     */
    Page<ServiceEntity> findAll(Example example, Pageable pageable);

}
