import React, { useState, createContext, useRef, useEffect } from 'react'
import header from './Header.module.css'
import logo from '../../images/logo.svg'
import name from '../../images/name.svg'
import GoUpButton from './GoUpButton'
import { Auth } from '../Auth/Auth'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hook/useAuth'

export const HeaderContext = createContext();

const setActive = ({ isActive }) => isActive ? header.link__active : ""


const Header = () => {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const location = useLocation();
    const [showLkMenu, setShowLkMenu] = useState(false)
    const lkMenuRef = useRef(null)
    const lkButtonRef = useRef(null)
    const { patient, signPatientOut } = useAuth();
    const navigate = useNavigate();


    useEffect(() => {
        setShowLoginForm(location.state?.showAuthForm || false);
        location.state = null;
    }, [location])


    useEffect(() => {
        const handleClick = (e) => {
            if (lkMenuRef.current) {
                if (!lkMenuRef.current?.contains(e.target) && !lkButtonRef.current?.contains(e.target)) {
                    setShowLkMenu(false);
                }
            }
        };
        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, [lkMenuRef]);

    const handleAppointmentClick = (e) => {
        if (!patient) {
            e.preventDefault();
            setShowLoginForm(true)
        }
    }

    const handleLogOutClick = () => {
        setShowLkMenu(false);
        signPatientOut(() => { navigate("/", { replace: true }) })
    }


    return (
        <header className={header.header}>
            <div className={header.header__top}>
                <Link className={header.logo__container} to='/'>
                    <img className={header.logo} src={logo} alt='Лого'></img>
                    <img className={header.name} src={name} alt='MedClinic'></img>
                </Link>
                <div className={header.header__top__right}>
                    <div className={header.phone__container}>
                        <div className={header.phone}>8 (495) 555-5-555</div>
                        <div className={header.phone}>8 (800) 000-000-0</div>
                    </div>
                    <div className={header.button__container}>
                        <Link className={`${header.book}  ${header.button}`} to='/make_appointment' onClick={(e) => handleAppointmentClick(e)}>Записаться</Link>

                        {patient
                            ? <button type='button' className={`${header.lk__button} ${header.any_log_btn}`} onClick={() => setShowLkMenu(!showLkMenu)} ref={lkButtonRef}></button>
                            : <button type='button' className={`${header.login__button} ${header.any_log_btn}`} onClick={() => setShowLoginForm(true)}></button>
                        }
                        {showLkMenu
                            ? (
                                <div ref={lkMenuRef} className={header.lk__menu}>
                                    <Link className={header.lk__menu__item} to='/lk' onClick={() => setShowLkMenu(false)}>Личный кабинет</Link>
                                    <div className={header.lk__menu__item} onClick={() => handleLogOutClick()}>Выйти</div>
                                </div>
                            )
                            : <></>
                        }


                    </div>
                </div>
            </div>

            <div className={header.header__bot}>
                <nav>
                    <NavLink className={setActive} to='/doctors'>Врачи</NavLink>
                    <NavLink className={setActive} to='/services'>Услуги</NavLink>
                    <NavLink className={setActive} to='/contacts'>Контакты</NavLink>
                    <NavLink className={setActive} to='/about'>Об авторе</NavLink>
                    <Link to='/admin'>{"Admin 🠒"}</Link>
                </nav>
            </div>
            {showLoginForm && (
                <HeaderContext.Provider
                    value={{
                        setShowLoginForm
                    }}>
                    <Auth />
                </HeaderContext.Provider>
            )}

            <GoUpButton />
        </header>
    );
}

export default Header;