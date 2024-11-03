import Options from './Options';

function Question({ currentQuestion, dispatch, answer }) {
  console.log('currentQuestion', currentQuestion);
  return (
    <div>
      <p>question</p>
      <h4>{currentQuestion.question}</h4>
      <Options
        currentQuestion={currentQuestion}
        options={currentQuestion.options}
        dispatch={dispatch}
        answer={answer}
      />
    </div>
  );
}

export default Question;
