import { Reducer } from 'redux';
import Cookies from 'js-cookie';
import { AuthActions, AuthActionTypes } from './actions';
import { AuthState } from './store';
import { LoginSuccessPayload } from './models';

const user = Cookies.getJSON('auth') as LoginSuccessPayload | undefined;

const initialState: AuthState = {
  user,
};

const authReducer: Reducer<AuthState, AuthActions> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case AuthActionTypes.LoginRequest:
      return { ...state };
    case AuthActionTypes.LoginSuccess:
      return { user: action.payload };
    case AuthActionTypes.LoginError:
      return { ...state };
    case AuthActionTypes.Logout:
      return {};
    default:
      return state;
  }
};

export default authReducer;
