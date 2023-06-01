package org.clinic.entity;

import jakarta.persistence.*;

import java.sql.Timestamp;
import java.util.Objects;

/**
 * Класс, представляющий объект-сущность приема у врача в системе.
 */
@Entity
@Table(name = "appointment", schema = "public", catalog = "PaidClinic")
public class AppointmentEntity {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;
    @Basic
    @Column(name = "patient_id", nullable = false)
    private Integer patientId;
    @Basic
    @Column(name = "doctor_id", nullable = false)
    private Integer doctorId;
    @Basic
    @Column(name = "datetime", nullable = true)
    private Timestamp datetime;
    @Basic
    @Column(name = "service_id", nullable = true)
    private Integer serviceId;

    public AppointmentEntity() {

    }

    public AppointmentEntity(Integer patientId, Integer doctorId, Timestamp datetime, Integer serviceId) {
        this.patientId = patientId;
        this.doctorId = doctorId;
        this.datetime = datetime;
        this.serviceId = serviceId;
    }

    public Timestamp getDatetime() {
        return datetime;
    }

    public void setDatetime(Timestamp datetime) {
        this.datetime = datetime;
    }

    public int getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getPatientId() {
        return patientId;
    }

    public void setPatientId(Integer patientId) {
        this.patientId = patientId;
    }

    public void setPatientId(int patientId) {
        this.patientId = patientId;
    }

    public int getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Integer doctorId) {
        this.doctorId = doctorId;
    }

    public void setDoctorId(int doctorId) {
        this.doctorId = doctorId;
    }

    public Integer getServiceId() {
        return serviceId;
    }

    public void setServiceId(Integer serviceId) {
        this.serviceId = serviceId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AppointmentEntity that = (AppointmentEntity) o;
        return id == that.id && patientId == that.patientId && doctorId == that.doctorId && Objects.equals(datetime, that.datetime) && Objects.equals(serviceId, that.serviceId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, patientId, doctorId, datetime, serviceId);
    }

    @Override
    public String toString() {
        return "AppointmentEntity{" +
                "id=" + id +
                ", patientId=" + patientId +
                ", doctorId=" + doctorId +
                ", datetime=" + datetime +
                ", serviceId=" + serviceId +
                '}';
    }
}
