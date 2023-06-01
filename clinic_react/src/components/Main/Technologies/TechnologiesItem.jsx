import React from 'react'
import { SetParallaxEffect } from '../../Common/SetParallaxEffect'
import './Technologies.scss'

export const TechnologiesItem = ({ item: { img, title, desc }, index }) => {
    const itemRef = React.useRef(null)

    SetParallaxEffect(itemRef, (40 + Math.floor(index / 2) * 20))

    return (
        <div className='item' ref={itemRef}>
            <div className='image_container'>
                <img src={img} alt={title} className='image' draggable="false"/>
            </div>
            <div className='text_block'>
                <div className='item_title'>
                    {title}
                </div>

                <ul className='item_description'>
                    {desc.map((listItem, index) => (
                        <li key={index}>{listItem}</li>
                    ))}
                </ul>

            </div>
        </div>
    )
}