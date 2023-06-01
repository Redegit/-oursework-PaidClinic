import Dots from "./Dots"
import React, { useContext } from "react";
import { SliderContext } from "./Slider";

import "./Slider.scss"


export const Controls = () => {
    const { changeSlide } = useContext(SliderContext);


    return (
        <div className="controls">
            <div className="arrow left" onClick={() => changeSlide(-1)} />

            <Dots />
            <div className="arrow right" onClick={() => changeSlide(1)} />

        </div>
    )
}