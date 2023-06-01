import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hook/useAuth';

import { RootContext } from '../..';

export const AdminAuth = () => {
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();
    const { signAdminIn } = useAuth();
    const { server } = useContext(RootContext);

    const fromPage = location.state?.from?.pathname || "/admin/";

    const onSubmit = (data) => {
        axios.post(`${server}/api/auth/admin/login`, data)
            .then(response => {
                const admin = response.data.token;
                signAdminIn(admin, () => navigate(fromPage, { replace: true }));
            })
            .catch(error => {
                console.error(error);
                setError(true);
                setTimeout(() => setError(false), 300)
            });
    }

    return (
        <div className="container">
            <div className='big_title'>{fromPage !== "/admin/auth" ? "Необходимо авторизоваться" : "Авторизация"}</div>
            <form className='auth_form admin_form' onSubmit={handleSubmit(onSubmit)}>
                <div className='title'>Вход</div>
                <input
                    title='Username'
                    minLength={1}
                    maxLength={20}
                    type='text'
                    placeholder='Username'
                    required
                    autoComplete='username'
                    {...register('username')} />
                <input
                    title='Password'
                    pattern='.{1,100}'
                    type='password'
                    placeholder='Password'
                    required
                    autoComplete="current-password"
                    {...register('password')} />
                <button className={`button ${error ? "error" : ""}`} type='submit'>Войти</button>
            </form>
        </div>
    )
}