import { createApiCall } from '../../app/helpers';
import config from '../../config';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  AuthActionTypes,
  loginError,
  LoginRequestAction,
  loginSuccess,
  registerError,
  RegisterRequestAction,
  registerSuccess,
} from './actions';
import {
  RegisterRequestPayload,
  LoginRequestPayload,
  UserData,
} from './models';
import Cookies from 'js-cookie';

const callLoginApi = createApiCall<UserData, LoginRequestPayload>({
  url: `${config.apiUrl}/login`,
  fetchJson: true,
  modifyUrl: (url, { userName, password }) =>
    `${url}?userName=${encodeURIComponent(
      userName,
    )}&password=${encodeURIComponent(password)}`,
});

const callRegisterApi = createApiCall<void, RegisterRequestPayload>({
  url: `${config.apiUrl}/register`,
  method: 'POST',
  constructBody: payload => JSON.stringify(payload),
});

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

function* login({ payload }: LoginRequestAction) {
  try {
    const { data, errorMessage } = yield call(callLoginApi, payload);

    if (data) {
      const isSessionCookie = !payload?.rememberMe;
      yield call(setUserCookies, data, isSessionCookie);
      yield put(loginSuccess(data));
    } else {
      yield put(loginError(errorMessage));
    }
  } catch (error) {
    yield put(loginError('Failed to login'));
  }
}

function* logout() {
  yield call<typeof removeUserCookies>(removeUserCookies);
}

function* register({ payload }: RegisterRequestAction) {
  try {
    const { data, errorMessage } = yield call(callRegisterApi, payload);

    if (data) {
      yield put(registerSuccess());
    } else {
      yield put(registerError(errorMessage));
    }
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
