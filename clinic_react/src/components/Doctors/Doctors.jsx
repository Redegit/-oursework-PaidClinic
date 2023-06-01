import React, { useEffect, useContext, useState, useRef } from 'react'
import { RootContext } from '../..';
import axios, { all } from 'axios'


import '../Common/Styles/CommonStyle.scss'
import './Doctors.scss'
import { SetParallaxEffect } from '../Common/SetParallaxEffect';
import { useErrorMessage } from '../../hook/useErrorMessage';

export const Doctors = () => {
    const { server } = useContext(RootContext)
    const [doctors, setDoctors] = useState([])
    const containerRef = useRef(null)
    const { setCustomPopUp, setCustomPopUpMessage } = useErrorMessage();

    useEffect(() => {
        getDoctors()
    }, []);

    const getDoctors = () => {
        axios.get(`${server}/api/doctors/getwithspecs`)
            .then(res => {
                const servs = res.data;
                setDoctors(servs);
            })
            .catch(error => {
                if (error.code === "ERR_NETWORK") {
                    setCustomPopUpMessage("Сервер не отвечает")
                    setCustomPopUp(true)
                }
            })
    }

    SetParallaxEffect(containerRef, 50)

    return (
        <div ref={containerRef} className='container doctors_container'>
            <div className='big_title shadow'>Наши доктора</div>
            <div className='specialization_grid'>
                {Object.keys(doctors).map((specialization, index) => (
                    <div className='specialization_item shadow' key={index}>
                        <div className='title'>{specialization}</div>
                        <ul className='doctor_list'>
                            {doctors[specialization].map((doctor, index) => (
                                <li className='doctor_name' key={index}>{doctor}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}