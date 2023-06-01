import logo from '../../images/logo.svg'
import name from '../../images/name.svg'

import './Footer.scss'

const Footer = ({ className }) => {
    return (
        <footer className={ className }>
            <div className='logo_container'>
                <img src={logo} className='logo' alt='logo' draggable='false' />
                <img src={name} className='name' alt='MedClinic' draggable='false' />
            </div>
            <div className="about">
                <p>© 2023 MedClinic</p>
                <p>Работу выполнил студент Преснухин Дмитрий, ПИ21-2</p>
            </div>
        </footer>
    )
}

export default Footer