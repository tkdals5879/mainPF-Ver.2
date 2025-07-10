import { useEffect, useState, useRef } from 'react'
import Footer from '../component/Footer'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

import '../css/main/main.css'

function Main({ showIntro }) {

    // lenis의 관성 제거로직
    useEffect(() => {
        requestAnimationFrame(() => {
            const lenis = window.__lenis;
            if (lenis) {
                lenis.scrollTo(0, { immediate: true });
                lenis.stop();
                setTimeout(() => lenis.start(), 50);
            }
        });
    }, []);

    const [show, setShow] = useState(false);

    useEffect(() => {
        const delay = setTimeout(() => {
            setShow(true)
            console.log(show)
        }, 200)
        return () => clearTimeout(delay)
    }, [show]);

    const topText = "WEB PUBLISHER".split("")
    const bottomText = "SANG MIN".split("")

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

    // section01 메인텍스트 > 랜덤으로 드롭다운되는 효과 ▼
    useEffect(() => {
        const video = document.querySelector("video");
        video?.play();

        gsap.set(".reveal", { opacity: 0, y: -30 })
        const textAni = gsap.timeline();
        textAni.to(".reveal", {
            opacity: 1,
            y: 0,
            delay: showIntro ? 4.2 : 0,
            ease: "sine.out",
            stagger: {
                amount: 0.8,
                from: "random"
            },
        });
    }, [showIntro])

    // 스크롤에따른 자기소개글씨 채워지기
    useEffect(() => {

        const textAni = gsap.to(".fillText", {
            backgroundPosition: 0,
            ease: "none",
            scrollTrigger: {
                trigger: ".fillText",
                start: "top 80%",
                end: "bottom 40%",
                scrub: 1,
                invalidateOnRefresh: true,
            }
        })

        const accentAni = gsap.to(".accent", {
            backgroundPosition: 0,
            ease: "none",
            scrollTrigger: {
                trigger: ".accent",
                start: "top 90%",
                end: "bottom 60%",
                scrub: 1,
            }
        });

        return () => {
            textAni.kill();
            accentAni.kill();
        }
    }, [])



    // section04 box timeline gsap ▼
    useEffect(() => {
        const ctx = gsap.context(() => {
            const ani1 = gsap.timeline();
            ani1.from('#main_section04 .gsapBoxWrap .boxA', { y: -50, autoAlpha: 0 })
                .from('#main_section04 .gsapBoxWrap .boxB', { y: 50, autoAlpha: 0 })
                .from('#main_section04 .gsapBoxWrap .boxC', { y: -50, autoAlpha: 0 })
                .to({}, { duration: 0.3 });

            ScrollTrigger.create({
                trigger: '#main_section04',
                start: "top top",
                end: "+=5000",
                scrub: 1,
                pin: true,
                animation: ani1
            });

            ScrollTrigger.refresh();
        });

        return () => ctx.revert();
    }, []);

    

    // object gsap ▼

    const objectRef01 = useRef(null);
    const objectRef02 = useRef(null);
    const objectRef03 = useRef(null);

    // boxA animation ▼
    useEffect(() => {
        const ctx = gsap.context(() => {
            const boxes = objectRef01.current.querySelectorAll("div");
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

            boxes.forEach((box, idx) => {
                tl.to(box, {
                    rotate: 360,
                    duration: 1,
                    ease: "power1.inOut",
                }, idx * 0.13);
            });
        }, objectRef01);

        return () => ctx.revert();
    }, []);


    // boxB animation ▼
    useEffect(() => {
        const ctx = gsap.context(() => {
            const boxes = objectRef02.current.querySelectorAll("div");
            const tl = gsap.timeline({ repeat: -1 });

            boxes.forEach((box, idx) => {
                tl.to(box, {
                    width: "60%",
                    height: "60%",
                    duration: 1,
                    ease: "power1.inOut",
                }, idx * 0.2);
            });
        }, objectRef02);

        return () => ctx.revert();
    }, []);



    // boxC animation ▼
    useEffect(() => {
        const ctx = gsap.context(() => {
            const box = objectRef03.current.querySelector("div");
            const tl = gsap.timeline({ repeat: -1 });

            tl.to(box, { height: "16%" })
                .to(box, { borderRadius: 100 })
                .to(box, { width: "14%" })
                .to(box, { height: "60%" })
                .to(box, { borderRadius: 0 })
                .to(box, { rotate: 180 })
                .to(box, { width: "60%" });
        }, objectRef03);

        return () => ctx.revert();
    }, []);


    ////////////////////////////////////// gsap








    return (
        <div className='mainWrap'>

            <main>
                {/* //////////////////////////////////////// section01 ( main ) //////////////////////////////////////// */}
                <section id='main_section01'>

                    <div className='bgVideo'>
                        <video src="/mainBg.mp4" autoPlay loop muted playsInline preload="auto"></video>
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



                {/* //////////////////////////////////////// section02 ( about ) //////////////////////////////////////// */}
                <section id='main_section02'>
                    <h2 className='title'><span className="circle"></span>Profile</h2>
                    <div className="top">
                        <figure>
                            <img src="./photo.webp" alt="IDphoto" />
                        </figure>
                        <div className="textBox">
                            <h2 className='fillText'>안녕하십니까! </h2>
                            <h2 className='fillText'>능동적으로 성장하고 적극적으로 도전하는</h2>
                            <h2 className='fillText'> 신입 웹 퍼블리셔 <span className='accent'>이상민</span> 입니다.</h2>
                            <p>1999.08.03</p>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="education">
                            <h3>Education</h3>
                            <div className='education_item'>
                                <p>2024.02 계명대학교 도시계획학과 졸업</p>
                                <p>2025.03 (산대특) AI&React 활용 스마트시티웨더 구축 리퍼블셔 양성과정 수료 </p>
                            </div>
                        </div>
                        <div className="toolWrap">
                            <h3>Can Use</h3>
                            <div className='list'>
                                <div><img src="./html.svg" alt="html" /></div>
                                <div><img src="./css.svg" alt="css" /></div>
                                <div><img src="./js.svg" alt="js" /></div>
                                <div><img src="./react.svg" alt="react" /></div>
                                <div><img src="./redux.svg" alt="redux" /></div>
                                <div><img src="./sass.svg" alt="sass" /></div>
                                <div><img src="./figma.svg" alt="figma" /></div>
                                <div><img src="./github.svg" alt="github" /></div>
                                <div><img src="./netlify.svg" alt="netlify" /></div>
                                <div><img src="./photoshop.svg" alt="photoshop" /></div>
                                <div><img src="./illustrator.svg" alt="illustrator" /></div>
                            </div>
                        </div>
                    </div>
                </section >
                {/* //////////////////////////////////////// section02 ( about ) //////////////////////////////////////// */}



                {/* //////////////////////////////////////// section03 (Works) //////////////////////////////////////// */}
                <section id='main_section03'>
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
                                    <a href="https://kboproject.netlify.app/" target='_blank' rel="noreferrer">
                                        <div className='viewWrap'>
                                            <button className='view'>View</button>
                                            <button className='viewArrow'><FontAwesomeIcon icon={faArrowRight} /></button>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* //////////////////// KBO Project //////////////////// */}


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
                {/* //////////////////////////////////////// section03 (Works) //////////////////////////////////////// */}



                {/* //////////////////////////////////////// section04 //////////////////////////////////////// */}
                <section id='main_section04'>
                    <div className='textBox'>
                        <p>배움에 열정을 더해, 하루하루 성장하고있습니다 <br />
                            능동적이며 적극적으로 <br />
                            매일 한 걸음씩, 더 나은 코드를 향해 <br />
                            꾸준히 공부합니다.</p>
                    </div>
                    <div className='gsapBoxWrap'>
                        <div className='about_innerBox boxA'>
                            <p className='counterNum'>01</p>
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
                            <p className='counterNum'>02</p>
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
                            <p className='counterNum'>03</p>
                            <div className='object' ref={objectRef03}>
                                <div></div>
                            </div>
                            <p className='explanation'>Motion Develop</p>
                        </div>
                    </div>
                </section>
                {/* //////////////////////////////////////// section04 //////////////////////////////////////// */}
            </main >



            {/* //////////////////////////////////////// footer //////////////////////////////////////// */}
            < Footer />
            {/* //////////////////////////////////////// footer //////////////////////////////////////// */}
        </div >
    )
}

