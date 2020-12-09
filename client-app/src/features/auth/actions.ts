import { BaseAction } from 'app/types';
import { AuthRequest, UserData } from './models';

export enum AuthActionTypes {
  LoginRequest = 'auth/loginRequested',
  LoginSuccess = 'auth/userLoggedIn',
  LoginError = 'auth/loginFailed',
  Logout = 'auth/userLoggedOut',
  RegisterRequest = 'auth/registrationRequested',
  RegisterSuccess = 'auth/registrationCompleted',
  RegisterError = 'auth/registrationFailed',
}

export type LoginRequestAction = BaseAction<
  AuthActionTypes.LoginRequest,
  AuthRequest
>;

export type LoginSuccessAction = BaseAction<
  AuthActionTypes.LoginSuccess,
  UserData
>;

export type LoginErrorAction = BaseAction<AuthActionTypes.LoginError, string>;

export type LogoutAction = BaseAction<AuthActionTypes.Logout>;

export type RegisterRequestAction = BaseAction<
  AuthActionTypes.RegisterRequest,
  AuthRequest
>;

export type RegisterSuccessAction = BaseAction<AuthActionTypes.RegisterSuccess>;

export type RegisterErrorAction = BaseAction<AuthActionTypes.RegisterError>;

export const loginRequest = (loginData: AuthRequest): LoginRequestAction => ({
  type: AuthActionTypes.LoginRequest,
  payload: loginData,
});

export const loginSuccess = (loginResult: UserData): LoginSuccessAction => ({
  type: AuthActionTypes.LoginSuccess,
  payload: loginResult,
});

export const loginError = (errorMessage: string): LoginErrorAction => ({
  type: AuthActionTypes.LoginError,
  payload: errorMessage,
});

export const logout = (): LogoutAction => ({ type: AuthActionTypes.Logout });

export const registerRequest = (
  registerData: AuthRequest,
): RegisterRequestAction => ({
  type: AuthActionTypes.RegisterRequest,
  payload: registerData,
});

export const registerSuccess = (): RegisterSuccessAction => ({
  type: AuthActionTypes.RegisterSuccess,
});

export const registerError = (errorMessage: string): RegisterErrorAction => ({
  type: AuthActionTypes.RegisterError,
  payload: errorMessage,
});

export type AuthActions =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginErrorAction
  | LogoutAction
  | RegisterRequestAction
  | RegisterSuccessAction
  | RegisterErrorAction;