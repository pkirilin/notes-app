import { combineReducers } from 'redux';
import { counterReducer } from 'features/counter';

export default combineReducers({
  counter: counterReducer,
});
