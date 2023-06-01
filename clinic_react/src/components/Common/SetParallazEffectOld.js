import { useEffect } from 'react';

export const SetParallaxEffectOld = (ref, shift) => {

    useEffect(() => {

        window.addEventListener('scroll', handleScroll);

        ref.current.style.transition = 'transform 1s'

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScroll = () => {
        const rect = ref.current.getBoundingClientRect()

        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            ref.current.style.transform = `translateY(${- Math.min((1 - rect.top / window.innerHeight), 1) * shift}px)`;
        }
    };

    return ref;
}