export default Main;

//  <section id='section02'>
//                     <div className='text'>
//                         <span className='circle'></span>
//                         <h2>Profile</h2>
//                     </div>
//                     <div className='profileWrap'>
//                         <div className='img'>
//                             <figure>
//                                 <img src="./photo.webp" alt="myPhoto" />
//                             </figure>
//                         </div>
//                         <div className='infoWrap'>

//                             <div className="top">
//                                 <h2>안녕하십니까! <br/> 능동적으로 성장하고 적극적으로 도전하는 <br />
//                                     신입 웹 퍼블리셔 <span className='accent'>이상민</span> 입니다.</h2>
//                             </div>

//                             <div className='bottom'>

//                                 <div className="education">
//                                     <h3>Education</h3>
//                                     <div className='list'>
//                                         <p>2024.02 계명대학교 도시계획학과 졸업</p>
//                                         <p>2025.03 (산대특) AI&React 활용 스마트시티웨더 구축 리퍼블셔 양성과정 수료</p>
//                                     </div>
//                                 </div>
//                                 <div className="toolWrap">
//                                     <h3>Can Use</h3>
//                                     <div className='list'>
//                                         <div><img src="./html.svg" alt="html" /></div>
//                                         <div><img src="./css.svg" alt="css" /></div>
//                                         <div><img src="./js.svg" alt="js" /></div>
//                                         <div><img src="./react.svg" alt="react" /></div>
//                                         <div><img src="./redux.svg" alt="redux" /></div>
//                                         <div><img src="./sass.svg" alt="sass" /></div>
//                                         <div><img src="./figma.svg" alt="figma" /></div>
//                                         <div><img src="./github.svg" alt="github" /></div>
//                                         <div><img src="./netlify.svg" alt="netlify" /></div>
//                                         <div><img src="./photoshop.svg" alt="photoshop" /></div>
//                                         <div><img src="./illustrator.svg" alt="illustrator" /></div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>