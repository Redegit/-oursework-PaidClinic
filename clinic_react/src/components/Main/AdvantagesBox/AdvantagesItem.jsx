import "./AdvantagesBox.scss"
import React, { useState, useContext, useEffect } from 'react'
import { BoxContext } from "./AdvantagesBox";

export const AdvantagesItem = ({ data: { title, desc }, itemIndex }) => {
    const [activeClass, setActiveClass] = useState('');
    const { activeItem, setActiveItem } = useContext(BoxContext);

    const handleMouseEnter = () => {
        if (window.innerWidth > 900) {
            setActiveItem(itemIndex)
        }
    };

    const handleClick = () => {
        if (window.innerWidth <= 900) {
            if (activeItem === itemIndex) {
                setActiveItem(null)
            } else {
                setActiveItem(itemIndex)
            }
        }

    }

    useEffect(() => {
        activeItem === itemIndex ? setActiveClass('active') : setActiveClass('')
    },);

    return (
        <div className={`advantages_item ${activeClass}`}>
            <div className='advantages_left'
                onMouseEnter={handleMouseEnter}
                onClick={handleClick}>
                <div className='left_title'>
                    {title}
                </div>
            </div>
            <div className='advantages_right'>
                <div className='advantages_content'>
                    <div className='advantages_title'>
                        {title}
                    </div>
                    <div className='advantages_text'>
                        {desc}
                    </div>
                </div>
            </div>
        </div>
    )
}