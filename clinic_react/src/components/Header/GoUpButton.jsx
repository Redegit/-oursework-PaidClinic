import React, { useState, useEffect } from 'react';
import style from './Header.module.css'

const GoUpButton = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    function handleScroll() {
        setShowButton(window.pageYOffset > 500);
    }

    return (
        <button style={
            (showButton) ?
                { transform: 'translateY(0px)' } :
                { transform: 'translateY(100px)' }}
            className={style.go_up_button}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        </button>
    );
};

export default GoUpButton;