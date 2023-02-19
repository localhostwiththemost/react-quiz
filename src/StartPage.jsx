import React from "react";
import { useNavigate } from "react-router-dom";

function StartPage({ onDifficultyChange, difficulty }) {
  const navigate = useNavigate();

  const handleDifficultyChange = (event) => {
    const newDifficulty = event.target.value;
    onDifficultyChange(newDifficulty);
  };

  const goToQuiz = () => {
    navigate("/quiz");
  };

  return (
    <div className="start-container">
      <div className="title-container">
        <h1>Quizzical</h1>
      </div>

      <div className="select-container">
        <label htmlFor="difficulty-select">Select Difficulty:</label>
        <select
          id="difficulty-select"
          value={difficulty}
          onChange={handleDifficultyChange}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div className="btn-container">
        <button
          className="btn-main btn-main__white btn-main__animated"
          onClick={goToQuiz}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}

export default StartPage;
