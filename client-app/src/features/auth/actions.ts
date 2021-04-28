import { Action } from 'redux';
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

export const registrationRequested = (
  payload: RegisterRequestPayload,
): PayloadAction<AuthActionTypes.RegisterRequest, RegisterRequestPayload> => ({
  type: AuthActionTypes.RegisterRequest,
  payload,
});

export const registrationSucceeded = (): Action<AuthActionTypes.RegisterSuccess> => ({
  type: AuthActionTypes.RegisterSuccess,
});

export const registrationFailed = (
  payload: string,
): PayloadAction<AuthActionTypes.RegisterError, string> => ({
  type: AuthActionTypes.RegisterError,
  payload,
});

export type AuthActions =
  | ReturnType<typeof loginRequested>
  | ReturnType<typeof loginSucceeded>
  | ReturnType<typeof loginFailed>
  | ReturnType<typeof logout>
  | ReturnType<typeof registrationRequested>
  | ReturnType<typeof registrationSucceeded>
  | ReturnType<typeof registrationFailed>;
