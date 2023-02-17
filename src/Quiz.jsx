import React from "react";
import { useState, useEffect } from "react";
import Answers from "./Answers";
import Loader from "./Loader";
import Timer from "./Timer";

function Quiz({ difficulty }) {
  const [questions, setQuestions] = useState([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);

  const difficultyDurations = {
    easy: 60000,
    medium: 45000,
    hard: 30000,
  };
  const duration = difficultyDurations[difficulty];

  const handleOutOfTime = () => {
    setQuizComplete(true);
  };

  const getQuestions = async () => {
    setLoading(true);
    const res = await fetch(
      `https://opentdb.com/api.php?amount=5&category=18&difficulty=${difficulty}&type=multiple`
    );
    const data = await res.json();
    setLoading(false);
    setQuestions(data.results);
    console.log(data.results);
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const checkAnswers = () => {
    let newScore = 0;
    questions.forEach((question) => {
      const selectedCorrect = document.querySelector(
        `div.answer.selected.correct[data-question="${question.question}"]`
      );
      const selectedIncorrect = document.querySelector(
        `div.answer.selected[data-question="${question.question}"]`
      );
      if (selectedCorrect) {
        newScore++;
        selectedCorrect.classList.remove("selected");
        selectedCorrect.classList.add("reveal");
      } else {
        const correctAnswers = document.querySelectorAll(
          `div.answer.correct[data-question="${question.question}"]`
        );
        correctAnswers.forEach((answer) => {
          answer.classList.add("reveal");
        });
        selectedIncorrect.classList.remove("selected");
        selectedIncorrect.classList.add("incorrect");
      }
    });
    setQuizComplete(true);
    setScore(newScore);
  };

  const resetQuiz = () => {
    setQuizComplete(false);
    setScore(0);
    getQuestions();
  };

  return (
    <div className="quiz-container">
      {loading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        <>
          <div className="timer-container">
            <Timer
              duration={duration}
              onTimeOut={handleOutOfTime}
              onQuizComplete={quizComplete}
            />
          </div>
          <div>
            {questions.map((question, index) => (
              <div className="QA-container" key={index}>
                <div className="QA">
                  <h2>{question.question}</h2>
                  <Answers question={question} />
                </div>
              </div>
            ))}
            <div className="btn-container">
              {!quizComplete ? (
                <button onClick={checkAnswers}>Check Answers</button>
              ) : (
                <div className="score-container">
                  <h2>
                    You scored {score}/{questions.length} correct answers
                  </h2>
                  <button onClick={resetQuiz}>Play Again</button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Quiz;