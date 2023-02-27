import React, { useState, useEffect } from "react";
import StartPage from "./StartPage";
import Quiz from "./Quiz";
import "./sass/main.css";
import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  const [difficulty, setDifficulty] = useState(
    localStorage.getItem("quizDifficulty") || "easy"
  );
  const [showQuiz, setShowQuiz] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/quiz") {
      setShowQuiz(true);
    } else {
      setShowQuiz(false);
    }
  }, [location]);

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
        {showQuiz && (
          <Route path="/quiz" element={<Quiz difficulty={difficulty} />} />
        )}
      </Routes>
    </>
  );
}

export default App;
