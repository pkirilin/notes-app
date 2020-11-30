import { Reducer } from 'redux';
import { AuthActions } from './actions';
import { AuthState } from './store';

const authReducer: Reducer<AuthState, AuthActions> = (state = {}) => {
  return state;
};

export default authReducer;
