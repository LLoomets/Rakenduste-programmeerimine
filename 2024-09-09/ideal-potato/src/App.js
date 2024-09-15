import './App.css';
import Name from './components/Name';
import React, { useState } from "react";
import PropDrilling from './components/PropDrilling';
import Counter from './components/Counter';
import Show from './components/Show';
import Context from "./components/Context";
import Mina from './components/Mina';

function App() {
  const [show, setShow] = useState(true);

  const toggleShow = () => setShow(prevShow => !prevShow);

  const user = {
    name: "Hedy Lamarr",
    imageUrl : "https://i.imgur.com/yXOvdOSs.jpg",
    imageSize :90,
  };

  const products = [
    { title: 'Cabbage', isFruit: false, id: 1 },
    { title: 'Garlic', isFruit: false, id: 2 },
    { title: 'Apple', isFruit: true, id: 3 },
  ];

  const listItems = products.map(product =>
    <li
      key={product.id}
      style={{
        color: product.isFruit ? 'magenta' : 'green'
      }}
    >
      {product.title}
    </li>
  );
  
  function handleClick() {
    alert('You clicked me!');
  }

  const hobbies = ["Trenni tegemine", "Kitarri mängimine", "Muusika kuulamine"];

  return (
    <>
      <div>
        <Mina name="Liisi Loomets" hobbies={hobbies}/>
      </div>

      <Context />
      <Show 
        show={show}
        toggleShow={toggleShow} />
      <PropDrilling />
      <Counter />
      <Name title="Liisi" />
      <Name />

      <h3>{user.name}</h3>
      <img 
        className = "avatar"
        src = {user.imageUrl}
        alt = {"Photo of " + user.name}
        style = {{
          width : user.imageSize,
          height : user.imageSize,
        }}
      />

      <ul>{listItems}</ul>

      <button onClick={handleClick}>
        Click me
      </button>
    </>
  );
}

export default App;
