import React from 'react';
import { render, testInitialState } from 'app/testing';
import RegisterInput from '../RegisterInput';
import { fireEvent } from '@testing-library/react';
import { AuthActions, AuthActionTypes } from 'features/auth/actions';
import { RootState } from 'app/store';

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

  test('should redirect user to login page after completing registration', () => {
    // Arrange
    const initialState: RootState = {
      ...testInitialState,
      auth: {
        ...testInitialState.auth,
        registrationStatus: 'idle',
      },
    };
    const registrationCompletedState: RootState = {
      ...testInitialState,
      auth: {
        ...testInitialState.auth,
        registrationStatus: 'completed',
      },
    };

    // Act
    const { history, rerenderWithStateChange } = render(
      <RegisterInput></RegisterInput>,
      initialState,
    );

    rerenderWithStateChange(
      <RegisterInput></RegisterInput>,
      registrationCompletedState,
    );

    // Assert
    expect(history.location.pathname).toBe('/login');
  });
});
