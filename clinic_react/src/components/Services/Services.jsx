import React, { useEffect, useContext, useState, useRef } from 'react'
import { RootContext } from '../..';
import axios, { all } from 'axios'


import '../Common/Styles/CommonStyle.scss'
import './Services.scss'
import { SetParallaxEffect } from '../Common/SetParallaxEffect';
import { useErrorMessage } from '../../hook/useErrorMessage';

export const Services = () => {
    const { server } = useContext(RootContext)
    const [services, setServices] = useState([])
    const containerRef = useRef(null)
    const { setCustomPopUp, setCustomPopUpMessage } = useErrorMessage();

    useEffect(() => {
        getServices()
    }, []);

    const getServices = () => {
        axios.get(`${server}/api/services/getwithspecs`)
            .then(res => {
                const servs = res.data;
                setServices(servs);
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
        <div ref={containerRef} className='container services_container'>
            <div className='big_title shadow'>Наши услуги</div>
            <div className='specialization_grid'>
                {Object.keys(services).map((specialization, index) => (
                    <div className='specialization_item shadow' key={index}>
                        <div className='title'>{specialization}</div>
                        <ul className='service_list'>
                            {services[specialization].map((service, index) => (
                                <li className='service_name' key={index}>{service}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}