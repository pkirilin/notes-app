import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  AuthActionTypes,
  loginFailed,
  loginSucceeded,
  registrationFailed,
  registrationSucceeded,
} from './actions';
import {
  RegisterRequestPayload,
  LoginRequestPayload,
  UserData,
} from './models';
import Cookies from 'js-cookie';
import api from './api';
import { PayloadAction } from '../__shared__/types';

function setUserCookies(
  { userId, userName, token, tokenExpirationInDays }: UserData,
  isSessionCookie = false,
) {
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

function* login({
  payload,
}: PayloadAction<AuthActionTypes.LoginRequest, LoginRequestPayload>) {
  try {
    const user: UserData = yield call(api.login, payload);
    const isSessionCookie = !payload?.rememberMe;
    yield call(setUserCookies, user, isSessionCookie);
    yield put(loginSucceeded(user));
  } catch (error) {
    yield put(loginFailed());
  }
}

function* logout() {
  yield call<typeof removeUserCookies>(removeUserCookies);
}

function* register({
  payload,
}: PayloadAction<AuthActionTypes.RegisterRequest, RegisterRequestPayload>) {
  try {
    yield call(api.register, payload);
    yield put(registrationSucceeded());
  } catch (error) {
    yield put(registrationFailed('Failed to register'));
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
