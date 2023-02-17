import React, { useState } from "react";
import StartPage from "./StartPage";
import Quiz from "./Quiz";
import "./sass/main.css";
import { Routes, Route } from "react-router-dom";

function App() {
  const [difficulty, setDifficulty] = useState("easy");

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <StartPage
              onDifficultyChange={handleDifficultyChange}
              difficulty={difficulty}
            />
          }
        />
        <Route path="/quiz" element={<Quiz difficulty={difficulty} />} />
      </Routes>
    </>
  );
}

export default App;
