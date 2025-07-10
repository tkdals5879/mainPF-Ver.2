import { useEffect, useRef, useState } from "react";
import { BrowserRouter } from 'react-router-dom'
import Lenis from "@studio-freight/lenis";
import Gnb from "./Gnb";
import AnimatedRoutes from "./AnimatedRoutes";
import Intro from "./component/Intro";

function App() {

  const [showIntro, setShowIntro] = useState(true)
  const lenisRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -8 * t)),
      smooth: true,
    });

    lenisRef.current = lenis;

    const raf = (time) => {
      if (!showIntro) {
        lenis.raf(time);
      }
      animationFrameRef.current = requestAnimationFrame(raf);
    };

    animationFrameRef.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      lenis.destroy();
    };
  }, [showIntro]);

  useEffect(() => {
    const lenis = window.__lenis;
    if (!lenis) return;

    if (showIntro) {
      lenis.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis.start();
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    }
  }, [showIntro])

  return (
    <>
      <BrowserRouter>

        <Gnb />
        <AnimatedRoutes showIntro={showIntro} />

      </BrowserRouter >
      {showIntro && <Intro onCompleted={() => setShowIntro(false)} />}
    </>
  );
}

export default App;
