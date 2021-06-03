import React from 'react';
import RegisterInput from '../RegisterInput';
import { registerError } from '../../actions';
import { renderConnected, waitForSingleCall } from '../../../../test-utils';
import { mockRegisterApi, fillRegisterData, clickRegister } from '../../testHelpers';

jest.mock('../../api');

describe('<RegisterInput></RegisterInput>', () => {
  describe('when input valid and register button clicked', () => {
    test('should redirect to login page after registration completed', async () => {
      const api = mockRegisterApi();

      const result = renderConnected(<RegisterInput></RegisterInput>);
      fillRegisterData(result, 'login', 'password', 'password');
      clickRegister(result);
      await waitForSingleCall(api);

      expect(result.history.location.pathname).toBe('/login');
    });
  });

  describe('when registration failed', () => {
    test('should show alert with error message', () => {
      const { getByText } = renderConnected(<RegisterInput></RegisterInput>, [registerError('Registration error')]);

      expect(getByText('Registration error')).toBeVisible();
    });
  });

  describe('when register button clicked and login/password are not filled', () => {
    test('should show validation errors', async () => {
      const result = renderConnected(<RegisterInput></RegisterInput>);
      fillRegisterData(result, '', '', 'password');
      clickRegister(result);

      expect(result.getByText('Login is required')).toBeVisible();
      expect(result.getByText('Password is required')).toBeVisible();
    });
  });

  describe('when register button clicked and passwords do not match', () => {
    test('should show validation errors', async () => {
      const result = renderConnected(<RegisterInput></RegisterInput>);
      fillRegisterData(result, 'login', 'password', 'password_new');
      clickRegister(result);

      expect(result.getByText('Passwords do not match')).toBeVisible();
    });
  });

  describe('when matching password entered after wrong confirm password', () => {
    test('should hide validation error', () => {
      const result = renderConnected(<RegisterInput></RegisterInput>);
      clickRegister(result);
      fillRegisterData(result, 'login', 'password', 'password_new');
      fillRegisterData(result, 'login', 'password', 'password');

      expect(result.queryByText('Passwords do not match')).toBeNull();
    });
  });
});
