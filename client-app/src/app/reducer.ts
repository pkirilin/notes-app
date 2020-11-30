import { combineReducers } from 'redux';
import { counterReducer } from 'features/counter';
import authReducer from 'features/auth/reducer';

export default combineReducers({
  counter: counterReducer,
  auth: authReducer,
});
