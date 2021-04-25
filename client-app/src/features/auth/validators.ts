import { UseInputHookValidator } from '../../app/hooks';

export const loginValidator: UseInputHookValidator<string> = login => {
  const trimmedLogin = login.trim();

  if (trimmedLogin.length === 0) {
    return { isValid: false, message: 'Login is required' };
  }
  if (trimmedLogin.length < 3) {
    return { isValid: false, message: 'Login is too short' };
  }

  return { isValid: true };
};

export const passwordValidator: UseInputHookValidator<string> = password => {
  const trimmedPassword = password.trim();

  if (trimmedPassword.length === 0) {
    return { isValid: false, message: 'Password is required' };
  }

  return { isValid: true };
};
