import './App.css';
import Name from './components/Name';
import React, { useState } from "react";
import PropDrilling from './components/PropDrilling';
import Counter from './components/Counter';
import Show from './components/Show';
import Context from "./components/Context";

function App() {
  const [show, setShow] = useState(true)

  const toggleShow = () => setShow(prevShow => !prevShow)

  return (
    <>
      <Context />
      <Show 
        show={show}
        toggleShow={toggleShow} />
      <PropDrilling />
      <Counter />
      <Name title="Liisi" />
      <Name />
    </>
  );
}

export default App;
