import { AuthActionTypes, LoginSuccessAction, LogoutAction } from '../actions';
import { UserData } from '../models';
import { userReducer } from '../reducer';
import { UserState } from '../store';

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
