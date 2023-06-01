import { useEffect } from 'react';

export const SetParallaxEffect = (ref, shift) => {

    let lastScrollPosition = 0;

    useEffect(() => {

        window.addEventListener('scroll', handleScroll);

        ref.current.style.transition = 'transform 1s'

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScroll = () => {
        const rect = ref.current.getBoundingClientRect()

        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            let translate = 0
            if (window.pageYOffset > lastScrollPosition) {
                translate = -shift
            } else {
                translate = 0
            }
            ref.current.style.transform = `translateY(${translate}px)`;
        }

        lastScrollPosition = window.pageYOffset;
    };

    return ref;
}


