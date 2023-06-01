
import axios from 'axios'
import { Dropdown } from '../Common/Dropdown/Dropdown'

import '../Common/Styles/CommonStyle.scss'
import './MakeAppointment.scss'

import React, { useContext, useEffect, useState } from 'react'
import { RootContext } from '../..'
import { useErrorMessage } from '../../hook/useErrorMessage'

export const MakeAppointment = () => {
    const { server } = useContext(RootContext);
    const id = localStorage.patientId;
    const token = localStorage.patientToken;
    const [specializations, setSpecializations] = useState([])
    const [services, setServices] = useState({})
    const [doctors, setDoctors] = useState([])
    const [service, setService] = useState(null)
    const [doctor, setDoctor] = useState(null)
    const [dateTime, setDateTime] = useState(null)
    const [dataChosen, setDataChosen] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const { setCustomPopUp, setCustomPopUpMessage } = useErrorMessage();


    useEffect(() => {
        getSpecializations();
    }, []);

    useEffect(() => {
        if (service !== null && doctor !== null && dateTime !== null) {
            setDataChosen(true);
        }
    }, [service, doctor, dateTime]);

    const getSpecializations = () => {
        axios.get(`${server}/api/doctors/specializations`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "*/*"
            }
        })
            .then(res => {
                const specs = res.data;
                setSpecializations(specs);
            })
            .catch(error => {
                if (error.code === "ERR_NETWORK") {
                    setCustomPopUpMessage("Сервер не отвечает")
                    setCustomPopUp(true)
                }
            })
    }

    const getServices = (spec) => {
        axios.get(`${server}/api/services/getbyspec/${spec}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "*/*"
            }
        })
            .then(res => {
                const servs = res.data;
                setServices(servs);
            })
    }

    const getDoctors = (spec) => {
        axios.get(`${server}/api/doctors/getbyspec/${spec}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "*/*"
            }
        })
            .then(res => {
                const docs = res.data;
                setDoctors(docs);
            })
    }

    const handleSpecChoice = (spec) => {
        getServices(spec)
        getDoctors(spec)
    }

    const handleServChoice = (serv) => {
        setService(services[serv])
    }

    const handleDocChoice = (doc) => {
        setDoctor(doctors[doc])
    }

    const handleDateTime = (e) => {
        setDateTime(e.target.value)
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        let appointment = {
            "patientId": id,
            "serviceId": service,
            "doctorId": doctor,
            "datetime": dateTime
        }

        axios.post(`${server}/api/appointments/create`, appointment, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => {
                setShowSuccess(true)
            })
            .catch(err => console.log(err));
    }

    const getDoctorName = (id) => {
        for (let key in doctors) {
            if (doctors[key] === id) {
                return key
            }
        }
    }

    const convertDate = (date) => {
        date = new Date(date)
        let options = {
            day: 'numeric',
            month: 'long',
            hour: '2-digit',
            minute: '2-digit'
        };
        let result = date.toLocaleString('ru', options);
        return result;
    }

    return (
        <div className="container">
            <div className="big_title">Запись к врачу</div>
            <form className='appointment_form' onSubmit={handleSubmit}>
                <div className='row'>
                    <label>Специализация</label>
                    <div className='dropdown'>
                        <Dropdown placeHolder={'Выбор...'} options={specializations} handleChoice={handleSpecChoice} active={Object.keys(specializations).length > 0}></Dropdown>
                    </div>
                </div>
                <div className='row'>
                    <label>Услуга</label>
                    <div className='dropdown'>
                        <Dropdown placeHolder={'Выбор...'} options={Object.keys(services)} handleChoice={handleServChoice} active={Object.keys(services).length > 0}></Dropdown>
                    </div>
                </div>
                <div className='row'>
                    <label>Врач</label>
                    <div className='dropdown'>
                        <Dropdown placeHolder={'Выбор...'} options={Object.keys(doctors)} handleChoice={handleDocChoice} active={Object.keys(doctors).length > 0}></Dropdown>
                    </div>
                </div>
                <div className='row'>
                    <label>Дата и время</label>
                    <input type='datetime-local' min={new Date().toISOString().substring(0, 16)} onChange={handleDateTime} ></input>
                </div>
                <button type='submit' className={`button save_button ${dataChosen ? 'active_button' : ''}`} disabled={!dataChosen}>Сохранить</button>
            </form>
            {showSuccess && (
                <>
                    <div className='overflow' onClick={() => window.location.reload()}></div>
                    <div className='floating_container'>
                        <div className='big_title'>Запись создана</div>
                        <div className='appointment_info'>
                            <div className='name title'>{getDoctorName(doctor)}</div>
                            <div className='info'>Ждет Вас {convertDate(dateTime)}</div>
                        </div>
                    </div>
                </>
            )}


        </div >
    )
}