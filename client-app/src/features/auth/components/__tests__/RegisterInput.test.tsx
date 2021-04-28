import React from 'react';
import RegisterInput from '../RegisterInput';
import { fireEvent } from '@testing-library/react';
import { registrationFailed } from '../../actions';
import {
  renderConnected,
  setupFakeRegisterApi,
  waitForSingleCall,
} from '../../../../test-utils';

jest.mock('../../api');

describe('RegisterInput', () => {
  describe('when input valid and register button clicked', () => {
    test('should redirect to login page after registration completed', async () => {
      const api = setupFakeRegisterApi();

      const { history, getByPlaceholderText, getByText } = renderConnected(
        <RegisterInput></RegisterInput>,
      );
      fireEvent.change(getByPlaceholderText('Login'), {
        target: { value: 'login' },
      });
      fireEvent.change(getByPlaceholderText('Password'), {
        target: { value: 'password' },
      });
      fireEvent.change(getByPlaceholderText('Confirm password'), {
        target: { value: 'password' },
      });
      fireEvent.click(getByText('Register'));
      await waitForSingleCall(api);

      expect(history.location.pathname).toBe('/login');
    });
  });

  describe('when registration failed', () => {
    test('should show alert with error message', () => {
      const { getByText } = renderConnected(<RegisterInput></RegisterInput>, [
        registrationFailed('Registration error'),
      ]);

      expect(getByText('Registration error')).toBeVisible();
    });
  });

  describe('when register button clicked and login/password are not filled', () => {
    test('should show validation errors', async () => {
      const { getByPlaceholderText, getByText } = renderConnected(
        <RegisterInput></RegisterInput>,
      );
      fireEvent.change(getByPlaceholderText('Confirm password'), {
        target: { value: 'password' },
      });
      fireEvent.click(getByText('Register'));

      expect(getByText('Login is required')).toBeVisible();
      expect(getByText('Password is required')).toBeVisible();
    });
  });

  describe('when register button clicked and passwords do not match', () => {
    test('should show validation errors', async () => {
      const { getByPlaceholderText, getByText } = renderConnected(
        <RegisterInput></RegisterInput>,
      );
      fireEvent.change(getByPlaceholderText('Login'), {
        target: { value: 'login' },
      });
      fireEvent.change(getByPlaceholderText('Password'), {
        target: { value: 'password' },
      });
      fireEvent.change(getByPlaceholderText('Confirm password'), {
        target: { value: 'password_new' },
      });
      fireEvent.click(getByText('Register'));

      expect(getByText('Passwords do not match')).toBeVisible();
    });
  });

  describe('when matching password entered after wrong confirm password', () => {
    test('should hide validation error', () => {
      const { getByPlaceholderText, getByText, queryByText } = renderConnected(
        <RegisterInput></RegisterInput>,
      );
      fireEvent.click(getByText('Register'));
      fireEvent.change(getByPlaceholderText('Login'), {
        target: { value: 'login' },
      });
      fireEvent.change(getByPlaceholderText('Password'), {
        target: { value: 'password' },
      });
      fireEvent.change(getByPlaceholderText('Confirm password'), {
        target: { value: 'password_new' },
      });
      fireEvent.change(getByPlaceholderText('Confirm password'), {
        target: { value: 'password' },
      });

      expect(queryByText('Passwords do not match')).toBeNull();
    });
  });
});
