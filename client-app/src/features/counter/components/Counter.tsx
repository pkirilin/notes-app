import React from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from 'app/hooks';
import { decrement, increment } from '../actions';

const Counter: React.FC = () => {
  const dispatch = useDispatch();
  const count = useTypedSelector(state => state.counter);

  return (
    <div>
      <div>{count}</div>
      <button
        onClick={() => {
          dispatch(decrement());
        }}
      >
        Decrement
      </button>
      <button
        onClick={() => {
          dispatch(increment());
        }}
      >
        Increment
      </button>
    </div>
  );
};

export default Counter;
