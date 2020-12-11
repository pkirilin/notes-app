import { combineReducers, Reducer } from 'redux';
import Cookies from 'js-cookie';
import { AuthActions, AuthActionTypes } from './actions';
import { RegistrationResult, UserState } from './store';

const user: UserState = Cookies.getJSON('auth') || null;

export const userReducer: Reducer<UserState, AuthActions> = (
  state = user,
  action,
) => {
  switch (action.type) {
    case AuthActionTypes.LoginSuccess:
      return action.payload;
    case AuthActionTypes.Logout:
      return null;
    default:
      return state;
  }
};

export const registrationResultReducer: Reducer<
  RegistrationResult,
  AuthActions
> = (state = { status: 'initial' }, action) => {
  switch (action.type) {
    case AuthActionTypes.RegisterRequest:
      return { status: 'idle' };
    case AuthActionTypes.RegisterSuccess:
      return { status: 'completed' };
    case AuthActionTypes.RegisterError:
      return { status: 'error', message: action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  user: userReducer,
  registrationResult: registrationResultReducer,
});
