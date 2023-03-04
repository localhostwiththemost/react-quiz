import React from "react";
import { useState, useEffect } from "react";

function Answers(props) {
  const [selected, setSelected] = useState(false);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  useEffect(() => {
    const answersArr = [
      ...props.question.incorrect_answers,
      props.question.correct_answer,
    ];

    const processedAnswers = answersArr.map((answer) =>
      answer
        .replace(/&quot;/g, "'")
        .replace(/&#039;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
    );

    setShuffledAnswers(processedAnswers.sort(() => Math.random() - 0.5));
  }, [props.question]);

  const handleAnswerClick = (answer) => {
    if (props.onQuizComplete) {
      return; // don't allow selecting an answer if quiz is complete
    }

    if (selected === answer) {
      setSelected(false);
    } else {
      setSelected(answer);
    }
  };

  return (
    <div className="answer-container">
      {shuffledAnswers.map((answer, index) => (
        <div
          key={index}
          className={`answer ${selected === answer ? "selected" : ""}
          ${answer === props.question.correct_answer ? "correct" : ""}`}
          onClick={() => handleAnswerClick(answer)}
          data-question={props.question.question}
        >
          <p>{answer}</p>
        </div>
      ))}
    </div>
  );
}

export default Answers;
