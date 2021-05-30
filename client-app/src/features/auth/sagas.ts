import { all, call, put, takeEvery } from 'redux-saga/effects';
import { AuthActionTypes, loginError, loginSuccess, registerError, registerSuccess } from './actions';
import Cookies from 'js-cookie';
import api from './api';
import { PayloadAction } from '../__shared__/types';
import { UserData } from './models/UserData';
import { LoginData } from './models/LoginData';
import { RegisterData } from './models/RegisterData';

function setUserCookies({ userId, userName, token, tokenExpirationInDays }: UserData, isSessionCookie = false) {
  Cookies.set(
    'auth',
    {
      userId,
      userName,
      token,
    },
    {
      expires: isSessionCookie ? undefined : tokenExpirationInDays,
    },
  );
}

function removeUserCookies() {
  Cookies.remove('auth');
}

function* login({ payload }: PayloadAction<AuthActionTypes.LoginRequest, LoginData>) {
  try {
    const user: UserData = yield call(api.login, payload);
    const isSessionCookie = !payload?.rememberMe;
    yield call(setUserCookies, user, isSessionCookie);
    yield put(loginSuccess(user));
  } catch (error) {
    yield put(loginError());
  }
}

function* logout() {
  yield call<typeof removeUserCookies>(removeUserCookies);
}

function* register({ payload }: PayloadAction<AuthActionTypes.RegisterRequest, RegisterData>) {
  try {
    yield call(api.register, payload);
    yield put(registerSuccess());
  } catch (error) {
    yield put(registerError('Failed to register'));
  }
}

function* watchLogin() {
  yield takeEvery(AuthActionTypes.LoginRequest, login);
}

function* watchLogout() {
  yield takeEvery(AuthActionTypes.Logout, logout);
}

function* watchRegister() {
  yield takeEvery(AuthActionTypes.RegisterRequest, register);
}

export default function* authSaga(): Generator {
  yield all([watchLogin(), watchLogout(), watchRegister()]);
}
