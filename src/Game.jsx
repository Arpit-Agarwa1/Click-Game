import React, { useEffect, useState } from "react";
import "./Game.css";

export default function Game() {
  const [score, setScore] = useState(0);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [time, setTime] = useState(10);

  const [screen, setScreen] = useState(1);

  useEffect(() => {
    if (screen !== 2) return;
    const interval = setInterval(handelTimer, 1000);

    function handelTimer() {
      handleRandomPosition();

      setTime((prev) => {
        if (prev === 0) {
          setScreen(3);
          clearInterval(interval);
          //   alert("Game Over!");
          return 0;
        }
        return prev - 1;
      });
    }
  }, [screen]);

  function startGame() {
    setScore(0);
    setTime(10);
    setScreen(2);
    handleRandomPosition();
  }

  function handleClick() {
    setScore((prev) => prev + 1);
  }

  function handleRandomPosition() {
    const randomX = Math.floor(Math.random() * 650);
    const randomY = Math.floor(Math.random() * 450);

    setPosition({
      top: randomY,
      left: randomX,
    });
  }

  return (
    <>
      {screen === 1 && <button onClick={startGame}> Start Game</button>}

      {screen === 2 && (
        <div>
          <h2 className="score">Score: {score}</h2>
          <h1>{time}</h1>

          <div className="box">
            <div
              className="square"
              onClick={handleClick}
              style={{
                top: position.top + "px",
                left: position.left + "px",
              }}
            ></div>
          </div>
        </div>
      )}
      {screen === 3 && <h1>Game Over! Your final score is {score}</h1>}
    </>
  );
}
