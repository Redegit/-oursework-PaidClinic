import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import { RootContext } from '../..';

import './PersonalAccount.scss'
import { Table } from '../Common/Table/Table';


export const AppointmentList = () => {
    const token = localStorage.patientToken;
    const { server } = useContext(RootContext);
    const [appointments, setAppointments] = useState([])


    useEffect(() => {
        const url = `${server}/api/appointments/extended_info/`

        axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => {
                const data = res.data;
                setAppointments(data);
            })
    }, []);


    const formattedDateTime = (dateTime) => {
        if (dateTime != null) {
            return dateTime.slice(0, 16).replace('T', ' ');
        } else {
            return null
        }
    }

    appointments.forEach(object => {
        object.datetime = formattedDateTime(object.datetime);
    });

    const columns = [
        { Header: "Дата-время", accessor: "datetime" },
        { Header: "Специализация", accessor: "specialization" },
        { Header: "Врач", accessor: "doctor" },
        { Header: "Услуга", accessor: "service" },
        { Header: "Стоимость", accessor: "cost" }
    ]


    return (

        <>
            <div className='title'>История посещений</div>
            <Table data={appointments} columns={columns} />
        </>
    )
}