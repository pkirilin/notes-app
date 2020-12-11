import React from 'react';
import { render, testInitialState } from 'app/testing';
import RegisterInput from '../RegisterInput';
import { fireEvent } from '@testing-library/react';
import { AuthActions, AuthActionTypes } from 'features/auth/actions';
import { RootState } from 'app/store';

describe('RegisterInput component', () => {
  test('should send register request on register button click if input valid', () => {
    // Arrange
    const login = 'login';
    const password = 'password';
    const expectedActions: AuthActions[] = [
      {
        type: AuthActionTypes.RegisterRequest,
        payload: { userName: login, password },
      },
    ];

    // Act
    const { getByText, getByPlaceholderText, store } = render(
      <RegisterInput></RegisterInput>,
    );
    const loginInput = getByPlaceholderText('Login');
    const passwordInput = getByPlaceholderText('Password');
    const passwordConfirmInput = getByPlaceholderText('Confirm password');
    const registerButton = getByText('Register');
    fireEvent.change(loginInput, { target: { value: login } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.change(passwordConfirmInput, { target: { value: password } });
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
        registrationResult: { status: 'idle' },
      },
    };
    const registrationCompletedState: RootState = {
      ...testInitialState,
      auth: {
        ...testInitialState.auth,
        registrationResult: { status: 'completed' },
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

  test('should show validation errors on register button click if input invalid', () => {
    // Act
    const { store, getByText } = render(<RegisterInput></RegisterInput>);
    const registerButton = getByText('Register');
    fireEvent.click(registerButton);
    const loginValidation = getByText('Login is required');
    const passwordValidation = getByText('Password is required');

    // Assert
    expect(store.getActions()).toEqual([]);
    expect(loginValidation).toBeInTheDocument();
    expect(passwordValidation).toBeInTheDocument();
  });

  test('should show validation error if passwords do not match', () => {
    // Act
    const { store, getByText, getByPlaceholderText } = render(
      <RegisterInput></RegisterInput>,
    );
    const registerButton = getByText('Register');
    const passwordInput = getByPlaceholderText('Password');
    const passwordConfirmInput = getByPlaceholderText('Confirm password');
    fireEvent.click(registerButton);
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(passwordConfirmInput, {
      target: { value: 'password1' },
    });
    const passwordConfirmValidation = getByText('Passwords do not match');

    // Assert
    expect(store.getActions()).toEqual([]);
    expect(passwordConfirmValidation).toBeInTheDocument();
  });

  test('should hide validation error if matching password is entered', () => {
    // Act
    const { store, getByText, getByPlaceholderText, queryByText } = render(
      <RegisterInput></RegisterInput>,
    );
    const registerButton = getByText('Register');
    const passwordInput = getByPlaceholderText('Password');
    const passwordConfirmInput = getByPlaceholderText('Confirm password');
    fireEvent.click(registerButton);
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(passwordConfirmInput, {
      target: { value: 'password1' },
    });
    fireEvent.change(passwordConfirmInput, {
      target: { value: 'password' },
    });
    const passwordConfirmValidation = queryByText('Passwords do not match');

    // Assert
    expect(store.getActions()).toEqual([]);
    expect(passwordConfirmValidation).toBeNull();
  });

  test('should show alert with error message if registration failed', () => {
    // Arrange
    const alertMessage = 'Registration error';
    const initialState: RootState = {
      ...testInitialState,
      auth: {
        ...testInitialState.auth,
        registrationResult: { status: 'idle' },
      },
    };
    const registrationErrorState: RootState = {
      ...testInitialState,
      auth: {
        ...testInitialState.auth,
        registrationResult: { status: 'error', message: alertMessage },
      },
    };

    // Act
    const { getByText, rerenderWithStateChange } = render(
      <RegisterInput></RegisterInput>,
      initialState,
    );

    rerenderWithStateChange(
      <RegisterInput></RegisterInput>,
      registrationErrorState,
    );

    const alert = getByText(alertMessage);

    // Assert
    expect(alert).toBeInTheDocument();
  });
});
