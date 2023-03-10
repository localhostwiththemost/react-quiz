import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

const lsDifficulty = localStorage.getItem("quizDifficulty");
if (lsDifficulty === null || lsDifficulty === undefined) {
  localStorage.setItem("quizDifficulty", "easy");
}

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
  const [selectedDifficulty, setSelectedDifficulty] = useState(difficulty);

  useEffect(() => {
    const lsDifficulty = localStorage.getItem("quizDifficulty") || "easy";
    setSelectedDifficulty(lsDifficulty);
    onDifficultyChange(lsDifficulty);
  }, [onDifficultyChange]);

  const handleDifficultyChange = (event) => {
    const newDifficulty = event.target.value;
    setSelectedDifficulty(newDifficulty);
    onDifficultyChange(newDifficulty);
    localStorage.setItem("quizDifficulty", newDifficulty);
  };

  const navigate = useNavigate();

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
          message={
            <ul>
              <li>
                <strong>
                  {localStorage.getItem("lsScore-easy") === "5" ? "🏆 " : ""}
                  Easy:
                </strong>{" "}
                {localStorage.getItem("lsScore-easy")}
                /5
              </li>
              <li>
                <strong>
                  {localStorage.getItem("lsScore-medium") === "5" ? "🏆 " : ""}
                  Medium:
                </strong>{" "}
                {localStorage.getItem("lsScore-medium")}/5
              </li>
              <li>
                <strong>
                  {localStorage.getItem("lsScore-hard") === "5" ? "🏆 " : ""}
                  Hard:
                </strong>{" "}
                {localStorage.getItem("lsScore-hard")}/5
              </li>
            </ul>
          }
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
          <select
            className="difficulty-select"
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
