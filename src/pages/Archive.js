import { useEffect } from 'react'
import archiveList from '../data/archiveList';
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'


import "../css/archive/archive.css"

function Archive() {

    // 최상단에서의 스크롤막기
    useEffect(() => {
        const preventScrollUp = (e) => {
            if (window.scrollY <= 0 && e.deltaY < 0) {
                e.preventDefault();
            }
        };

        window.addEventListener('wheel', preventScrollUp, { passive: false });

        return () => {
            window.removeEventListener('wheel', preventScrollUp);
        };
    }, []);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);


        const sections = gsap.utils.toArray(".archive")

        sections.forEach((section) => {
            const wrapper = section.querySelector(".wrapper");

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "+=2000",
                    pin: true,
                    scrub: 1,
                }
            });

            tl.to({}, { duration: 0.3 });

            tl.to(wrapper, {
                xPercent: -100,
                ease: "none",
                duration: 0.4
            });

            tl.to({},{duration:0.3})
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        }

    }, [])



    return (
        <div className='archiveWrap'>
            <h1>Archive</h1>
            <div className='archiveDesc'>
            <p>특정 기능을 구현하기위한 로직을 실험하는 사이트들 입니다. <br/>
            이러한 과정을 통해 다양한 효과를 구현하기위해 끊임없이 노력하고있습니다.</p>
            <span>scroll down <FontAwesomeIcon icon={faCaretDown} /></span>
            </div>
            {archiveList.map((el, idx) => (
                <div className={`archive ${el.name}`} key={idx}>
                    <div className='wrapper'>
                        <h2>{el.name}</h2>
                        <div className='notice'>
                            <div className='type'>
                                <p>type</p>
                                <span>{el.type}</span>
                            </div>
                            <div className='count'>
                                <p><span className='accent'>{idx + 1}</span> &#47; {archiveList.length} website featured</p>
                            </div>
                        </div>

                        <div className='information'>
                            <div className='description'>
                                <p>Description</p>
                                <span>{el.desc}</span>
                            </div>
                            <div className='addDate'>
                                <p>Add Date</p>
                                <span>{el.addDate}</span>
                            </div>
                        </div>

                        <a className='viewWrap' href={el.link} target='_blank' rel="noreferrer">
                            <button className='view'>View</button>
                            <button className='arrow'><FontAwesomeIcon icon={faArrowRight} /></button>
                        </a>

                    </div>
                </div>
            ))}
        </div>
    )
}

export default Archive;