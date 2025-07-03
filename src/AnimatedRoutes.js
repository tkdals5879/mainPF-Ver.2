import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

import Main from './pages/Main';
import About from './pages/About';
import Works from './pages/Works';
import Archive from './pages/Archive';

function AnimatedRoutes({showIntro}) {

    const { pathname } = useLocation();
    const containerRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(pathname)

    const getPageComponent = (pageName) => {
        switch (pageName) {
            case '/': return <Main showIntro={showIntro} />
            case '/about': return <About />
            case '/works': return <Works />
            case '/archive': return <Archive />
            default: return <Main />
        }
    }

    useEffect(() => {
        if (pathname !== currentPage) {

            const tl = gsap.timeline({
                onComplete: () => {
                    setCurrentPage(pathname);
                    window.scrollTo(0,0)
                }
            });

            tl.to(containerRef.current, {
                opacity: 0,
                duration: 0.3,
            });
        }

    }, [pathname,currentPage])

    useEffect(() => {
        gsap.fromTo(containerRef.current,
            {
                opacity: 0,
            },
            {
                opacity: 1,
                duration:0.8,
            }
        )
    }, [currentPage])

    return (
        <div ref={containerRef}>
            {getPageComponent(currentPage)}
        </div>
    )
}
export default AnimatedRoutes;