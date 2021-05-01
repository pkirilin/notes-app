import React from 'react';
import RegisterInput from '../RegisterInput';
import { fireEvent, RenderResult } from '@testing-library/react';
import { registerError } from '../../actions';
import {
  asJestMock,
  renderConnected,
  waitForSingleCall,
} from '../../../../test-utils';
import api from '../../api';

jest.mock('../../api');

describe('<RegisterInput></RegisterInput>', () => {
  describe('when input valid and register button clicked', () => {
    test('should redirect to login page after registration completed', async () => {
      const api = mockSuccessfulRegister();

      const result = renderConnected(<RegisterInput></RegisterInput>);
      enterRegistrationData(result, 'login', 'password', 'password');
      clickRegister(result);
      await waitForSingleCall(api);

      expect(result.history.location.pathname).toBe('/login');
    });
  });

  describe('when registration failed', () => {
    test('should show alert with error message', () => {
      const { getByText } = renderConnected(<RegisterInput></RegisterInput>, [
        registerError('Registration error'),
      ]);

      expect(getByText('Registration error')).toBeVisible();
    });
  });

  describe('when register button clicked and login/password are not filled', () => {
    test('should show validation errors', async () => {
      const result = renderConnected(<RegisterInput></RegisterInput>);
      enterRegistrationData(result, '', '', 'password');
      clickRegister(result);

      expect(result.getByText('Login is required')).toBeVisible();
      expect(result.getByText('Password is required')).toBeVisible();
    });
  });

  describe('when register button clicked and passwords do not match', () => {
    test('should show validation errors', async () => {
      const result = renderConnected(<RegisterInput></RegisterInput>);
      enterRegistrationData(result, 'login', 'password', 'password_new');
      clickRegister(result);

      expect(result.getByText('Passwords do not match')).toBeVisible();
    });
  });

  describe('when matching password entered after wrong confirm password', () => {
    test('should hide validation error', () => {
      const result = renderConnected(<RegisterInput></RegisterInput>);
      clickRegister(result);
      enterRegistrationData(result, 'login', 'password', 'password_new');
      enterRegistrationData(result, 'login', 'password', 'password');

      expect(result.queryByText('Passwords do not match')).toBeNull();
    });
  });
});

function mockSuccessfulRegister(): jest.Mock<Promise<void>> {
  return asJestMock(api.register).mockResolvedValueOnce();
}

function enterRegistrationData(
  { getByPlaceholderText }: RenderResult,
  login: string,
  password: string,
  passwordConfirm: string,
) {
  fireEvent.change(getByPlaceholderText('Login'), {
    target: { value: login },
  });

  fireEvent.change(getByPlaceholderText('Password'), {
    target: { value: password },
  });

  fireEvent.change(getByPlaceholderText('Confirm password'), {
    target: { value: passwordConfirm },
  });
}

function clickRegister({ getByText }: RenderResult) {
  fireEvent.click(getByText('Register'));
}
