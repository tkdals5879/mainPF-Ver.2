import { useEffect, useRef, useState } from 'react'
import Footer from '../component/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all'



import '../css/about/about.css'

function About() {

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


    // about_section01 > 이미지 이질감효과
    useEffect(() => {

        const rightMotion = gsap.context(() => {

            gsap.to(".sectionRight figure img", {
                yPercent: 20,
                ease: "none",
                scrollTrigger: {
                    trigger: ".sectionRight",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                    invalidateOnRefresh: true,
                }
            });
        })

        return () => {
            rightMotion.revert();
        };
    }, []);

    const aboutRef = useRef(null);
    const section03 = useRef(null);
    const section03_contentsWrap = useRef(null);
    const section04 = useRef(null);


    // section03 진입 하며 배경색 전환
    useEffect(() => {
        const ctx = gsap.context(() => {

            const isMobile = window.matchMedia("(max-width:1024px)").matches;

            if (isMobile) {
                gsap.to(aboutRef.current, {
                    backgroundColor: "#111",
                    scrollTrigger: {
                        trigger: section03.current,
                        start: "top top",
                        end: "10% top",
                        scrub: 1,
                    }
                });
            } else {
                gsap.to(aboutRef.current, {
                    backgroundColor: "#111",
                    scrollTrigger: {
                        trigger: section03.current,
                        start: "top 30%",
                        end: "top top",
                        scrub: 1,
                    }
                });
            }
        });

        return () => {
            ctx.revert();
        }
    }, [])


    // Q&A 나타나는 인터랙션
    useEffect(() => {

        const ctx = gsap.context(() => {

            const isMobile = window.matchMedia("(max-width:1024px)").matches;

            if (isMobile) {
                gsap.set(".wrapA , .wrapB , .wrapC", { y: 50 })
                const tl = gsap.timeline();
                tl.to(".wrapA", { y: 0, opacity: 1, rotate: 2, duration: 0.3 })
                    .to({}, { duration: 0.2 })
                    .to(".wrapB", { y: 10, opacity: 1, rotate: -3, duration: 0.3 })
                    .to({}, { duration: 0.2 })
                    .to(".wrapC", { y: 20, opacity: 1, rotate: 0, duration: 0.3 })
                    .to({}, { duration: 0.2 })
                    .to(".wrapA", { y:-100 ,autoAlpha: 0, duration:0.1 })
                    .to(".wrapB", { y:-100 ,autoAlpha: 0, duration:0.1 }, "<")
                    .to(".wrapC", { y:-100 ,autoAlpha: 0, duration:0.1 }, "<")
                ScrollTrigger.create({
                    trigger: section03.current,
                    start: "30% 45%",
                    end: "+=2000",
                    pin: true,
                    // pinSpacing:false,
                    scrub: 1,
                    animation: tl,
                });
            } else {

                gsap.set(".wrapA , .wrapB , .wrapC", { y: 100 })
                const tl = gsap.timeline();
                tl.to(".wrapA", { y: 0, opacity: 1, rotate: 2, duration: 0.4 })
                    .to({}, { duration: 0.2 })
                    .to(".wrapB", { y: 10, opacity: 1, rotate: -3, duration: 0.4 })
                    .to({}, { duration: 0.2 })
                    .to(".wrapC", { y: 20, opacity: 1, rotate: 0, duration: 0.4 })
                    .to({}, { duration: 0.2 })
                    .to(".wrapA", { x: 250, y: -320, autoAlpha: 0, duration: 0.15 })
                    .to(".wrapB", { x: 0, y: -400, autoAlpha: 0, duration: 0.15 }, "<")
                    .to(".wrapC", { x: -350, y: -290, autoAlpha: 0, duration: 0.15 }, "<")
                ScrollTrigger.create({
                    trigger: section03.current,
                    start: "20% center",
                    end: "+=2500",
                    pin: true,
                    // pinSpacing:false,
                    scrub: 1,
                    animation: tl,
                });
            }

            ScrollTrigger.refresh();

        });

        return () => {
            ctx.revert();
        }
    }, [])

    // section04 이미지 인터랙션
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray(".myPicture").forEach((el) => {
                gsap.to(el, {
                    yPercent: -30,
                    autoAlpha: 0,
                    scrollTrigger: {
                        trigger: el,
                        start: "top 10%",
                        end: "top top",
                        scrub: 1,
                    }
                })
            });
        });

        return () => {
            ctx.revert();
        }
    }, [])
    // gsap







    return (
        <div className='aboutWrap' ref={aboutRef}>
            <main>
                <section id="about_section01">
                    <div className='sectionLeft'>
                        <div className='textWrap'>
                            <h2>ABOUT</h2>
                            <div className="pWrap">
                                <p>저는 도시계획을 전공한 뒤,</p>
                                <p>웹 퍼블리싱에 매력을 느껴 새로운 도전을 시작한 이상민입니다.</p>
                                <p>사용자의 니즈를 고려해 도시라는 공간을 설계하던 경험이,</p>
                                <p>웹이라는 디지털 공간을 사용자 중심으로 구축하는일과 자연스럽게 연결되었습니다.</p>
                                <p>그렇게 저는, 사람과 공간을 잇는 또 다른 방식으로서</p>
                                <p>웹 퍼블리셔의 길을 걷고있습니다.</p>
                            </div>
                        </div>
                    </div>
                    <div className='sectionRight'>
                        <figure>
                            <img src="./urban.webp" alt="urban" />
                        </figure>
                    </div>
                </section>

                <section id="about_section02">
                    <div className="left">
                        <figure>
                            <img src="./myPhoto.webp" alt="myPhoto" />
                        </figure>
                    </div>
                    <div className="right">
                        <div className="about_S02_item">
                            <h3 className="about_S02_item_title">Info</h3>
                            <ul className="about_S02_item_text">
                                <li>이상민</li>
                                <li>1999.08.03</li>
                            </ul>
                        </div>
                        <div className="about_S02_item">
                            <h3 className="about_S02_item_title">Detail</h3>
                            <p className="about_S02_item_text">
                                혼자가 아닌 함께 만드는 웹. <br />
                                저는 개발자, 디자이너와의 원활한 소통과 협업을 통해
                                더 완성도 높은 결과물을 만들어내는 것을 중요하게 생각합니다.
                                HTML, CSS, JavaScript, React 기반의 퍼블리싱 역량을 바탕으로
                                사용자 중심의 웹을 고민하고,
                                팀과 함께 다양한 실무 경험과 협업을 통해 더 나은 퍼블리셔로 나아가겠습니다.
                            </p>
                        </div>
                        <div className="about_S02_item">
                            <h3 className="about_S02_item_title">Education</h3>
                            <ul className="about_S02_item_text">
                                <li>2025.03 (산대특) AI&React 활용 스마트시티웨더 구축 리퍼블셔 양성과정 수료</li>
                                <li>2024.02 계명대학교 도시계획학과 졸업</li>
                            </ul>
                        </div>
                        <div className="about_S02_item">
                            <h3 className="about_S02_item_title">MBTI</h3>
                            <p className="about_S02_item_text">INFJ</p>
                        </div>
                        <div className="about_S02_item">
                            <h3 className="about_S02_item_title">Contact</h3>
                            <ul className="about_S02_item_text">
                                <li>도전적이고 적극적인 웹 퍼블리셔를 찾으시나요?</li>
                                <li><a href="mailto:tkdals58799@gmail.com">tkdals58799@gmail.com</a></li>
                                <li>010-5490-5699</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section id="about_section03" ref={section03}>
                    <div className="section03_contentsWrap" ref={section03_contentsWrap}>
                        <div className="questionWrap wrapA">
                            <h2 className="question_title">Q. 프론트엔드로 전향한 이유?</h2>
                            <p className="question_text">
                                도시계획학과를 전공하며, 물리적 공간에서 사용자의 경험을 극대화할 수 있는 동선 설계와 도로망 구성, <br />
                                그리고 다양한 거주민의 니즈를 반영한 시설 배치 방안에 대해 배웠습니다.<br />
                                이러한 경험은 웹 환경에서도 사용자 중심의 경험을 설계하는 프론트엔드 개발 업무와 자연스럽게 연결되었고, <br />
                                그 과정에서 웹이라는 디지털 공간을 설계하는 일에 깊은 흥미를 느꼈습니다.
                            </p>
                        </div>
                        <div className="questionWrap wrapB">
                            <h2 className="question_title">Q. 가장 중요하게 생각하는 가치관은?</h2>
                            <p className="question_text">
                                "정체는 곧 퇴보다" <br />
                                익숙함에 안주하지 않고 끊임없이 도전하는 것이 저의 가장 중요한 가치입니다. <br />
                                기술은 끊임없이 발전합니다. 그래서 저는, 멈추지 않습니다. <br />
                                열정과 꾸준함으로 성장하는 개발자가 되겠습니다.
                            </p>
                        </div>
                        <div className="questionWrap wrapC">
                            <h2 className="question_title">Q. 개인역량 강화를 어떻게하는지?</h2>
                            <p className="question_text">
                                새로운 기능을 구현하고 싶을 때는 직접 손으로 코드를 작성해보며 학습합니다. <br />
                                그 과정에서 마주하는 문제는 다양한 자료를 참고하며 끝까지 해결하려고 노력하며, 사이드 프로젝트를 통해 실전 감각과 기술 응용 능력도 함께 키우려 노력합니다.<br /><br />
                                디자인 감각은 타고나는 것이 아니라 만들어가는 것이라 생각하기에, <br />
                                다소부족한 디자인 감각을 끌어올리기위해 국내외를 막론한 다양한 웹사이트를 참고합니다. <br />
                                실제로, 인상 깊은 UI는 클론 코딩을 통해 직접 구현해보며 디자인 감각을 키워가고 있습니다.
                            </p>
                        </div>
                    </div>
                </section>

                <section id='about_section04' ref={section04}>
                    <div className="myPicture pic1">
                        <img src="./pic1.webp" alt="myPicture01" />
                        <div className="hoverdObj">
                            <p>긍정적인 성격의 소유자입니다</p>
                        </div>
                    </div>
                    <div className="myPicture pic2">
                        <img src="pic2.webp" alt="myPicture02" />
                        <div className="hoverdObj">
                            <p>무엇이든, 다양한 관점에서 바라보려고 합니다</p>
                        </div>
                    </div>
                    <div className="myPicture pic3">
                        <img src="pic3.webp" alt="myPicture03" />
                        <div className="hoverdObj">
                            <p>취미로 운동을 하고있습니다</p>
                        </div>
                    </div>
                    <div className="myPicture pic4">
                        <img src="pic4.webp" alt="myPicture04" />
                        <div className="hoverdObj">
                            <p>커뮤니케이션을 중요시합니다</p>
                        </div>
                    </div>
                    <div className="myPicture pic5">
                        <img src="pic5.webp" alt="myPicture05" />
                        <div className="hoverdObj">
                            <p>꾸준한 자기계발을 지향합니다</p>
                        </div>
                    </div>
                    <div className="myPicture pic6">
                        <img src="pic6.webp" alt="myPicture06" />
                        <div className="hoverdObj">
                            <p>호기심이 아주 많습니다</p>
                        </div>
                    </div>
                    <div className="myPicture pic7">
                        <img src="pic7.webp" alt="myPicture07" />
                        <div className="hoverdObj">
                            <p>책임감을 가지고 일합니다</p>
                        </div>
                    </div>
                    <div className="myPicture pic8">
                        <img src="pic8.webp" alt="myPicture08" />
                        <div className="hoverdObj">
                            <p>무엇을하든, 꾸준히 하는 편 입니다</p>
                        </div>
                    </div>
                    <div className="myPicture pic9">
                        <img src="pic9.webp" alt="myPicture09" />
                        <div className="hoverdObj">
                            <p>새로운것을 배운다는건 행복한 일입니다</p>
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
