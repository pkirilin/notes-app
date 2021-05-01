import config from '../../../config';
import { LoginData } from '../models/LoginData';
import { RegisterData } from '../models/RegisterData';
import { UserData } from '../models/UserData';

async function login({ userName, password }: LoginData): Promise<UserData> {
  const response = await fetch(
    `${config.apiUrl}/login?userName=${encodeURIComponent(
      userName,
    )}&password=${encodeURIComponent(password)}`,
  );
  return response.json();
}

async function register(payload: RegisterData): Promise<void> {
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
