import './App.css';
import Name from './components/Name';
import React, { useState } from "react";
import Counter from './components/Counter';
import Show from './components/Show';

function App() {
  const [show, setShow] = useState(true)

  const toggleShow = () => setShow(prevShow => !prevShow)

  return (
    <>
      <Show 
        show={show}
        toggleShow={toggleShow} />
      <Counter />
      <Name title="Liisi" />
      <Name />
    </>
  );
}

export default App;
