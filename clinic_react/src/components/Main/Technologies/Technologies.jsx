import React from 'react'
import { SetParallaxEffect } from '../../Common/SetParallaxEffect'
import './Technologies.scss'
import { TechnologiesItem } from './TechnologiesItem'


export const Technologies = () => {
    const containerRef = React.useRef(null)

    SetParallaxEffect(containerRef, 100)

    const techs = [
        {
            img: "images/Technologies/КТ.png", title: "КТ", desc: [
                "1,5 тесла / до 200 кг",
                "3D/4D запись исследования",
                "МР маммография",
                "МРТ всего тела за 1,5 часа",
                "МРТ суставов"]
        },
        {
            img: "images/Technologies/МРТ.png", title: "МРТ", desc: [
                "128 срезов / до 227 кг",
                "3D/4D запись исследования",
                "Виртуальная колоноскопия",
                "МСКТ ангиография сердца",
                "МСКТ коронарного кальция"]
        },
        {
            img: "images/Technologies/Рентген.png", title: "Рентген", desc: [
                "3D робот-рентген Multitom Rax",
                "Трехмерное сканирование в онлайн-режиме",
                "Цифровая сшивка снимков позвоночника",
                "Урография",
                "Ирригоскопия"]
        },
        {
            img: "images/Technologies/УЗИ.png", title: "УЗИ", desc: [
                "3D/4D режим",
                "Высокий уровень визуализации",
                "УЗИ глаза",
                "УЗИ при беременности по международным стандартам",
                "Эластография"]
        },
    ]



    return (
        <div className='technologies_container' ref={containerRef}>
            <div className='title'>
                Технологии и оборудование
            </div>
            <div className='body'>
                {techs.map((item, index) => (
                    <TechnologiesItem item={item} key={index} index={index} />
                ))}
            </div>
        </div >
    )
}