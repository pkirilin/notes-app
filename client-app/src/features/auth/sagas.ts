import { createApiCall } from 'app/helpers';
import config from 'config';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  AuthActionTypes,
  loginError,
  LoginRequestAction,
  loginSuccess,
} from './actions';
import { LoginRequestPayload, LoginSuccessPayload } from './models';
import Cookies from 'js-cookie';

const callLoginApi = createApiCall<LoginSuccessPayload, LoginRequestPayload>({
  url: `${config.apiUrl}/login`,
  fetchJson: true,
  modifyUrl: (url, { userName, password }) =>
    `${url}?userName=${encodeURIComponent(
      userName,
    )}&password=${encodeURIComponent(password)}`,
});

function setUserCookies({
  userId,
  userName,
  token,
  tokenExpirationInDays,
}: LoginSuccessPayload) {
  Cookies.set(
    'auth',
    {
      userId,
      userName,
      token,
    },
    {
      expires: tokenExpirationInDays,
    },
  );
}

function* login({ payload }: LoginRequestAction) {
  try {
    const { data, errorMessage } = yield call<typeof callLoginApi>(
      callLoginApi,
      payload,
    );

    if (data) {
      yield put(loginSuccess(data));
      yield call<typeof setUserCookies>(setUserCookies, data);
    } else {
      yield put(loginError(errorMessage));
    }
  } catch (error) {
    yield put(loginError('Failed to login'));
  }
}

function* watchLogin() {
  yield takeEvery(AuthActionTypes.LoginRequest, login);
}

export default function* authSaga(): Generator {
  yield all([watchLogin()]);
}
