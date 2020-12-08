import React from 'react';
import { fireEvent } from '@testing-library/react';
import LoginInput from '../LoginInput';
import { render } from 'app/testing';
import { AuthActions, AuthActionTypes } from 'features/auth/actions';

describe('LoginInput component', () => {
  test('should send login request on button click', () => {
    // Arrange
    const login = 'login';
    const password = 'password';
    const expectedActions: AuthActions[] = [
      {
        type: AuthActionTypes.LoginRequest,
        payload: {
          userName: login,
          password,
        },
      },
    ];

    // Act
    const { getByText, getByPlaceholderText, store } = render(
      <LoginInput></LoginInput>,
    );
    const loginInput = getByPlaceholderText('Login');
    const passwordInput = getByPlaceholderText('Password');
    const signInButton = getByText('Sign in');
    fireEvent.change(loginInput, { target: { value: login } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.click(signInButton);

    // Assert
    expect(store.getActions()).toEqual(expectedActions);
  });
});
