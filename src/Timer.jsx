import React from "react";
import { useState, useEffect } from "react";

function Timer({ duration, onTimeOut, onQuizComplete }) {
  const [remaining, setRemaining] = useState(duration / 1000);
  const [isRunning, setIsRunning] = useState(true);

  const handleOutOfTime = () => {
    setRemaining(0);
    setIsRunning(false);
    onTimeOut(false);
  };

  useEffect(() => {
    if (remaining === 0) {
      setIsRunning(false);
      handleOutOfTime();
    }
  }, [remaining, onTimeOut]);

  useEffect(() => {
    if (!isRunning) {
      // Remove the "selected" class from all elements that have it
      const selectedElements = document.querySelectorAll(".selected");
      selectedElements.forEach((element) => {
        element.classList.remove("selected");
      });
    }
  }, [isRunning]);

  useEffect(() => {
    if (onQuizComplete) {
      setIsRunning(false);
    } else {
      setIsRunning(true);
    }
  }, [onQuizComplete]);

  useEffect(() => {
    if (isRunning) {
      const timerId = setInterval(() => {
        setRemaining((prevRemaining) => prevRemaining - 1);
      }, 1000);

      return () => {
        clearInterval(timerId);
      };
    }
  }, [isRunning]);

  return (
    <>
      {remaining === 0 || !isRunning ? (
        <p>Done!</p>
      ) : (
        <p>{remaining} seconds remaining</p>
      )}
    </>
  );
}

export default Timer;
