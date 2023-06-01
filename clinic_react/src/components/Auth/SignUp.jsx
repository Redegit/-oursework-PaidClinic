import { useForm } from "react-hook-form";
import { AuthFormContext } from "./Auth";
import React, { useContext, useRef, useState } from 'react'
import axios from "axios";

import { RootContext } from "../..";
import { useAuth } from "../../hook/useAuth";
import { Link, useNavigate } from "react-router-dom";

export const SignUp = () => {
    const { server } = useContext(RootContext);
    const { register, handleSubmit } = useForm();
    const { signPatientIn } = useAuth()
    const { setSignUp, handleSuccess } = useContext(AuthFormContext);
    const navigate = useNavigate()
    const [error, setError] = useState(false)
    const checkBoxRef = useRef(null);


    const onSubmit = (data) => {
        const checkBox = checkBoxRef.current;

        if (checkBox.checked) {

            const addUrl = `${server}/api/auth/patient/register`
            axios.post(addUrl, data)
                .then(res => {
                    console.log(res);
                    let patient = res.data;
                    signPatientIn(patient, () => { });
                    handleSuccess();
                    navigate("/lk", { replace: true });
                })
                .catch(err => {
                    console.log(err);
                    setError(true);
                    setTimeout(() => setError(false), 300)
                });
        } else {
            setError(true);
            setTimeout(() => setError(false), 300)
        }
    }


    return (
        <form className='auth_form' onSubmit={handleSubmit(onSubmit)}>
            <div className='title'>Регистрация</div>
            <input
                title="Максимум - 50 символов"
                pattern=".{1,50}"
                type="text"
                name="firstName"
                placeholder="Имя"
                required
                {...register("firstName")}
            />
            <input
                itle="Максимум - 50 символов"
                pattern=".{1,50}"
                type="text"
                name="lastName"
                placeholder="Фамилия"
                required
                {...register("lastName")}
            />
            <input
                title="Максимум - 50 символов"
                pattern=".{0,50}"
                type="text"
                name="patronymic"
                placeholder="Отчество"
                {...register("patronymic")}
            />
            <input
                title='Телефон в международном формате'
                pattern='\+7[0-9]{10}'
                type='tel'
                name='phoneNumber'
                placeholder='Телефон'
                className='phone_field'
                required
                autoComplete='username'
                {...register("phoneNumber")}
            />
            <input
                title='Пароль, минимум 8 символов'
                pattern='.{8,50}'
                type='password'
                name='password'
                placeholder='Пароль'
                className='password_field'
                required
                autoComplete="current-password"
                {...register("password")}
            />
            <div className="agreement_block">
                <input
                    ref={checkBoxRef}
                    title="Необходимо согласиться с политикой об обработке и хранении персональных данных"
                    className="agreement_checkbox"
                    type="checkbox"
                    required
                />
                <label className="agreement_text">
                    <span>
                        {"Я соглашаюсь с "}
                    </span>
                    <Link className="agreement_link" to="/agreement" target="_blank" rel="noopener noreferrer" >
                        политикой
                    </Link>
                </label>
            </div>
            <button className={`${error ? "error" : ""}`} type='submit'>Зарегистрироваться</button>
            <div className='switch' onClick={() => setSignUp(false)}>{"Войти"}</div>
        </form >
    )
}