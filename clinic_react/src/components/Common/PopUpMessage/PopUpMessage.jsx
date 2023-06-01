import React, { useState, useEffect } from "react";
import "./PopUpMessage.scss";

export const PopUpMessage = ({ text, type, resetFunc }) => {
    const [show, setShow] = useState(true);
    const [isInvisible, setIsInvisible] = useState(false);


    useEffect(() => {
        setIsInvisible(false);
        setTimeout(() => {
            setShow(false);
            if (resetFunc) resetFunc()
        }, 3700);
    }, []);

    useEffect(() => {
        if (show) {
            setTimeout(() => {
                setIsInvisible(true);
            }, 3000);
        }
    }, [show]);

    return (
        <>
            {show && (
                <div className={`shadow message ${type} ${isInvisible ? "invisible" : ""}`}>
                    <p>{text}</p>
                </div>
            )}
        </>
    );

};


