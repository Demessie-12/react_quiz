import React from "react";

function StartScreen({ numQuestions, questions, dispatch }) {
  function handleChange(event) {
    let { value } = event.target;
    value = Number(value);
    dispatch({ type: "changeQuestionNum", payload: value });
  }
  return (
    <div className="start">
      <img className="stjohn" src="Saint John.jpeg" alt="React logo" />
      <h2>የዩሐንስ ወንጌል ጥያቄዎች</h2>
      <div className="questionNumber">
        <h3>ስንት ጥያቄዎችን መስራት ይፈልጋሉ?</h3>
        <select
          id="questionNum"
          value={numQuestions.value}
          onChange={handleChange}
          name="questionNum"
        >
          <option value="10">10</option>
          {questions.length > 15 && <option value="15">15</option>}
          {questions.length > 20 && <option value="20">20</option>}
          {questions.length > 40 && <option value="40">40</option>}
          <option value={questions.length}>{questions.length}</option>
        </select>
      </div>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        መስራት ጀምር
      </button>
    </div>
  );
}

export default StartScreen;
