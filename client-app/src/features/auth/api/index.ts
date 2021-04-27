import config from '../../../config';
import {
  LoginRequestPayload,
  RegisterRequestPayload,
  UserData,
} from '../models';

async function login({
  userName,
  password,
}: LoginRequestPayload): Promise<UserData> {
  const response = await fetch(
    `${config.apiUrl}/login?userName=${encodeURIComponent(
      userName,
    )}&password=${encodeURIComponent(password)}`,
  );
  return response.json();
}

async function register(payload: RegisterRequestPayload): Promise<void> {
  const response = await fetch(`${config.apiUrl}/register`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return response.json();
}

export default {
  login,
  register,
};
