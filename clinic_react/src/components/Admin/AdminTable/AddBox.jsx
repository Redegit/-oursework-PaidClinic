import axios from "axios"
import React, { useState } from "react"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { useErrorMessage } from "../../../hook/useErrorMessage"


export const AddBox = ({ columns, setEdited, addUrl }) => {
    const { register, handleSubmit, reset } = useForm();
    const { setErrorPopUp, setOkPopUp } = useErrorMessage();

    const formRef = useRef(null)


    const onSubmit = (data) => {
        axios.post(addUrl, data, {
            headers: {
                Authorization: `Bearer ${localStorage.admin}`,
            }
        })
            .then(res => {
                console.log(res);
                setEdited(true)
                setOkPopUp(true)
                reset()
            })
            .catch(err => {
                console.log(err);
                setErrorPopUp(true)
            });
    }

    return (
        <div className='add_container'>
            <div className="title">Добавить</div>
            <form className="add_form" onSubmit={handleSubmit(onSubmit)} ref={formRef}>
                <div className='rows'>
                    {columns.slice(1).map((column, i) => {
                        return (
                            <div key={i} className="row">
                                <input {...column.inputProps} name={column.accessor}
                                    {...register(column.accessor)}
                                />
                                <label>{column.Header}</label>
                            </div>
                        )
                    })}
                </div>
                <button type="submit" className="button green">Сохранить</button>
                <button type="button" className="button" onClick={() => reset()}>Очистить</button>
            </form>
        </div>

    )
}