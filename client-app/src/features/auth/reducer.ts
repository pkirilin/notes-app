import { combineReducers, Reducer } from 'redux';
import Cookies from 'js-cookie';
import { AuthActions, AuthActionTypes } from './actions';
import { RegistrationStatusState, UserState } from './store';

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

export const registrationStatusReducer: Reducer<
  RegistrationStatusState,
  AuthActions
> = (state = 'initial', action) => {
  switch (action.type) {
    case AuthActionTypes.RegisterRequest:
      return 'idle';
    case AuthActionTypes.RegisterSuccess:
      return 'completed';
    case AuthActionTypes.RegisterError:
      return 'error';
    default:
      return state;
  }
};

export default combineReducers({
  user: userReducer,
  registrationStatus: registrationStatusReducer,
});
