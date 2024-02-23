import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./startScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import All_questions from "../Local_questions";
import Footer from "./Footer";
import Timer from "./Timer";

const SECS_PER_QUESTION = 60;

const initialState = {
  questions: [],
  // "loading", "error", "ready", "finished"
  status: "loading",
  questionIndex: 0,
  answer: null,
  points: 0,
  highscore: 0,
  numQuestions: 10,
  secondRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload.questions, status: "ready" };
    case "failed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondRemaining: state.numQuestions * SECS_PER_QUESTION,
      };
    case "check_answer":
      const question = state.questions.at(state.questionIndex);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, answer: null, questionIndex: state.questionIndex + 1 };
    case "changeQuestionNum":
      return { ...state, numQuestions: action.payload };
    case "finish":
      return {
        ...state,
        answer: null,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "quit":
      return {
        ...state,
        answer: null,
        status: "finished",
        numQuestions: action.payload,
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    case "tick":
      return {
        ...state,
        secondRemaining: state.secondRemaining - 1,
        status: state.secondRemaining === 0 ? "fininshed" : state.status,
      };
    default:
      throw new Error("Action unkown");
  }
}

export default function App() {
  const [
    {
      questions,
      status,
      questionIndex,
      answer,
      points,
      highscore,
      numQuestions,
      secondRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  // let numQuestions = 10;
  const maxPossiblePoints = numQuestions * 10;

  useEffect(function () {
    // fetch("http://localhost:8000/questions")
    //   .then((res) => res.json())
    //   .then((data) => dispatch({ type: "dataReceived", payload: data }))
    //   .catch((err) => dispatch({ type: "failed" }));

    dispatch({ type: "dataReceived", payload: All_questions });
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            numQuestions={numQuestions}
            questions={questions}
            dispatch={dispatch}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              index={questionIndex}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[questionIndex]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondRemaining={secondRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                questionIndex={questionIndex}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            numQuestions={numQuestions}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
