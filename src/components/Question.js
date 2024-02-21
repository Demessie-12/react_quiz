import React from "react";

function Question({ question, dispatch, answer }) {
  console.log(question);
  const hasAnswered = answer !== null;
  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option, index) => (
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              hasAnswered
                ? index === question.correctOption
                  ? "correct"
                  : index === answer
                  ? "false"
                  : ""
                : ""
            }`}
            key={option}
            disabled={answer !== null}
            onClick={() => dispatch({ type: "check_answer", payload: index })}
          >
            {option}{" "}
            <span
              className={
                hasAnswered
                  ? index === answer
                    ? index === question.correctOption
                      ? "rightIcon"
                      : "hiddenIcon"
                    : "hiddenIcon"
                  : "hiddenIcon"
              }
            >
              ✅
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
