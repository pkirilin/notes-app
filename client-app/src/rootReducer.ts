import { combineReducers } from 'redux';
import authReducer from './features/auth/reducer';
import notesReducer from './features/notes/reducer';

export default combineReducers({
  auth: authReducer,
  notes: notesReducer,
});
