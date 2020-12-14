export interface LoginRequestPayload {
  userName: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterRequestPayload {
  userName: string;
  password: string;
}

export interface UserData {
  userId: number;
  userName: string;
  token: string;
  tokenExpirationInDays: number;
}
