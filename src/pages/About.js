import React, { useEffect, useLayoutEffect, useState } from 'react'
import Footer from '../component/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all'

import '../css/about/about.css'

function About() {

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



    // ////////////////////////////////////////gsap ▼
    gsap.registerPlugin(ScrollTrigger);

    useLayoutEffect(() => {

        const zoomIn = gsap.timeline();
        zoomIn.to(".aboutBg", { scale: 3, x: -300 })
            .to(".text", { autoAlpha: 0, y: -50 }, "<")
            .to(".aboutBg", { x: -1000 })
            .to(".aboutBg", { y: 200 })
            .from(".horizontalMoveText", { autoAlpha: 0 }, "<")
            .from(".cloud", { autoAlpha: 0, x: 100 }, "<")
            .to({}, { duration: 0.6 })

        const trigger = ScrollTrigger.create({
            trigger: "#section01",
            start: "top top",
            end: "+=7000",
            scrub: 1,
            pin: true,
            markers: false,
            anticipatePin: true,
            animation: zoomIn,
        });

        ScrollTrigger.refresh()

        return () => {
            zoomIn.kill();
            trigger.kill();
        }

    }, [])







    return (
        <div className='aboutWrap'>
            <main>
                <section id='section01'>
                    <div className='text'>
                        <h2 className='title'>ABOUT</h2>
                        <p>scroll Experience</p>
                    </div>
                    <div className='aboutBg'></div>
                    <div className='cloud'></div>
                    <p className='horizontalMoveText'>
                        저는 도시계획을 전공한 뒤,<br />프론트엔드 개발에 매력을 느껴 새로운 도전을 시작한 이상민입니다.<br />
                        사용자의 니즈를 고려해 도시라는 공간을 설계하던 경험이,<br />
                        웹이라는 디지털 공간을 사용자 중심으로 구축하는 일과 자연스럽게 연결되었습니다.<br />
                        그렇게 저는, 사람과 공간을 잇는 또 다른 방식으로서 <br /> 프론트엔드 개발의 길을 걷고있습니다.
                    </p>
                </section>

                <section id='section02'>
                    <div className='introduceWrap'>

                        <div className='questionWrap'>
                            <div className='question1'>
                                <h2>Q. 프론트엔드로 전향한 이유? </h2>
                                <p>도시계획학과를 전공하며, 물리적 공간에서 사용자의 경험을 극대화할 수 있는 동선 설계와 도로망 구성, <br />
                                    그리고 다양한 거주민의 니즈를 반영한 시설 배치 방안에 대해 배웠습니다.<br />
                                    이러한 경험은 웹 환경에서도 사용자 중심의 경험을 설계하는 프론트엔드 개발 업무와 자연스럽게 연결되었고, <br />
                                    그 과정에서 웹이라는 디지털 공간을 설계하는 일에 깊은 흥미를 느꼈습니다.</p>
                            </div>
                            <div className='question2'>
                                <h2>Q. 가장 중요하게 생각하는 가치관은? </h2>
                                <p>"정체는 곧 퇴보다" <br />
                                    익숙함에 안주하지 않고 끊임없이 도전하는 것이 저의 가장 중요한 가치입니다. <br />
                                    기술은 끊임없이 발전합니다. 그래서 저는, 멈추지 않습니다. <br />
                                    열정과 꾸준함으로 성장하는 개발자가 되겠습니다.

                                </p>
                            </div>
                            <div className='auestion3'>
                                <h2>Q. 개인역량 강화를 어떻게하는지? </h2>
                                <p>새로운 기능을 구현하고 싶을 때는 직접 손으로 코드를 작성해보며 학습합니다. <br />
                                    그 과정에서 마주하는 문제는 다양한 자료를 참고하며 끝까지 해결하려고 노력하며, 사이드 프로젝트를 통해 실전 감각과 기술 응용 능력도 함께 키우려 노력합니다.<br /><br />
                                    디자인 감각은 타고나는 것이 아니라 만들어가는 것이라 생각하기에, <br />
                                    다소부족한 디자인 감각을 끌어올리기위해 국내외를 막론한 다양한 웹사이트를 참고합니다. <br />
                                    실제로, 인상 깊은 UI는 클론 코딩을 통해 직접 구현해보며 디자인 감각을 키워가고 있습니다.

                                </p>
                            </div>
                        </div>
                    </div>

                </section>
            </main>

            {/* //////////////////// footer //////////////////// */}
            <Footer />
            {/* //////////////////// footer //////////////////// */}
        </div>
    )
}

export default About;
