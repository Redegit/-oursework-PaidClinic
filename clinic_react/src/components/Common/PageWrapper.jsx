import { Outlet } from "react-router-dom"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"

const PageWrapper = () => {
    return (
        <>
            <Header />

            <Outlet />

            <Footer />
        </>
    )
}

export { PageWrapper }