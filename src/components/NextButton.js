import React from "react";

function NextButton({ dispatch, answer, numQuestions, questionIndex }) {
  if (answer === null) return null;

  if (questionIndex < numQuestions - 1)
    return (
      <>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          ቀጣይ ጥያቄ
        </button>
        <button
          className="btn btn-quit"
          onClick={() => dispatch({ type: "quit", payload: questionIndex + 1 })}
        >
          አቋርጥ
        </button>
      </>
    );
  // if (questionIndex < numQuestions - 1)
  //   return (
  //     <button
  //       className="btn btn-quit"
  //       onClick={() => dispatch({ type: "finish" })}
  //     >
  //       Quit
  //     </button>
  //   );
  if (questionIndex === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        ውጤት
      </button>
    );
}

export default NextButton;
