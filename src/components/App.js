import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader"
import Error from "./Error"
import StartScreen from "./startScreen"
import Question from "./Question";
import NextButton from "./NextButton";

const initialState = {
  questions: [],
  // "loading", "error", "ready", "finished"
  status: "loading",
  questionIndex: 0,
  answer: null,
  points: 0
};

function reducer(state, action) {
  switch(action.type) {
    case "dataReceived":
      return {...state, questions:action.payload, status: "ready"}
    case "failed":
      return {...state, status:"error"}
    case "start":
      return {...state, status:"active"}
    case "check_answer":
      const question = state.questions.at(state.questionIndex)
      return {...state,
        answer: action.payload,
        points: action.payload === question.correctAnswer ? state.points + question.points : state.points
        }
    case "nextQuestion":
      return {...state, answer: null, questionIndex: state.questionIndex + 1}
    default:
      throw new Error("Action unkown")
  }
}

export default function App () {
  const [{questions, status, questionIndex, answer}, dispatch] = useReducer(reducer, initialState)
  const numQuestions = questions.length

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({type: "dataReceived", payload: data}))
      .catch((err) => dispatch({type:"failed"}))
  }, [])
  return <div className="app">
    <Header />
    <Main>
      {status === "loading" && <Loader /> }
      {status === "error" && <Error /> }
      {status === "ready" && <StartScreen numQuestions={numQuestions} dispatch={dispatch}/> }
      {status === "active" && (
        <>
        <Question question={questions[questionIndex]} dispatch={dispatch} answer={answer}/>
        <NextButton dispatch={dispatch} answer={answer}/>
        </>
      )}
    </Main>
  </div>
}