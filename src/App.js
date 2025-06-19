import React, { useState } from "react";
import { BrowserRouter } from 'react-router-dom'
import Gnb from "./Gnb";
import AnimatedRoutes from "./AnimatedRoutes";
import Intro from "./component/Intro";

function App() {

  const [showIntro, setShowIntro] = useState(true)

  return (
    <>
      {showIntro ? (
        <Intro onCompleted={() => setShowIntro(false)}/>
      ) :
        (
          <BrowserRouter>

            <Gnb />
            <AnimatedRoutes />

          </BrowserRouter >
        )
      }
    </>
  );
}

export default App;
