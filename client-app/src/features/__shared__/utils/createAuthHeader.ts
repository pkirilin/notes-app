import Cookies from 'js-cookie';
import { UserData } from '../../auth/models/UserData';

export function createAuthHeader(): Record<string, string> {
  const user: UserData = Cookies.getJSON('auth');

  if (!user) {
    throw new Error('Auth cookie not found');
  }

  return { Authorization: `Bearer ${user.token}` };
}
