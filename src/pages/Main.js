import { useEffect, useState, useRef } from 'react'
import Footer from '../component/Footer'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

import '../css/main/main.css'

function Main({ showIntro }) {

    const [show, setShow] = useState(false);

    useEffect(() => {
        const delay = setTimeout(() => {
            setShow(true)
            console.log(show)
        }, 200)
        return () => clearTimeout(delay)
    }, [show]);

    const topText = "PORTFOLIO VER.2".split("")
    const bottomText = "DEVELOPER".split("")

    // 최상단에서의 스크롤막기
    useEffect(() => {
        const preventScrollUp = (e) => {
            if (window.scrollY <= 0 && e.deltaY < 0) {
                e.preventDefault();
            }
        };

        window.addEventListener('wheel', preventScrollUp, { passive: false });

        ScrollTrigger.refresh()

        return () => {
            window.removeEventListener('wheel', preventScrollUp);
        };
    }, []);

    ////////////////////////////////////// gsap
    gsap.registerPlugin(ScrollTrigger);

    // section01 mainText gsap ▼
    useEffect(() => {
        gsap.set(".reveal", { opacity: 0, y: -30 })
        const textAni = gsap.timeline();
        textAni.to(".reveal", {
            opacity: 1,
            y: 0,
            delay: showIntro ? 4.2 : 0,
            ease:"sine.out",
            stagger: {
                amount: 0.8,
                from: "random"
            },
        });
    }, [showIntro])


    // section03 box timeline gsap ▼
    useEffect(() => {
        const ani1 = gsap.timeline();
        ani1.from('#section03 .gsapBoxWrap .boxA', { y: -100, autoAlpha: 0 })
            .from('#section03 .gsapBoxWrap .boxB', { y: -100, autoAlpha: 0 })
            .from('#section03 .gsapBoxWrap .boxC', { y: -100, autoAlpha: 0 })

        const trigger = ScrollTrigger.create({
            trigger: '#section03',
            start: "top top",
            end: "+=3000",
            scrub: true,
            pin: true,
            animation: ani1
        })

        ScrollTrigger.refresh()

        return () => {
            ani1.kill();
            trigger.kill();
        }

    }, []);



    // object gsap ▼

    const objectRef01 = useRef(null);
    const objectRef02 = useRef(null);
    const objectRef03 = useRef(null);

    // boxA animation ▼
    useEffect(() => {
        const boxes = objectRef01.current.querySelectorAll("div");
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

        boxes.forEach((box, idx) => {
            tl.to(box,
                {
                    rotate: 360,
                    duration: 1,
                    ease: "power1.inOut",

                }, idx * 0.13);
        });

        return () => {
            tl.kill();
        };

    }, []);

    // boxB animation ▼
    useEffect(() => {
        const boxes = objectRef02.current.querySelectorAll("div");
        const tl = gsap.timeline({ repeat: -1 })

        boxes.forEach((box, idx) => {
            tl.to(box, {
                width: "60%",
                height: "60%",
                duration: 1,
                ease: "power1.inOut"
            }, idx * 0.2);
        });

        return () => {
            tl.kill();
        };

    }, [])


    // boxC animation ▼
    useEffect(() => {
        const box = objectRef03.current.querySelector("div");
        const tl = gsap.timeline({ repeat: -1 })
        tl.to(box, { height: "16%" })
            .to(box, { borderRadius: 100 })
            .to(box, { width: "12%" })
            .to(box, { height: "60%" })
            .to(box, { borderRadius: 0 })
            .to(box, { rotate: 180 })
            .to(box, { width: "60%" })

        return () => {
            tl.kill();
        }

    }, [])

    ////////////////////////////////////// gsap








    return (
        <div className='mainWrap'>

            <main>
                {/* //////////////////////////////////////// section01 ( main ) //////////////////////////////////////// */}
                <section id='section01'>

                    <div className='bgVideo'>
                        <video src="/mainBg.mp4" autoPlay loop muted></video>
                    </div>
                    <div className='section01Size'>
                        <h1>
                            <span className='h1TopWrap'>
                                {
                                    topText.map((char, idx) => (
                                        <span
                                            key={idx}
                                            className='reveal'>
                                            {char}
                                        </span>
                                    ))
                                }
                            </span>
                            <span className='h1BottomWrap'>
                                {
                                    bottomText.map((char, idx) => (
                                        <span
                                            key={idx}
                                            className='reveal'>
                                            {char}
                                        </span>
                                    ))
                                }
                            </span>
                        </h1>
                    </div>
                </section>
                {/* //////////////////////////////////////// section01 ( main ) //////////////////////////////////////// */}



                {/* //////////////////////////////////////// section02 (Works) //////////////////////////////////////// */}
                <section id='section02'>
                    <div className='textBox'>
                        <h2><span className='circle'></span>Works</h2>
                        <div>
                            <p>저의 작업물입니다. <br />
                                개인역량 강화를 위해 노력합니다. <br />
                                작업을 거듭할수록 발전하는 디자인을 지향합니다.</p>
                            <span>최신 순 <FontAwesomeIcon icon={faArrowDown} /> </span>
                        </div>
                    </div>

                    <div className='projectBoxWrap'>

                        {/* //////////////////// KBO Project //////////////////// */}
                        <div className='projectBox'>
                            <div className='projectImg'>
                                <img src="/kboProjectImg.webp" alt="KboProjectImg" />
                                <div className='toolWrap'>
                                    <div><img src="/html.svg" alt="htmlImg" /></div>
                                    <div><img src="/css.svg" alt="cssImg" /></div>
                                    <div><img src="react.svg" alt="reactImg" /></div>
                                    <div><img src="redux.svg" alt="reduxImg" /></div>
                                    <div><img src="github.svg" alt="gitHubImg" /></div>
                                    <div><img src="netlify.svg" alt="netlifyImg" /></div>
                                    <div><img src="figma.svg" alt="figmaImg" /></div>
                                </div>
                            </div>
                            <div className='projectInfo'>
                                <div className='projectInfo_name'>
                                    <h2>KBO Project</h2>
                                </div>
                                <div className='projectInfo_text'>
                                    <div className='IPDWrap'>
                                        <div className='introduce'>
                                            <h3>Introduce.</h3>
                                            <p>국내 프로야구 리그 (KBO)에 관련된 정보를 제공하는 사이트</p>
                                        </div>
                                        <div className='point'>
                                            <h3>Point.</h3>
                                            <p>Redux를 사용하여 전역에서 Props를 관리 <br />
                                                백엔드 데이터를 페칭하여, 컴포넌트에 렌더링</p>
                                        </div>
                                        <div className='dev'>
                                            <h3>Dev.</h3>
                                            <p>2인개발 / 프론트엔드 100% <br />
                                                작업기간 : 4~5주</p>
                                        </div>
                                    </div>
                                    <a href="https://kboproject2.netlify.app/" target='_blank' rel="noreferrer">
                                        <div className='viewWrap'>
                                            <button className='view'>View</button>
                                            <button className='viewArrow'><FontAwesomeIcon icon={faArrowRight} /></button>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* //////////////////// KBO Project //////////////////// */}

                        {/* //////////////////// PortFolio Ver.1 //////////////////// */}
                        <div className='projectBox'>
                            <div className='projectImg'>
                                <img src="/portfolioVer_1.webp" alt="portfolioVer_1" />
                                <div className='toolWrap'>
                                    <div><img src="/html.svg" alt="htmlImg" /></div>
                                    <div><img src="/css.svg" alt="cssImg" /></div>
                                    <div><img src="react.svg" alt="reactImg" /></div>
                                    <div><img src="framerMotion.svg" alt="framerMotionImg" /></div>
                                    <div><img src="redux.svg" alt="reduxImg" /></div>
                                    <div><img src="github.svg" alt="gitHubImg" /></div>
                                    <div><img src="netlify.svg" alt="netlifyImg" /></div>
                                    <div><img src="figma.svg" alt="figmaImg" /></div>
                                </div>
                            </div>
                            <div className='projectInfo'>
                                <div className='projectInfo_name'>
                                    <h2>PortFolio Ver.1</h2>
                                </div>
                                <div className='projectInfo_text'>
                                    <div className='IPDWrap'>
                                        <div className='introduce'>
                                            <h3>Introduce.</h3>
                                            <p>처음 제작한 개인 포트폴리오 사이트</p>
                                        </div>
                                        <div className='point'>
                                            <h3>Point.</h3>
                                            <p>OTT 플랫폼 디자인 <br />
                                                자연스러운 화면전환</p>
                                        </div>
                                        <div className='dev'>
                                            <h3>Dev.</h3>
                                            <p>1인개발 / 프론트엔드 100% <br />
                                                작업기간 : 4주</p>
                                        </div>
                                    </div>
                                    <a href="https://sangmin-mainsite.netlify.app/" target='_blank' rel="noreferrer">
                                        <div className='viewWrap'>
                                            <button className='view'>View</button>
                                            <button className='viewArrow'><FontAwesomeIcon icon={faArrowRight} /></button>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* //////////////////// PortFolio Ver.1 //////////////////// */}


                        {/* //////////////////// Weather Project //////////////////// */}
                        <div className='projectBox'>
                            <div className='projectImg'>
                                <img src="/weatherProjectImg.webp" alt="weatherProjectImg" />
                                <div className='toolWrap'>
                                    <div><img src="/html.svg" alt="htmlImg" /></div>
                                    <div><img src="/css.svg" alt="cssImg" /></div>
                                    <div><img src="react.svg" alt="reactImg" /></div>
                                    <div><img src="redux.svg" alt="reduxImg" /></div>
                                    <div><img src="github.svg" alt="gitHubImg" /></div>
                                    <div><img src="netlify.svg" alt="netlifyImg" /></div>
                                    <div><img src="figma.svg" alt="figmaImg" /></div>
                                </div>
                            </div>
                            <div className='projectInfo'>
                                <div className='projectInfo_name'>
                                    <h2>Weather Project</h2>
                                </div>
                                <div className='projectInfo_text'>
                                    <div className='IPDWrap'>
                                        <div className='introduce'>
                                            <h3>Introduce.</h3>
                                            <p>현재위치 및 검색한 도시의 날씨와 뉴스를 알려주는 사이트</p>
                                        </div>
                                        <div className='point'>
                                            <h3>Point.</h3>
                                            <p>여러개의 API를 호출 및 관리</p>
                                        </div>
                                        <div className='dev'>
                                            <h3>Dev.</h3>
                                            <p>1인개발 / 프론트엔드 100% <br />
                                                작업기간 : 3주</p>
                                        </div>
                                    </div>
                                    <a href="https://sangmin-weatherproject.netlify.app" target='_blank' rel="noreferrer">
                                        <div className='viewWrap'>
                                            <button className='view'>View</button>
                                            <button className='viewArrow'><FontAwesomeIcon icon={faArrowRight} /></button>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* //////////////////// Weather Project //////////////////// */}

                        {/* //////////////////// Clone Coding //////////////////// */}
                        <div className='projectBox'>
                            <div className='projectImg'>
                                <img src="cloneCodingImg.webp" alt="cloneCodingImg" />
                                <div className='toolWrap'>
                                    <div><img src="/html.svg" alt="htmlImg" /></div>
                                    <div><img src="/css.svg" alt="cssImg" /></div>
                                    <div><img src="js.svg" alt="jsImg" /></div>
                                </div>
                            </div>
                            <div className='projectInfo'>
                                <div className='projectInfo_name'>
                                    <h2>Clone Coding</h2>
                                </div>
                                <div className='projectInfo_text'>
                                    <div className='IPDWrap'>
                                        <div className='introduce'>
                                            <h3>Introduce.</h3>
                                            <p>미모던 피부과 사이트를 클론코딩한 사이트</p>
                                        </div>
                                        <div className='point'>
                                            <h3>Point.</h3>
                                            <p>Swiper의 사용 <br />
                                                바닐라 자바스크립트</p>
                                        </div>
                                        <div className='dev'>
                                            <h3>Dev.</h3>
                                            <p>1인개발 / 프론트엔드 100% <br />
                                                작업기간 : 2주</p>
                                        </div>
                                    </div>
                                    <a href="https://clone-mimodern.netlify.app" target='_blank' rel="noreferrer">
                                        <div className='viewWrap'>
                                            <button className='view'>View</button>
                                            <button className='viewArrow'><FontAwesomeIcon icon={faArrowRight} /></button>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* //////////////////// Clone Cording //////////////////// */}

                </section>
                {/* //////////////////////////////////////// section02 (Works) //////////////////////////////////////// */}



                {/* //////////////////////////////////////// section03 (About) //////////////////////////////////////// */}
                <section id='section03'>
                    <div className='textBox'>
                        <h3><span className='circle'></span> About</h3>
                        <p>배움에 열정을 더해, 하루하루 성장하고있습니다 <br />
                            프론트엔드 개발자를 향한 여정은 계속 진행 중이며 <br />
                            매일 한 걸음씩, 더 나은 코드를 향해 <br />
                            꾸준히 나아갑니다.</p>
                    </div>
                    <div className='gsapBoxWrap'>
                        <div className='about_innerBox boxA'>
                            <p className='couterNum'>01</p>
                            <div className='object' ref={objectRef01}>
                                <div><span></span></div>
                                <div><span></span></div>
                                <div><span></span></div>
                                <div><span></span></div>
                                <div><span></span></div>
                                <div><span></span></div>
                            </div>
                            <p className='explanation'>Motion Develop</p>
                        </div>
                        <div className='about_innerBox boxB'>
                            <p className='couterNum'>02</p>
                            <div className='object' ref={objectRef02}>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                            <p className='explanation'>Motion Develop</p>
                        </div>
                        <div className='about_innerBox boxC'>
                            <p className='couterNum'>03</p>
                            <div className='object' ref={objectRef03}>
                                <div></div>
                            </div>
                            <p className='explanation'>Motion Develop</p>
                        </div>
                    </div>
                </section>
                {/* //////////////////////////////////////// section03 (About) //////////////////////////////////////// */}
            </main>



            {/* //////////////////////////////////////// footer //////////////////////////////////////// */}
            <Footer />
            {/* //////////////////////////////////////// footer //////////////////////////////////////// */}
        </div>
    )
}

export default Main;
