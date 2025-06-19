import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

import '../css/intro/intro.css'

function Intro({ onCompleted }) {

    const introRef = useRef(null);
    const textRefs = useRef([]);
    const mainTitle = "Hello".split("")

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                onCompleted();
            }
        });

        tl.fromTo(textRefs.current,
            {
                autoAlpha: 0,
                y: -50
            },
            {
                autoAlpha: 1,
                y: 0,
                duration: 2,
                ease: "expo",
                stagger: 0.2
            },
        )
            .to(textRefs.current, {
                autoAlpha:0,
            })
            .to(textRefs.current, {
                x:-100
            },"<")

            .to(introRef.current, {
                yPercent: -100,
                duration: 1,
                ease: "back.in"
            })

        return () => {
            tl.kill();
        }

    }, [onCompleted]);

    return (
        <div className='introWrap' ref={introRef}>
            <div className='marqueeText num1'><p>Front-end Developer</p></div>
            <div className='marqueeText num2'><p>communicatio, passion</p></div>
            <div className='marqueeText num3'><p>thank you for visiting my site</p></div>
            <div className='marqueeText num4'><p>stagnation is regression</p></div>
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
