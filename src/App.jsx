import React, { useEffect, useState } from "react";

const App = () => {
  const [value, setValue] = useState([]); // Array of numbers
  const [frozen, setFrozen] = useState([]); // Array of booleans to track frozen state

  // Function to generate random values and update the state
  const genNewRandomVal = () => {
    const newValues = value.map((val, ind) => {
      return frozen[ind] ? val : Math.floor(Math.random() * 10);
    });
    setValue(newValues);
  };

  // Function to toggle freeze state of a number
  const toggleFreeze = (index) => {
    setFrozen((prevFrozen) => {
      const newFrozen = [...prevFrozen];
      newFrozen[index] = !newFrozen[index];
      return newFrozen;
    });
  };

  // Function to check if all frozen numbers are the same
  const checkWin = () => {
    if (
      frozen.every((isFrozen) => isFrozen) &&
      frozen.length === value.length
    ) {
      const firstFrozenValue = value[0];
      if (value.every((val) => val === firstFrozenValue)) {
        alert("You Win!");
      }
    }
  };

  useEffect(() => {
    const initialValues = Array.from({ length: 10 }, () =>
      Math.floor(Math.random() * 10)
    );
    setValue(initialValues);
    setFrozen(Array(10).fill(false));
  }, []);

  useEffect(() => {
    if (frozen.some((isFrozen) => isFrozen)) {
      checkWin();
    }
  }, [frozen, value]);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-purple-800 to-black">
      <div
        className="text-white px-6 py-8 rounded-xl shadow-xl backdrop-blur-md bg-white/10 border border-white/20 
        max-w-md w-11/12 md:w-3/4"
      >
        <h1 className="text-4xl text-center font-extrabold mb-6 tracking-wide">
          🎲 Tenzi Game
        </h1>
        <div className="grid grid-cols-5 gap-4 my-6">
          {value.map((val, ind) => (
            <div
              key={ind}
              onClick={() => toggleFreeze(ind)}
              className={`w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-lg cursor-pointer shadow-md text-2xl md:text-3xl font-bold transition-transform transform hover:scale-110 ${
                frozen[ind]
                  ? "bg-red-500 text-white shadow-red-500/50"
                  : "bg-white/20 text-gray-200 shadow-white/10"
              }`}
            >
              {val}
            </div>
          ))}
        </div>
        <button
          onClick={genNewRandomVal}
          className="w-full px-4 py-3 mt-4 text-lg font-semibold text-purple-900 bg-white rounded-full shadow-lg transition-all transform hover:scale-105 hover:bg-purple-200"
        >
          Roll Dice
        </button>
      </div>
    </div>
  );
};

export default App;
