import api from './api';
import { asJestMock } from '../../test-utils';
import { UserData } from './models/UserData';
import { fireEvent, RenderResult } from '@testing-library/react';

export function mockLoginApi(userName: string): jest.Mock<Promise<UserData>> {
  return asJestMock(api.login).mockResolvedValueOnce({
    userId: 1,
    userName,
    token: '',
    tokenExpirationInDays: 1,
  });
}

export function mockRegisterApi(): jest.Mock<Promise<void>> {
  return asJestMock(api.register).mockResolvedValueOnce();
}

export function fillLoginData(result: RenderResult, login: string, password: string): void {
  fireEvent.change(result.getByPlaceholderText('Login'), {
    target: { value: login },
  });

  fireEvent.change(result.getByPlaceholderText('Password'), {
    target: { value: password },
  });
}

export function fillRegisterData(
  { getByPlaceholderText }: RenderResult,
  login: string,
  password: string,
  passwordConfirm: string,
): void {
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

export function clickLogin({ getByText }: RenderResult): void {
  fireEvent.click(getByText('Sign in'));
}

export function clickRegister({ getByText }: RenderResult): void {
  fireEvent.click(getByText('Register'));
}
