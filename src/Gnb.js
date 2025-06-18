import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import './css/gnb/gnb.css'


function Gnb() {

    const { pathname } = useLocation();

    const [colorChange, setColorChange] = useState(false);
    useEffect(() => {
        if (pathname === '/works') return;

        const handleScroll = () => {
            const currentScrollY = window.scrollY
            const viewportHeight = window.innerHeight;

            if (currentScrollY >= viewportHeight) {
                setColorChange(true)
            } else {
                setColorChange(false)
            }
        };

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }

    }, [pathname])






    
    return (
        <div className={`gnbWrap ${colorChange ? 'change' : ''}`}>
            <ul>
                <li className='logoGnb'><Link to="/">Logo</Link></li>
                <li className='mainGnb'><Link to="/">Main</Link></li>
                <li className='aboutGnb'><Link to="/about">About</Link></li>
                <li className='worksGnb'><Link to="/works">Works</Link></li>
            </ul>
        </div>
    )
}

export default Gnb;
