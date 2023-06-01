import { Outlet } from "react-router-dom"
import { AdminHeader } from "./AdminHeader"

import './AdminPage.scss'

export const AdminPage = () => {



    return (
        <>
            <AdminHeader />
            <Outlet />
        </>
    )
}