import React, { useContext, useState, useEffect, useRef, useCallback } from 'react'
import axios from "axios";

import { RootContext } from "../..";
import { BigTable } from "./AdminTable/BigTable";
import { useErrorMessage } from '../../hook/useErrorMessage';


export const AdminServices = () => {
    const { server } = useContext(RootContext);
    const [patients, setPatients] = useState([]);
    const [pageCount, setPageCount] = useState(0)
    const { setErrorPopUp, setCustomPopUp, setCustomPopUpMessage } = useErrorMessage();

    const fetchFunction = useCallback(({ pageIndex, pageSize, by, direction, filter = null }) => {

        const url = `${server}/api/services/slice?pageIndex=${pageIndex}&pageSize=${pageSize}&sortBy=${by}&sortDirection=${direction}`

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
        { Header: "Название", accessor: "name", inputProps: { type: "text", pattern: ".{1,50}", required: true } },
        { Header: "Стоимость", accessor: "cost", inputProps: { type: "number" } },
        { Header: "Специализация", accessor: "specialization", inputProps: { type: "text", pattern: ".{1,100}", required: true } },
    ]

    const url = server + "/api/services"
    const addUrl = server + "/api/services/create"


    return (
        <div className="container">
            <div className="big_title">Услуги</div>
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