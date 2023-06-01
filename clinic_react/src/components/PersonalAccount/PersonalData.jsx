import axios from 'axios';
import { useEffect, useContext, useState } from 'react';
import { RootContext } from '../..';

import './PersonalAccount.scss'
import { useErrorMessage } from '../../hook/useErrorMessage';


export const PersonalData = () => {
    const token = localStorage.patientToken;
    const { server } = useContext(RootContext);
    const [patient, setPatient] = useState(null)
    const [editable, setEditable] = useState(false)
    const [inputData, setInputData] = useState({});
    const [error, setError] = useState(null);
    const { setCustomPopUp, setCustomPopUpMessage } = useErrorMessage();

    const url = `${server}/api/patients`

    useEffect(() => {
        getPatient();
    }, [url]);

    const getPatient = async () => {
        axios.get(url + `/get`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => {
                const patient = res.data;
                setPatient(patient);
            })
            .catch(error => {
                if (error.code === "ERR_NETWORK") {
                    setCustomPopUpMessage("Сервер не отвечает")
                    setCustomPopUp(true)
                }
            })
    }

    useEffect(() => {
        resetDefault()
        resetInputs()
    }, [patient])

    const resetInputs = () => {
        document.querySelectorAll('.patient_data_list input').forEach(input => input.value = input.defaultValue);
    }

    const resetDefault = () => {
        document.querySelectorAll('.patient_data_list input').forEach(input => input.defaultValue = patient[input.name]);
    }

    const handleEditButton = () => {
        if (editable) {
            resetInputs()
        }
        setEditable(!editable)
    }

    const handleChange = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(url + `/update/byToken`, inputData, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => {
                setEditable(false)
                const patient = res.data;
                setPatient(patient);
            })
            .catch(err => {
                console.log(err)
                setError(true)
                setTimeout(function () {
                    setError(false);
                }, 3000);
            });
    };

    return (
        <>
            {patient
                ? (
                    <form className='patient_data_container' onSubmit={handleSubmit}>
                        <div className='title'>Персональная информация</div>
                        <div className="patient_data_list">
                            <div className="row">
                                <label>Фамилия:</label>
                                <input className="input" title="Максимум - 50 символов" pattern=".{1,50}" name="lastName" type="text" defaultValue={patient.lastName || ""} readOnly={!editable} onChange={handleChange} required />
                            </div>
                            <div className="row">
                                <label>Имя:</label>
                                <input className="input" title="Максимум - 50 символов" pattern=".{1,50}" name="firstName" type="text" defaultValue={patient.firstName || ""} readOnly={!editable} onChange={handleChange} required />
                            </div>
                            <div className="row">
                                <label>Отчество:</label>
                                <input className="input" title="Максимум - 50 символов" pattern=".{0,50}" name="patronymic" type="text" defaultValue={patient.patronymic || ""} readOnly={!editable} onChange={handleChange} />
                            </div>
                            <div className="row">
                                <label>Пол:</label>
                                <div className='radio_container'>
                                    <div className='radio_row'>
                                        <input id='М' type="radio" name="gender" value="М" defaultChecked={patient.gender === "М" || false} onChange={handleChange} disabled={!editable} />
                                        <label className='radio_label' htmlFor='М'>Мужской</label>
                                    </div>
                                    <div className='radio_row'>
                                        <input id='Ж' type="radio" name="gender" value="Ж" defaultChecked={patient.gender === "Ж" || false} onChange={handleChange} disabled={!editable} />
                                        <label className='radio_label' htmlFor='Ж'>Женский</label>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <label>Дата рождения:</label>
                                <input className="input" name="birthDate" type="date" defaultValue={patient.birthDate || ""} readOnly={!editable} onChange={handleChange} />
                            </div>
                            <div className="row">
                                <label>Email:</label>
                                <input className="input" name="email" type="email" defaultValue={patient.email || ""} readOnly={!editable} onChange={handleChange} />
                            </div>
                            <div className="row">
                                <label>Номер телефона:</label>
                                <input className={`${error ? "phone_error" : ""} input`} title="Номер телефона в международном формате: +7xxxxxxxxxx" pattern="\+7[0-9]{10}" name="phoneNumber" type="tel" defaultValue={patient.phoneNumber || ""} readOnly={!editable} onChange={handleChange} required />
                            </div>
                            <div className="row">
                                <label>Адрес:</label>
                                <input className="input" name="address" type="text" defaultValue={patient.address || ""} readOnly={!editable} onChange={handleChange} />
                            </div>
                        </div>
                        <button type='button' className='button' onClick={() => handleEditButton()}>{editable ? "Отмена" : "Редактировать"}</button>
                        {editable && <button type='submit' className='button save_button green'>Сохранить</button>}
                    </form >
                )
                : (
                    <div className='error'>Непредвиденная ошибка</div>
                )

            }
        </>
    )
}