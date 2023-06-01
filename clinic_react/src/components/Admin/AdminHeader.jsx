import React from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hook/useAuth'


export const AdminHeader = () => {
    const { admin, signAdminOut } = useAuth();
    const navigate = useNavigate();



    return (
        <div className="admin_header">
            <nav>
                <Link to='/'>{"🠐 Home"}</Link>
                <Link to='/admin' className='admin_logo'>Admin</Link>
                <NavLink to='/admin/patients'>Пациенты</NavLink>
                <NavLink to='/admin/doctors'>Врачи</NavLink>
                <NavLink to='/admin/services'>Услуги</NavLink>
                <NavLink to='/admin/appointments'>Приёмы</NavLink>
                <NavLink to='/admin/statistics'>Статистика</NavLink>
                {admin &&
                    <button className='button logout_button' onClick={() => signAdminOut(() => navigate("/admin/auth", { replace: true }))}>Выйти</button>
                }
            </nav>
        </div>
    )
}