package org.clinic.repository;

import org.clinic.entity.AdminEntity;
import org.clinic.security.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Репозиторий {@code AdminRepository} для управления сущностями администратора {@link AdminEntity}.
 */
@Repository
public interface AdminRepository extends JpaRepository<AdminEntity, Integer> {

    /**
     * Поиск администратора по имени пользователя.
     *
     * @param username имя пользователя
     * @return найденный пользователь или null, если не найден
     */
    Optional<User> findByUsername(String username);

}
