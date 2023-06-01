import { AuthFormContext } from "./Auth";
import React, { useContext, useRef, useState } from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useAuth } from '../../hook/useAuth';
import { useNavigate } from "react-router-dom";

import { RootContext } from "../..";
import { useErrorMessage } from "../../hook/useErrorMessage";

export const LogIn = () => {
    const { setSignUp, handleSuccess } = useContext(AuthFormContext);
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState(false)
    const buttonRef = useRef(null);
    const { signPatientIn } = useAuth()
    const navigate = useNavigate()
    const { server } = useContext(RootContext)
    const { setCustomPopUp, setCustomPopUpMessage } = useErrorMessage();



    const onSubmit = (data) => {
        axios.post(`${server}/api/auth/patient/login`, data)
            .then(response => {
                let patient = response.data;
                signPatientIn(patient, () => { });
                handleSuccess();
                navigate("/lk", { replace: true });
            })
            .catch(error => {
                if (error.code === "ERR_NETWORK") {
                    setCustomPopUpMessage("Сервер не отвечает")
                    setCustomPopUp(true)
                } else {
                    setError(true);
                    setTimeout(() => setError(false), 300)
                }
            });
    };

    return (
        <form className='auth_form' onSubmit={handleSubmit(onSubmit)}>
            <div className='title'>Вход</div>
            <input
                title='Телефон в международном формате'
                pattern='\+7[0-9]{10}'
                type='tel'
                placeholder='Телефон'
                className='phone_field'
                required
                autoComplete='username'
                {...register('username')} />
            <input
                title='Пароль, минимум 8 символов'
                pattern='.{8,50}'
                type='password'
                placeholder='Пароль'
                className='password_field'
                required
                autoComplete="current-password"
                {...register('password')} />
            <button ref={buttonRef} className={`${error ? "error" : ""}`} type='submit'>Войти</button>
            <div className="switch" onClick={() => setSignUp(true)}>{"Создать аккаунт"}</div>
        </form>
    )
}