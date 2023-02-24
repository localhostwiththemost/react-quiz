import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

const lsScoreEasy = localStorage.getItem("lsScore-easy");
if (lsScoreEasy === null || lsScoreEasy === undefined) {
  localStorage.setItem("lsScore-easy", 0);
}

const lsScoreMedium = localStorage.getItem("lsScore-medium");
if (lsScoreMedium === null || lsScoreMedium === undefined) {
  localStorage.setItem("lsScore-medium", 0);
}

const lsScoreHard = localStorage.getItem("lsScore-hard");
if (lsScoreHard === null || lsScoreHard === undefined) {
  localStorage.setItem("lsScore-hard", 0);
}

function StartPage({ onDifficultyChange, difficulty }) {
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleDifficultyChange = (event) => {
    const newDifficulty = event.target.value;
    onDifficultyChange(newDifficulty);
  };

  const goToQuiz = () => {
    navigate("/quiz");
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="start-page">
      <button
        className="highscore-btn btn-main btn-main__green btn-main__animated"
        onClick={toggleModal}
      >
        High Scores
      </button>
      {showModal ? (
        <Modal
          message={`Easy:${localStorage.getItem(
            "lsScore-easy"
          )}/5 Medium:${localStorage.getItem(
            "lsScore-medium"
          )}/5 Hard:${localStorage.getItem("lsScore-hard")}/5`}
          onClose={closeModal}
        />
      ) : (
        ""
      )}
      <div className="start-container">
        <div className="title-container">
          <h1>Quizzical</h1>
          <h2 className="quiz-description">A computer science trivia app</h2>
        </div>
        <div className="select-container">
          {/* <label htmlFor="difficulty-select" className="difficulty-label">
            Select Difficulty:
          </label> */}
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
            className="btn-main btn-main__green btn-main__animated"
            onClick={goToQuiz}
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default StartPage;
