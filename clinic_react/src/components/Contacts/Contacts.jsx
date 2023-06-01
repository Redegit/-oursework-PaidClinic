import { GeoObject, Map, Placemark, YMaps } from "@pbe/react-yandex-maps"

import "./Contacts.scss"

export const Contacts = () => {

    return (

        <div className="container bg">
            <div className="big_title shadow">Контакты</div>
            <div className="contacts_container shadow">
                <div className="left">
                    <div>
                        <div className="title">Телефоны</div>
                        <div>+7 (495)-111-00-99</div>
                        <div>+7 (915)-999-00-99</div>
                    </div>
                    <div>
                        <div className="title">Адрес</div>
                        <div>109456, Москва, 4-й Вешняковский проезд, 4с3. Метро Рязанский проспект</div>
                    </div>
                    <div className="fa_photo shadow2"></div>
                </div>
                <div className="right shadow2">
                    <YMaps >
                        <Map defaultState={{ center: [55.7177, 37.794], zoom: 16 }} height="600px" width={"40vw"}>

                            <Placemark
                                geometry={[55.71835, 37.79553]}
                                options={
                                    {
                                        preset: 'islands#blueEducationIcon',
                                        iconColor: '#0082d9',
                                    }}
                            />
                        </Map>
                    </YMaps>
                </div>
            </div>
        </div >
    )
}