import React, { useContext, useState, useEffect, useRef, useCallback } from 'react'
import axios from "axios";

import { RootContext } from "../..";
import { BigTable } from "./AdminTable/BigTable";
import { useErrorMessage } from '../../hook/useErrorMessage';


export const AdminDoctors = () => {
    const { server } = useContext(RootContext);
    const [patients, setPatients] = useState([]);
    const [pageCount, setPageCount] = useState(0)
    const { setErrorPopUp, setCustomPopUp, setCustomPopUpMessage } = useErrorMessage();


    const fetchFunction = useCallback(({ pageIndex, pageSize, by, direction, filter = null }) => {

        const url = `${server}/api/doctors/slice?pageIndex=${pageIndex}&pageSize=${pageSize}&sortBy=${by}&sortDirection=${direction}`

        axios.post(url, filter, {
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
        { Header: "Фамилия", accessor: "lastName", inputProps: { type: "text", pattern: ".{1,50}", required: true } },
        { Header: "Имя", accessor: "firstName", inputProps: { type: "text", pattern: ".{1,50}", required: true } },
        { Header: "Отчество", accessor: "patronymic", inputProps: { type: "text", pattern: ".{1,50}" } },
        { Header: "Специализация", accessor: "specialization", inputProps: { type: "text" } },
        { Header: "Телефон", accessor: "phoneNumber", inputProps: { type: "tel", required: true } },
        { Header: "Email", accessor: "email", inputProps: { type: "email" } },
    ]

    const url = server + "/api/doctors"
    const addUrl = server + "/api/doctors/create"


    return (
        <div className="container">
            <div className="big_title">Врачи</div>
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