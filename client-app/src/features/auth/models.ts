export interface LoginRequestPayload {
  userName: string;
  password: string;
}

export interface LoginSuccessPayload {
  userId: number;
  userName: string;
  token: string;
  tokenExpirationInDays: number;
}
