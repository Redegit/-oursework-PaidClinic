import React, { useContext, useState, useEffect, useRef, useCallback } from 'react'
import axios from "axios";

import { RootContext } from "../..";
import { BigTable } from "./AdminTable/BigTable";
import { useErrorMessage } from '../../hook/useErrorMessage';


export const AdminAppointments = () => {
    const { server } = useContext(RootContext);
    const [patients, setPatients] = useState([]);
    const [pageCount, setPageCount] = useState(0)
    const { setErrorPopUp, setCustomPopUp, setCustomPopUpMessage } = useErrorMessage();

    const fetchFunction = useCallback(({ pageIndex, pageSize, by, direction, filter }) => {

        const url = `${server}/api/appointments/slice?pageIndex=${pageIndex}&pageSize=${pageSize}&sortBy=${by}&sortDirection=${direction}`

        axios.post(url, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.admin}`,
            }
        })
            .then(res => {
                const data = res.data;
                setPatients(data.data.content);
                setPageCount(data.totalPages);
            })
            .catch(err => {
                if (err.code === "ERR_NETWORK") {
                    setCustomPopUpMessage("Сервер не отвечает")
                    setCustomPopUp(true)
                } else {
                    setErrorPopUp(true)
                }
            })
    }, []);

    const columns = [
        { Header: "ID", accessor: "id" },
        { Header: "Пациент", accessor: "patientId", inputProps: { type: "number", required: true } },
        { Header: "Доктор", accessor: "doctorId", inputProps: { type: "number", required: true } },
        { Header: "Услуга", accessor: "serviceId", inputProps: { type: "number" } },
        { Header: "Дата и время", accessor: "datetime", inputProps: { type: "datetime" } },
    ]

    const url = server + "/api/appointments"
    const addUrl = server + "/api/appointments/create"


    return (
        <div className="container">
            <div className="big_title">Приёмы у врачей</div>
            <BigTable
                data={patients}
                columns={columns}
                fetchFunction={fetchFunction}
                url={url}
                addUrl={addUrl}
                pageCount={pageCount} />
        </div>
    )
}