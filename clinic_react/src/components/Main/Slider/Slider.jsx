import React, { useEffect, useState, createContext, useRef } from "react";
import Slide from "./Slide";

import "./Slider.scss"
import { Controls } from "./Controls";

export const SliderContext = createContext();

const Slider = () => {
    const [items, setItems] = useState([]);
    const [currentSlide, setCurrent] = useState(0);
    const slideListRef = useRef(null)

    useEffect(() => {

        const images = [
            {url: "images/Slider/AI/1.jpg", title: "Новейшие технологии", description: "Откройте двери в будущее с новейшими технологиями!"},
            {url: "images/Slider/AI/2.jpg", title: "Профессионалы в генетике", description: "Доверьте свою генетику профессионалам в исследовании. "},
            {url: "images/Slider/AI/3.jpg", title: "Лучшее оборудование", description: "Не жертвуйте качеством – выбирайте наше лучшее и самое современное оборудование!"},
            {url: "images/Slider/AI/4.jpg", title: "Препараты со всего мира", description: "У нас есть лекарства со всего мира - все, чтобы вы чувствовали себя еще лучше!"},
        ]


        
        setItems(images);
    }, []);

    const changeSlide = (direction = 1) => {
        let destSlide = (currentSlide + direction + items.length) % items.length

        goToSlide(destSlide)
    };

    const goToSlide = (destSlide) => {
        let shift

        (window.innerWidth <= 900) ? shift = - (destSlide) * 100 : shift = - (destSlide) * 75

        slideListRef.current.style.marginLeft = `${shift}%`

        setCurrent(destSlide)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            changeSlide(1);
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [items.length, currentSlide]);

    return (
        <div className="slider">

            <SliderContext.Provider
                value={{
                    changeSlide,
                    goToSlide,
                    slidesCount: items.length,
                    slideNumber: currentSlide,
                }}>
                <div className="slide-list" ref={slideListRef}>

                    {items.map((item, index) => (
                        <Slide key={index} data={item} />
                    ))}
                </div>
                <Controls />
            </SliderContext.Provider>
        </div>
    );
}


export default Slider;