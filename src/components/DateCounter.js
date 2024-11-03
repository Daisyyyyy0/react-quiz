import { useReducer, useState } from 'react';

function reducer(state, action) {
  console.log('state:', state, 'action:', action);
  console.log(typeof action);
  // if (action.type === 'inc' || 'dec') return state + action.payload; 這個寫法會導致 always true
  if (action.type === 'inc') return state + action.payload;
  if (action.type === 'dec') return state + action.payload;
  if (action.type === 'setCount') return action.payload;
}
function DateCounter() {
  const initialState = { count: 0, step: 1 };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date('june 21 2027');
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: 'dec', payload: -1 });
  };

  const inc = function () {
    dispatch({ type: 'inc', payload: 1 });
  };

  const defineCount = function (e) {
    console.log('e.target.value:', e.target.value);
    dispatch({ type: 'setCount', payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: 'setCount', payload: Number(e.target.value) });
  };

  const reset = function () {
    // setCount(0);
    // setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
