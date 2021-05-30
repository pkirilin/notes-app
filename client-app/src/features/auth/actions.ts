import { Action } from 'redux';
import { PayloadAction } from '../__shared__/types';
import { LoginData } from './models/LoginData';
import { RegisterData } from './models/RegisterData';
import { UserData } from './models/UserData';

export enum AuthActionTypes {
  LoginRequest = 'auth/loginRequest',
  LoginSuccess = 'auth/loginSuccess',
  LoginError = 'auth/loginError',
  Logout = 'auth/logout',
  RegisterRequest = 'auth/registerRequest',
  RegisterSuccess = 'auth/registerSuccess',
  RegisterError = 'auth/registerError',
}

export const loginRequest = (payload: LoginData): PayloadAction<AuthActionTypes.LoginRequest, LoginData> => ({
  type: AuthActionTypes.LoginRequest,
  payload,
});

export const loginSuccess = (userData: UserData): PayloadAction<AuthActionTypes.LoginSuccess, UserData> => ({
  type: AuthActionTypes.LoginSuccess,
  payload: userData,
});

export const loginError = (): Action<AuthActionTypes.LoginError> => ({
  type: AuthActionTypes.LoginError,
});

export const logout = (): Action<AuthActionTypes.Logout> => ({
  type: AuthActionTypes.Logout,
});

export const registerRequest = (
  payload: RegisterData,
): PayloadAction<AuthActionTypes.RegisterRequest, RegisterData> => ({
  type: AuthActionTypes.RegisterRequest,
  payload,
});

export const registerSuccess = (): Action<AuthActionTypes.RegisterSuccess> => ({
  type: AuthActionTypes.RegisterSuccess,
});

export const registerError = (payload: string): PayloadAction<AuthActionTypes.RegisterError, string> => ({
  type: AuthActionTypes.RegisterError,
  payload,
});

export type AuthActions =
  | ReturnType<typeof loginRequest>
  | ReturnType<typeof loginSuccess>
  | ReturnType<typeof loginError>
  | ReturnType<typeof logout>
  | ReturnType<typeof registerRequest>
  | ReturnType<typeof registerSuccess>
  | ReturnType<typeof registerError>;
