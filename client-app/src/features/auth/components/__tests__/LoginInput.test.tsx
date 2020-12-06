import React from 'react';
import { fireEvent } from '@testing-library/react';
import LoginInput from '../LoginInput';
import { render } from 'app/testing';
import { AuthActionTypes } from 'features/auth/actions';

describe('LoginInput component', () => {
  test('should change login input', () => {
    // Arrange
    const changedLogin = 'new login';

    // Act
    const { getByPlaceholderText } = render(<LoginInput></LoginInput>);
    const loginInput = getByPlaceholderText('Login');
    fireEvent.change(loginInput, { target: { value: changedLogin } });

    // Assert
    expect(loginInput.getAttribute('value')).toBe(changedLogin);
  });

  test('should change password input', () => {
    // Arrange
    const changedPassword = 'new password';

    // Act
    const { getByPlaceholderText } = render(<LoginInput></LoginInput>);
    const passwordInput = getByPlaceholderText('Password');
    fireEvent.change(passwordInput, { target: { value: changedPassword } });

    // Assert
    expect(passwordInput.getAttribute('value')).toBe(changedPassword);
  });

  test('should send login request on button click', () => {
    // Act
    const { getByText, store } = render(<LoginInput></LoginInput>);
    const signInButton = getByText('Sign in');
    fireEvent.click(signInButton);
    const actions = store.getActions();

    // Assert
    expect(actions).toHaveLength(1);
    expect(actions[0].type).toBe(AuthActionTypes.LoginRequest);
  });
});
