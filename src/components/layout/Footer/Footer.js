import React, { useEffect, useState } from 'react';
import './Footer.css';

const Footer = () => {
    const [isBottom, setIsBottom] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
            setIsBottom(bottom);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <footer>
            <span className={`footer_message ${isBottom ? 'neon' : ''}`}>You reached bottom D:</span>
        </footer>
    );
};

export default Footer;
