import React, { useState } from "react";

const Counter = () => {
  const [counter, setCounter] = useState(0)
  // const [counter, setCounter] = React.useState(0);

  const modifyCounter = (amount) => setCounter((prevCounter) => prevCounter + amount);

  const buttonValues = [
    { label: "+1", value: 1 },
    { label: "+5", value: 5 },
    { label: "+50", value: 50 },
    { label: "-1", value: -1 },
    { label: "-5", value: -5 },
    { label: "-50", value: -50 }
  ];

  return (
    <>
      <h1>{counter}</h1>

      {buttonValues.map(({ label, value }) => (
        <button key={label} onClick={() => modifyCounter(value)}>
          sync {label}
        </button>
      ))}

      <button onClick={() => setTimeout(() => modifyCounter(1), 1000)}>
        async +1
      </button>
    </>
  )
}

export default Counter
