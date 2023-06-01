import loginImg from '../../images/login.png'
import { HeaderContext } from '../Header/Header';
import React, { createContext, useContext, useState } from 'react'
import { LogIn } from './LogIn'

import './Auth.scss'
import { SignUp } from './SignUp';

export const AuthFormContext = createContext();

export const Auth = () => {
    const { setShowLoginForm } = useContext(HeaderContext);
    const [signUp, setSignUp] = useState(false);
    

    const handleSuccess = () => {
        setShowLoginForm(false);
    }

    return (
        <>
            <div className='overflow' onClick={() => { setShowLoginForm(false) }}></div>

            <div className='floating_container'>
                <img className='login_img' src={loginImg} alt='' draggable='false' />
                <AuthFormContext.Provider
                    value={{
                        setSignUp,
                        handleSuccess
                    }}>
                    {!signUp ? <LogIn /> : <SignUp />}
                </AuthFormContext.Provider>

            </div>
        </>
    )
}