import React from 'react';
import { fireEvent, RenderResult } from '@testing-library/react';
import LoginInput from '../LoginInput';
import { asJestMock, renderConnected, waitForSingleCall } from '../../../../test-utils';
import api from '../../api';
import { UserData } from '../../models/UserData';

jest.mock('../../api');

describe('LoginInput', () => {
  describe('when input valid and login button clicked', () => {
    test('should log user in', async () => {
      const api = mockSuccessfulLogin();

      const result = renderConnected(<LoginInput></LoginInput>);
      enterLoginAndPassword(result);
      clickLogin(result);
      await waitForSingleCall(api);

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

function mockSuccessfulLogin(): jest.Mock<Promise<UserData>> {
  return asJestMock(api.login).mockResolvedValueOnce({
    userId: 1,
    userName: 'user',
    token: '',
    tokenExpirationInDays: 1,
  });
}

function enterLoginAndPassword({ getByPlaceholderText }: RenderResult) {
  fireEvent.change(getByPlaceholderText('Login'), {
    target: { value: 'login' },
  });

  fireEvent.change(getByPlaceholderText('Password'), {
    target: { value: 'password' },
  });
}

function clickLogin({ getByText }: RenderResult) {
  fireEvent.click(getByText('Sign in'));
}
