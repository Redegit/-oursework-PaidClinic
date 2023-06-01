package org.clinic.entity;

import jakarta.persistence.*;
import org.clinic.security.user.Role;
import org.clinic.security.user.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.List;
import java.util.Objects;

/**
 * Класс, представляющий объект-сущность администратора в системе.
 * Наследуется от класса User.
 */
@Entity
@Table(name = "admin", schema = "public", catalog = "PaidClinic")
public class AdminEntity extends User {

    /**
     * Имя пользователя администратора.
     */
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "username", nullable = false, length = 20)
    private String username;

    /**
     * Пароль администратора.
     */
    @Basic
    @Column(name = "password", nullable = false, length = 100)
    private String password;

    /**
     * Получить имя пользователя администратора.
     *
     * @return имя пользователя администратора
     */
    public String getUsername() {
        return username;
    }

    /**
     * Установить имя пользователя администратора.
     *
     * @param username имя пользователя администратора
     */
    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(Role.ADMIN.name()));
    }

    /**
     * Получить пароль администратора.
     *
     * @return пароль администратора
     */
    public String getPassword() {
        return password;
    }

    /**
     * Установить пароль администратора.
     *
     * @param password имя пользователя администратора
     */
    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AdminEntity that = (AdminEntity) o;
        return Objects.equals(username, that.username) && Objects.equals(password, that.password);
    }

    @Override
    public int hashCode() {
        return Objects.hash(username, password);
    }
}
