import { combineReducers, Reducer } from 'redux';
import Cookies from 'js-cookie';
import { AuthActions, AuthActionTypes } from './actions';
import { UserState } from './store';

const user: UserState = Cookies.getJSON('auth') || null;

const userReducer: Reducer<UserState, AuthActions> = (state = user, action) => {
  switch (action.type) {
    case AuthActionTypes.LoginSuccess:
      return action.payload;
    case AuthActionTypes.Logout:
      return null;
    default:
      return state;
  }
};

export default combineReducers({
  user: userReducer,
});
