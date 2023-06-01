import { SocialIcon } from 'react-social-icons'
import './About.scss'

// Компонент страницы "Об авторе"
export const About = () => {
    return (
        <div className="container bg">
            <div className="big_title shadow">Об авторе</div>
            <div className="about_box shadow">
                <div className="itiabd_img shadow2" />
                <div className="text_container">
                    <div className='greetings'>
                        <p>Здравствуйте!</p>
                        <p>Меня зовут Дмитрий Преснухин.</p>
                        <p>Я студент Финансового Университета, группы ПИ21-2.</p>
                    </div>
                    <div className='text'>
                        <p>
                            Эта работа является моим курсовым проектом, который помог мне погрузиться в мир веб-разработки
                            и попробовать себя в создании веб-приложений на практике.
                        </p>
                        <p>
                            Я изучаю различные технологии и инструменты для создания веб-приложений,
                            например, клиентская часть этого проекта полсностью написана на React, а серверная - на Java Spring,
                            с использованием ORM Hibernate и REST API.
                            В свободное время я также учусь новым языкам программирования и совершенствую свои
                            навыки в уже изученных.
                        </p>
                        <p>
                            В этом проекте я старался использовать все знания, которые я получил за время учебы и
                            постарался сделать приложение максимально удобным и функциональным для пользователей.
                            Любые возможные замечания будут учтены мной при дальнейшей разработке.
                        </p>
                    </div>
                    <div className='media_links'>
                        <SocialIcon url='https://vk.com/fire_n_blood' target="_blank" bgColor='var(--main-color)' />
                        <SocialIcon url='https://t.me/redegit' target="_blank" />
                        <SocialIcon url='https://github.com/Redegit' target="_blank" />
                        <SocialIcon url='https://discordapp.com/users/589093331011764229' target="_blank" />
                        <SocialIcon url='mailto:dima070603@gmail.com' target="_blank" />
                    </div>
                </div>
            </div>
        </div >
    )
}