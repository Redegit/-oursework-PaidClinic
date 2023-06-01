import React from 'react'
import { SetParallaxEffect } from '../../Common/SetParallaxEffect';
import "./AdvantagesBox.scss"
import { AdvantagesItem } from './AdvantagesItem';

export const BoxContext = React.createContext();

const AdvantagesBox = () => {
    const [activeItem, setActiveItem] = React.useState(0);
    const containerRef = React.useRef(null)

    const advantages = [
        { title: "Профессионализм", desc: "В наших медицинских центрах работает более 3500 квалифицированных врачей различных специальностей, среди которых 202 кандидата медицинских наук, 26 докторов медицинских наук, 17 профессоров, 2 академика РАМН, 9 доцентов и старших научных сотрудников" },
        { title: "Широкий спектр услуг", desc: "Наш формат - универсальная семейная клиника, в которой взрослым и детям оказываются различные виды медицинской помощи. Диагностика, лечение и профилактика заболеваний практически по всем направлениям современной медицины" },
        { title: "Современное оборудование", desc: "МРТ и КТ-диагностика, УЗИ, эндоскопия, собственная лаборатория, где можно сдать более 3500 анализов и в короткие сроки получить результат" },
        { title: "Высокий уровень обслуживания", desc: "Удобный график работы, отсутствие очередей, индивидуальный подход к каждому посетителю медицинского центра, чуткий и внимательный персонал" },
        { title: "Скорая помощь и служба помощи на дому", desc: "Оказание неотложной помощи, срочная медицинская транспортировка, вызов врача на дом, обследование и процедуры на дому" },
        { title: "Терапевтические и хирургические стационары", desc: "Обследование и лечение в условиях стационара. Пребывание в комфортных условиях под круглосуточным наблюдением специалистов" },
        { title: "Срочное оформление медицинской документации", desc: "Справки, медкарты, медицинские книжки и иные виды документов, которые можно получить в срочном порядке" },
        { title: "Постоянное развитие в научно-практической сфере", desc: "Сотрудничество с ведущими научно-исследовательскими институтами и медицинскими факультетами крупнейших вузов страны, изучение и адаптация зарубежного опыта, внедрение новейших медицинских методик и сервисных технологий. В 2017 году на базе Холдинга создана Университетская клиника РУДН" },
        { title: "Акции и специальные предложения", desc: "В нашей клинике действует накопительная дисконтная система для постоянных посетителей, для наших посетителей доступны сезонные акции и специальные предложения" }
    ]


    SetParallaxEffect(containerRef, 100)

    return (

        <div className='advantages_container' ref={containerRef}>
            <div className='title'>Наши преимущества</div>
                <div className='advantages_box'>
                    <BoxContext.Provider
                        value={{
                            activeItem,
                            setActiveItem,
                        }}
                    >
                        {advantages.map((item, index) => (
                            <AdvantagesItem data={item} key={index} itemIndex={index} />
                        ))}
                    </BoxContext.Provider>
                </div>
            
        </div>
    );
}

export default AdvantagesBox;