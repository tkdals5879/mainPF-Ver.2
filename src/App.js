import React from "react";
import { BrowserRouter } from 'react-router-dom'
import Gnb from "./Gnb";
import AnimatedRoutes from "./AnimatedRoutes";


function App() {

  return (
    <BrowserRouter>

      <Gnb />
      <AnimatedRoutes />

    </BrowserRouter>
  );
}

export default App;
