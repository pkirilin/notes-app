import React from 'react';
import { fireEvent } from '@testing-library/react';
import LoginInput from '../LoginInput';
import {
  asJestMock,
  renderConnected,
  waitForSingleCall,
} from '../../../../test-utils';
import api from '../../api';
import { UserData } from '../../models';

jest.mock('../../api');

describe('LoginInput', () => {
  describe('when input valid and login button clicked', () => {
    test('should log user in', async () => {
      const api = mockSuccessfulLogin();

      const { getByPlaceholderText, getByText, history } = renderConnected(
        <LoginInput></LoginInput>,
      );
      fireEvent.change(getByPlaceholderText('Login'), {
        target: { value: 'login' },
      });
      fireEvent.change(getByPlaceholderText('Password'), {
        target: { value: 'password' },
      });
      fireEvent.click(getByText('Sign in'));
      await waitForSingleCall(api);

      expect(history.location.pathname).toBe('/');
    });
  });

  describe('when input is not valid and login button clicked', () => {
    test('should show validation errors', async () => {
      const { getByText, findByText } = renderConnected(
        <LoginInput></LoginInput>,
      );

      fireEvent.click(getByText('Sign in'));

      expect(await findByText('Login is required')).toBeVisible();
      expect(await findByText('Password is required')).toBeVisible();
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
