import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton'
import Progress from './Progress'
import FinishScreen from './FinishScreen'

const initialState = {
  questions: [],
  //'loading','error', 'ready', 'active','finished'
  status: 'loading',
  index: 0,
  answer: null,
  points:0,
  highscore:0
};
function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      };
      break;
    case 'dataFailed':
      return {
        ...state,
        status: 'error',
      };
      break;
    case 'start':
      return {
        ...state,
        status: 'active',
      };
    case 'newAnswer':
      const question = state.questions.at(state.index)   //question就是當前問題物件，questions的question
      return {
        ...state,
        answer: action.payload,  //這裡更新 state的answer,在 Options component中被傳遞進來
        points:
          action.payload === question.currentQuestion 
            ? state.points + 1 
            : state.points  //question裡面又有currentQuestion
      };
      case 'nextQuestion':
        return {
          ...state,
          index: state.index + 1,
          answer:null //回答完題目之後，將anser更新為null
        }

        case 'finish':
          return {
            ...state,
            status: 'finished',
            highscore: state.points > state.highscore ? state.points : state.highscore
          }
    default:
      throw new Error('Action unknown.');
      break;
  }
}
export default function App() {
  const [{ questions, status, index, answer, points, highscore }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const numQuestions = questions.length;
    const maxPossiblePoints = questions.reduce((prev, cur) => prev + cur.points ,0)
  useEffect(function () {
    fetch('http://localhost:8000/questions')
      .then((res) => res.json())
      .then((data) => {
        console.log('dataReceived:', data);
        dispatch({ type: 'dataReceived', payload: data });
      })
      .catch((err) => dispatch({ type: 'dataFailed' }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <>
            <Progress 
              numQuestions={numQuestions} 
              index={index} 
              points={points} 
              maxPossiblePoints={maxPossiblePoints} 
              answer={answer}
            />
            <Question
              currentQuestion={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton dispatch={dispatch} answer={answer} numQuestions={numQuestions} index={index}/>
          </>
        )}
        {status === 'finished' &&(
           <FinishScreen points={points} maxPossiblePoints={maxPossiblePoints} highscore={highscore}/>
        )}
      </Main>
    </div>
  );
}
