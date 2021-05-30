import React from 'react';
import App from './App';
import { loginSuccess } from './features/auth/actions';
import { UserData } from './features/auth/models/UserData';
import { renderConnected } from './test-utils';

describe('<App></App>', () => {
  describe('when user is not authorized', () => {
    test('should show login page', async () => {
      const { findByText } = renderConnected(<App></App>);

      expect(await findByText('Sign in')).toBeVisible();
    });
  });

  describe('when user authorized', () => {
    test('should show notes page', async () => {
      const { findByText } = renderConnected(<App></App>, [loginSuccess(createTestUser())]);

      expect(await findByText('Notes')).toBeVisible();
    });
  });
});

function createTestUser(): UserData {
  return {
    userId: 1,
    userName: 'test',
    token: '',
    tokenExpirationInDays: 1,
  };
}
