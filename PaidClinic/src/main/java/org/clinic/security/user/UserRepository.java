package org.clinic.security.user;

import org.clinic.repository.AdminRepository;
import org.clinic.repository.DoctorRepository;
import org.clinic.repository.PatientRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Репозиторий, предоставляющий метод для поиска пользователя по его имени пользователя.
 */
@Repository
public class UserRepository {

    /**
     * Репозиторий пациентов, используемый для поиска пациентов по имени пользователя.
     */
    private final PatientRepository patientRepository;

    /**
     * Репозиторий администраторов, используемый для поиска администраторов по имени пользователя.
     */
    private final AdminRepository adminRepository;

    /**
     * Конструктор, инициализирующий репозитории пациентов и администраторов.
     *
     * @param patientRepository Репозиторий пациентов.
     * @param doctorRepository  Репозиторий докторов (не используется).
     * @param adminRepository   Репозиторий администраторов.
     */
    public UserRepository(PatientRepository patientRepository, DoctorRepository doctorRepository, AdminRepository adminRepository) {
        this.patientRepository = patientRepository;
        this.adminRepository = adminRepository;
    }

    /**
     * Метод для поиска пользователя по его имени пользователя.
     * Если пользователь с таким именем найден в репозитории пациентов, возвращается соответствующий пациент,
     * если в репозитории администраторов - возвращается соответствующий администратор.
     * Если пользователь не найден в обоих репозиториях, выбрасывается исключение UsernameNotFoundException.
     *
     * @param username Имя пользователя.
     * @return Найденный пользователь.
     * @throws UsernameNotFoundException Исключение, выбрасываемое, если пользователь не найден.
     */
    public Optional<User> findByUsername(String username) {
        Optional<User> admin = adminRepository.findByUsername(username);
        if (admin.isPresent()) {
            return admin;
        }
        Optional<User> patient = patientRepository.findByPhoneNumber(username);
        if (patient.isPresent()) {
            return patient;
        }
        throw new UsernameNotFoundException("User not found");
    }
}