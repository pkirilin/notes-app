import {
  AuthActionTypes,
  LoginSuccessAction,
  LogoutAction,
  RegisterErrorAction,
  RegisterRequestAction,
  RegisterSuccessAction,
} from '../actions';
import { UserData } from '../models';
import { registrationResultReducer, userReducer } from '../reducer';
import { RegistrationResult, UserState } from '../store';

describe('userReducer', () => {
  test('should handle login success and return user data', () => {
    // Arrange
    const user: UserData = {
      userId: 1,
      userName: 'user',
      token: 'token',
      tokenExpirationInDays: 10,
    };
    const state: UserState = null;
    const action: LoginSuccessAction = {
      type: AuthActionTypes.LoginSuccess,
      payload: user,
    };

    // Act
    const nextState = userReducer(state, action);

    // Assert
    expect(nextState).toEqual(user);
  });

  test('should handle logout and return null', () => {
    // Arrange
    const user: UserData = {
      userId: 1,
      userName: 'user',
      token: 'token',
      tokenExpirationInDays: 10,
    };
    const state: UserState = user;
    const action: LogoutAction = { type: AuthActionTypes.Logout };

    // Act
    const nextState = userReducer(state, action);

    // Assert
    expect(nextState).toEqual(null);
  });
});

describe('registrationResultReducer', () => {
  test('should handle register request', () => {
    // Arrange
    const state: RegistrationResult = { status: 'initial' };
    const action: RegisterRequestAction = {
      type: AuthActionTypes.RegisterRequest,
    };
    const expectedState: RegistrationResult = { status: 'idle' };

    // Act
    const nextState = registrationResultReducer(state, action);

    // Assert
    expect(nextState).toEqual(expectedState);
  });

  test('should handle register success', () => {
    // Arrange
    const state: RegistrationResult = { status: 'initial' };
    const action: RegisterSuccessAction = {
      type: AuthActionTypes.RegisterSuccess,
    };
    const expectedState: RegistrationResult = { status: 'completed' };

    // Act
    const nextState = registrationResultReducer(state, action);

    // Assert
    expect(nextState).toEqual(expectedState);
  });

  test('should handle register error', () => {
    // Arrange
    const state: RegistrationResult = { status: 'initial' };
    const action: RegisterErrorAction = {
      type: AuthActionTypes.RegisterError,
      payload: 'Error',
    };
    const expectedState: RegistrationResult = {
      status: 'error',
      message: 'Error',
    };

    // Act
    const nextState = registrationResultReducer(state, action);

    // Assert
    expect(nextState).toEqual(expectedState);
  });
});
