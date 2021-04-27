import { Action } from 'redux';
import { BaseAction } from '../../app/types';
import { PayloadAction } from '../__shared__/types';
import {
  RegisterRequestPayload,
  LoginRequestPayload,
  UserData,
} from './models';

export enum AuthActionTypes {
  LoginRequest = 'auth/loginRequested',
  LoginSuccess = 'auth/userLoggedIn',
  LoginError = 'auth/loginFailed',
  Logout = 'auth/userLoggedOut',
  RegisterRequest = 'auth/registrationRequested',
  RegisterSuccess = 'auth/registrationCompleted',
  RegisterError = 'auth/registrationFailed',
}

export const loginRequested = (
  payload: LoginRequestPayload,
): PayloadAction<AuthActionTypes.LoginRequest, LoginRequestPayload> => ({
  type: AuthActionTypes.LoginRequest,
  payload,
});

export const loginSucceeded = (
  userData: UserData,
): PayloadAction<AuthActionTypes.LoginSuccess, UserData> => ({
  type: AuthActionTypes.LoginSuccess,
  payload: userData,
});

export const loginFailed = (): Action<AuthActionTypes.LoginError> => ({
  type: AuthActionTypes.LoginError,
});

export const logout = (): Action<AuthActionTypes.Logout> => ({
  type: AuthActionTypes.Logout,
});

export type RegisterRequestAction = BaseAction<
  AuthActionTypes.RegisterRequest,
  RegisterRequestPayload
>;

export type RegisterSuccessAction = BaseAction<AuthActionTypes.RegisterSuccess>;

export type RegisterErrorAction = BaseAction<
  AuthActionTypes.RegisterError,
  string
>;

export const registerRequest = (
  registerData: RegisterRequestPayload,
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
  | ReturnType<typeof loginRequested>
  | ReturnType<typeof loginSucceeded>
  | ReturnType<typeof loginFailed>
  | RegisterRequestAction
  | RegisterSuccessAction
  | RegisterErrorAction;
