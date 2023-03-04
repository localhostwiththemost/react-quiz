import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Answers from "./Answers";
import Loader from "./Loader";
import Timer from "./Timer";
import Modal from "./Modal";
import Confetti from "react-confetti";

function Quiz({ difficulty }) {
  const [questions, setQuestions] = useState([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [perfectScore, setPerfectScore] = useState(false);

  const navigate = useNavigate();

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

    const processedQuestions = data.results.map((question) => {
      const processedQuestion = {
        ...question,
        question: question.question
          .replace(/&quot;/g, "'")
          .replace(/&#039;/g, "'")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">"),
        incorrect_answers: question.incorrect_answers.map((answer) =>
          answer
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
        ),
        correct_answer: question.correct_answer
          .replace(/&quot;/g, '"')
          .replace(/&#039;/g, "'")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&amp;/g, "&"),
      };
      return processedQuestion;
    });

    setQuestions(processedQuestions);
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const checkAnswers = () => {
    const selectedAnswers = document.querySelectorAll(".answer.selected");
    if (selectedAnswers.length < questions.length) {
      setShowModal(true);
      return;
    }
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

    if (newScore === 5) {
      setPerfectScore(true);
    }

    const currentScore = localStorage.getItem(`lsScore-${difficulty}`);
    if (newScore > currentScore || !currentScore) {
      localStorage.setItem(`lsScore-${difficulty}`, newScore);
    }
  };

  const resetQuiz = () => {
    setQuizComplete(false);
    setScore(0);
    setPerfectScore(false);
    getQuestions();
  };

  return (
    <>
      {perfectScore ? (
        <div className="confetti-container">
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            style={{ zIndex: 9999 }}
          />
        </div>
      ) : (
        ""
      )}
      <div className="quiz-container">
        <div className="icon-container">
          <ion-icon
            name="arrow-back-outline"
            className="back-icon"
            onClick={() => {
              resetQuiz();
              navigate("/");
            }}
          ></ion-icon>
        </div>
        {showModal && (
          <Modal
            message="Please choose an answer for every question"
            onClose={() => setShowModal(false)}
          />
        )}
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
            <div className="quiz">
              {questions.map((question, index) => (
                <div className="QA-container" key={index}>
                  <div className="QA">
                    <p className="question-text">{question.question}</p>
                    <Answers
                      question={question}
                      onQuizComplete={quizComplete}
                    />
                  </div>
                </div>
              ))}
              <div className="btn-container">
                {!quizComplete ? (
                  <button
                    className="btn-main btn-main__green btn-main__animated"
                    onClick={checkAnswers}
                  >
                    Check Answers
                  </button>
                ) : (
                  <div className="score-container">
                    <h2 className="score-text">
                      You scored {score}/{questions.length} correct answers
                    </h2>
                    <button
                      className="btn-main btn-main__green btn-main__animated"
                      onClick={resetQuiz}
                    >
                      Play Again
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Quiz;
