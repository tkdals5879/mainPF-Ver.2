import { useEffect, useState } from "react";
import { BrowserRouter } from 'react-router-dom'
import Gnb from "./Gnb";
import AnimatedRoutes from "./AnimatedRoutes";
import Intro from "./component/Intro";

function App() {

  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    if(showIntro){
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    }
  },[showIntro])

  return (
    <>
      <BrowserRouter>

        <Gnb />
        <AnimatedRoutes showIntro={showIntro} />

      </BrowserRouter >
      {showIntro && <Intro onCompleted={() => setShowIntro(false)}/> }
    </>
  );
}

export default App;
