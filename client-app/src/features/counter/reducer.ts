import { Reducer } from 'redux';
import { CounterState } from './store';
import { CounterActions, CounterActionTypes } from './actions';

const counterReducer: Reducer<CounterState, CounterActions> = (
  state = 0,
  { type },
) => {
  switch (type) {
    case CounterActionTypes.Increment:
      return state + 1;
    case CounterActionTypes.Decrement:
      return state - 1;
    default:
      return state;
  }
};

export default counterReducer;
