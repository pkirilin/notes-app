import React from 'react';
import LoginInput from '../LoginInput';
import { renderConnected, waitForSingleCall } from '../../../../test-utils';
import { mockLoginApi, clickLogin, fillLoginData } from '../../testHelpers';

jest.mock('../../api');

describe('LoginInput', () => {
  describe('when input valid and login button clicked', () => {
    test('should log user in', async () => {
      const loginApi = mockLoginApi('user');

      const result = renderConnected(<LoginInput></LoginInput>);
      fillLoginData(result, 'login', 'password');
      clickLogin(result);
      await waitForSingleCall(loginApi);

      expect(result.history.location.pathname).toBe('/');
    });
  });

  describe('when input is not valid and login button clicked', () => {
    test('should show validation errors', async () => {
      const result = renderConnected(<LoginInput></LoginInput>);
      clickLogin(result);

      expect(await result.findByText('Login is required')).toBeVisible();
      expect(await result.findByText('Password is required')).toBeVisible();
    });
  });
});
