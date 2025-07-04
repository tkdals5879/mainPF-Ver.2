import React, { useEffect, useState } from "react";
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

import '../css/works/works.css'

function Works() {

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


    gsap.registerPlugin(ScrollTrigger);

    // 이미지 프리로드 처리
    const [imagesLoaded, setImagesLoaded] = useState(false);
    useEffect(() => {
        const imageSources = [
            "portfolioVer_2.webp",
            "kboProjectImg.webp",
            "portfolioVer_1.webp",
            "weatherProjectImg.webp",
            "cloneCodingImg.webp"
        ];

        let loadedCount = 0;

        imageSources.forEach(src => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                loadedCount += 1;
                if (loadedCount === imageSources.length) {
                    setImagesLoaded(true);
                }
            };
            img.onerror = () => {
                loadedCount += 1;
                if (loadedCount === imageSources.length) {
                    setImagesLoaded(true);
                }
            };
        });
    }, []);

    useEffect(() => {
        if (!imagesLoaded) return;

        gsap.utils.toArray(".worksNumber").forEach(num => {
            const isLTR = num.classList.contains("LTR");

            gsap.to(num, {
                xPercent: isLTR ? 10 : -20,
                ease: "none",
                scrollTrigger: {
                    trigger: num,
                    start: "top center",
                    scrub: 1,
                }
            });
        });

        gsap.utils.toArray(".description").forEach(desc => {
            const isLTR = desc.classList.contains("LTR");
            gsap.set(desc, { autoAlpha: 0 });
            gsap.to(desc, {
                x: isLTR ? 20 : -50,
                autoAlpha: 1,
                overwrite: "auto",
                duration: 2,
                ease: "expo",
                scrollTrigger: {
                    trigger: desc,
                    start: "top 85%",
                    end: "bottom top",
                }
            });
        });

        gsap.utils.toArray(".notice").forEach(char => {
            const isLTR = char.classList.contains("LTR");
            gsap.set(char, { autoAlpha: 0, x: isLTR ? -50 : 50 })
            gsap.to(char, {
                autoAlpha: 1,
                x: 0,
                duration: 2,
                ease: "expo",
                scrollTrigger: {
                    trigger: char,
                    start: "top 85%",
                    end: "bottom top"
                }
            });
        })



        ScrollTrigger.refresh();

    }, [imagesLoaded]);

    return (
        <div className="worksWrap">
            <main>
                <h2 className="mainText">Works</h2>
                <section id="Works_section01" className="worksContainer">
                    <span className="worksNumber">01</span>
                    <h2 className="worksTitle">Portfolio Ver.2</h2>
                    <a href="https://ver2-portfolio.netlify.app/" target="_blank" rel="noreferrer">
                        <figure>
                            <img src="portfolioVer_2.webp" alt="portfolioVer_2" />
                        </figure>
                    </a>
                    <p className="description">디자인을 디벨롭한 두번째 포트폴리오 사이트</p>
                </section>

                <section id="Works_section02" className="worksContainer">
                    <span className="worksNumber LTR">02</span>
                    <h2 className="worksTitle">KBO Project</h2>
                    <a href="https://kboproject.netlify.app/" target='_blank' rel="noreferrer">
                        <figure>
                            <img src="/kboProjectImg.webp" alt="kboProjectImg" />
                        </figure>
                    </a>
                    <p className="description LTR">국내 프로야구 리그 (KBO)에 관련된 정보를 제공하는 사이트</p>
                </section>

                <section id="Works_section03" className="worksContainer">
                    <span className="worksNumber">03</span>
                    <h2 className="worksTitle">Portfolio Ver.1</h2>
                    <a href="https://sangmin-mainsite.netlify.app/" target='_blank' rel="noreferrer">
                        <figure>
                            <img src="/portfolioVer_1.webp" alt="portfolioVer_1" />
                        </figure>
                    </a>
                    <p className="description">처음 제작한 개인 포트폴리오 사이트</p>
                </section>

                <section id="Works_section04" className="worksContainer">
                    <span className="worksNumber LTR">04</span>
                    <h2 className="worksTitle">Weather Project</h2>
                    <a href="https://sangmin-weatherproject.netlify.app" target='_blank' rel="noreferrer">
                        <figure>
                            <img src="weatherProjectImg.webp" alt="weatherProjectImg" />
                        </figure>
                    </a>
                    <p className="description LTR">현재위치 및 검색한 도시의 날씨와 뉴스를 알려주는 사이트</p>
                </section>

                <section id="Works_section05" className="worksContainer">
                    <span className="worksNumber">05</span>
                    <h2 className="worksTitle">Clone Coding</h2>
                    <a href="https://clone-mimodern.netlify.app" target='_blank' rel="noreferrer">
                        <figure>
                            <img src="cloneCodingImg.webp" alt="cloneCodingImg" />
                        </figure>
                    </a>
                    <p className="description">미모던 피부과 사이트를 클론코딩한 사이트</p>
                </section>
            </main>
        </div>
    )
}

export default Works;
