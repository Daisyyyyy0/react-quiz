function Options({ currentQuestion, options, dispatch, answer }) {
  //影片195 我把老師的question換成options了
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? 'answer' : ''} ${
            hasAnswered
              ? index === currentQuestion.correctOption
                ? 'correct'
                : 'wrong'
              : ''
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() => {
            console.log('options', options);
            console.log(
              'currentQuestion.correctOption:',
              currentQuestion.correctOption
            );
            dispatch({ type: 'newAnswer', payload: index });
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
