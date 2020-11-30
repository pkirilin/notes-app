import { BaseAction } from 'app/types';
import { LoginRequestPayload, LoginSuccessPayload } from './models';

export enum AuthActionTypes {
  LoginRequest = 'auth/loginRequested',
  LoginSuccess = 'auth/userLoggedIn',
  LoginError = 'auth/loginFailed',
}

export type LoginRequestAction = BaseAction<
  AuthActionTypes.LoginRequest,
  LoginRequestPayload
>;

export type LoginSuccessAction = BaseAction<
  AuthActionTypes.LoginSuccess,
  LoginSuccessPayload
>;

export type LoginErrorAction = BaseAction<AuthActionTypes.LoginError, string>;

export const loginRequest = (
  loginData: LoginRequestPayload,
): LoginRequestAction => ({
  type: AuthActionTypes.LoginRequest,
  payload: loginData,
});

export const loginSuccess = (
  loginResult: LoginSuccessPayload,
): LoginSuccessAction => ({
  type: AuthActionTypes.LoginSuccess,
  payload: loginResult,
});

export const loginError = (errorMessage: string): LoginErrorAction => ({
  type: AuthActionTypes.LoginError,
  payload: errorMessage,
});

export type AuthActions =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginErrorAction;
