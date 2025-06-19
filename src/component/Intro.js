import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

import '../css/intro/intro.css'

function Intro({ onCompleted }) {

    const textRefs = useRef([]);
    const mainTitle = "Hello".split("")

    useEffect(() => {

        const oddText = textRefs.current.filter((_, i) => i % 2 === 1);
        // oddText >> e , l
        const evenText = textRefs.current.filter((_, i) => i % 2 === 0);
        //  evenText >> h , l , o

        gsap.set(evenText, { autoAlpha: 0, y: 50 })
        gsap.set(oddText, { autoAlpha: 0, y: -50 })

        const tl = gsap.timeline({
            onComplete: () => {
                onCompleted();
            }
        });

        tl.to(evenText,
            {
                autoAlpha: 1,
                y: 0,
                duration: 2,
                ease: "power4.out"
            },0.5)
            .to(oddText,
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 2,
                    ease: "power4.out"
                },0.5)

            .to(evenText,
                {
                    y: 50,
                    duration: 0.5,
                    ease: "back.in"
                }, 3)
            .to(oddText,
                {
                    y: -50,
                    duration: 0.5,
                    ease: "back.in"
                }, 3)

            .to(".topWrap >div", { y: -2 }, 3.2)
            .to(".bottomWrap >div", { y: 2 }, 3.2)

            .to(".topWrap .odd", {
                yPercent: -100,
                ease: "sine.inOut",
                stagger: {
                    each: 0.02,
                    from: "center"
                }
            }, 3.7)
            .to(".topWrap .even", {
                yPercent: -100,
                ease: "sine.inOut",
                stagger: {
                    each: 0.02,
                    from: "center"
                }
            }, 3.75)


            .to(".bottomWrap .odd", {
                yPercent: 100,
                ease: "sine.inOut",
                stagger: {
                    each: 0.02,
                    from: "center"
                }
            }, 3.7)
            .to(".bottomWrap .even", {
                yPercent: 100,
                ease: "sine.inOut",
                stagger: {
                    each: 0.02,
                    from: "center"
                }
            }, 3.75)

        return () => {
            tl.kill();
        }

    }, [onCompleted]);

    return (
        <div className='introWrap'>
            <div className='topWrap'>
                <div className='odd'></div>
                <div className='even'></div>
                <div className='odd'></div>
                <div className='even'></div>
                <div className='odd'></div>
                <div className='even'></div>
                <div className='odd'></div>
                <div className='even'></div>
                <div className='odd'></div>
                <div className='even'></div>
                <div className='odd'></div>
                <div className='even'></div>
                <div className='odd'></div>
                <div className='even'></div>
                <div className='odd'></div>
                <div className='even'></div>
                <div className='odd'></div>
                <div className='even'></div>
                <div className='odd'></div>
                <div className='even'></div>
            </div>
            <div className='bottomWrap'>
                <div className='odd'></div>
                <div className='even'></div>
                <div className='odd'></div>
                <div className='even'></div>
                <div className='odd'></div>
                <div className='even'></div>
                <div className='odd'></div>
                <div className='even'></div>
                <div className='odd'></div>
                <div className='even'></div>
                <div className='odd'></div>
                <div className='even'></div>
                <div className='odd'></div>
                <div className='even'></div>
                <div className='odd'></div>
                <div className='even'></div>
                <div className='odd'></div>
                <div className='even'></div>
                <div className='odd'></div>
                <div className='even'></div>
            </div>
            <div className='text'>
                {
                    mainTitle.map((char, idx) => (
                        <p key={idx} ref={(el) => textRefs.current[idx] = el}>{char}</p>
                    ))
                }
            </div>
        </div>
    )
}

export default Intro
