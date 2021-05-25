import createValidatedStateHook from '../__shared__/utils/createValidatedStateHook';

export const useLogin = createValidatedStateHook<string>(login => {
  const trimmedLogin = login.trim();
  if (trimmedLogin.length === 0) {
    return [false, 'Login is required'];
  }
  if (trimmedLogin.length < 3) {
    return [false, 'Login is too short'];
  }
  return [true, ''];
});

export const usePassword = createValidatedStateHook<string>(password => {
  const trimmedPassword = password.trim();
  if (trimmedPassword.length === 0) {
    return [false, 'Password is required'];
  }
  return [true, ''];
});
