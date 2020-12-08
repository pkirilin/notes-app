import React from 'react';
import { render } from 'app/testing';
import RegisterInput from '../RegisterInput';
import { fireEvent } from '@testing-library/react';
import { AuthActions, AuthActionTypes } from 'features/auth/actions';

describe('RegisterInput component', () => {
  test('should send register request on button click', () => {
    // Arrange
    const login = 'login';
    const password = 'password';
    const expectedActions: AuthActions[] = [
      {
        type: AuthActionTypes.RegisterRequest,
        payload: { userName: 'login', password: 'password' },
      },
    ];

    // Act
    const { getByText, getByPlaceholderText, store } = render(
      <RegisterInput></RegisterInput>,
    );
    const loginInput = getByPlaceholderText('Login');
    const passwordInput = getByPlaceholderText('Password');
    const registerButton = getByText('Register');
    fireEvent.change(loginInput, { target: { value: login } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.click(registerButton);

    // Assert
    expect(store.getActions()).toEqual(expectedActions);
  });
});
