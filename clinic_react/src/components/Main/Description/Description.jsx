import photo from "../../../images/Main/clinic_corridor.jpg"
import photo2 from '../../../images/Main/corridor_landscape.jpg'
import "./Description.scss"
import { SetParallaxEffect } from "../../Common/SetParallaxEffect";
import React from 'react'

const Description = () => {
    const leftImageRef = React.useRef(null)
    const span1 = React.useRef(null)
    const span2 = React.useRef(null)
    const headingRef = React.useRef(null)
    const rightImageRef = React.useRef(null)

    SetParallaxEffect(leftImageRef, 50)
    SetParallaxEffect(span2, 30)

    SetParallaxEffect(headingRef, 70)
    SetParallaxEffect(span1, 50)
    SetParallaxEffect(rightImageRef, 30)

    return (
        <div className='description'>
            <div className="description_container">
                <div className="left">
                    <div ref={leftImageRef} className="image_left" draggable="false" />
                    <span ref={span2} className="text">
                        Мы гордимся тем, что наша команда опытных специалистов обладает высокой квалификацией и профессионализмом,
                        что позволяет нам обеспечивать лучшее качество медицинского обслуживания для наших пациентов
                    </span>
                </div>
                <div className="right">
                    <div>
                        <div ref={headingRef} className="heading">Здоровье - наша главная ценность, а вы - наша главная забота!</div>
                        <span ref={span1} className="text">
                            Наша частная медицинская клиника предлагает высококачественные услуги,
                            основанные на передовых методах лечения и современных технологиях
                        </span>
                    </div>
                    <div ref={rightImageRef} className='image_right' draggable="false" />
                </div>
            </div>
        </div >
    );
};

export default Description;