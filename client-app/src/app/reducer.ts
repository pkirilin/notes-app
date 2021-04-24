import { combineReducers } from 'redux';
import { counterReducer } from 'features/counter';
import authReducer from 'features/auth/reducer';
import notesReducer from 'features/notes/reducer';

export default combineReducers({
  counter: counterReducer,
  auth: authReducer,
  notes: notesReducer,
});
