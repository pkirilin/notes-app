export interface AuthRequest {
  userName: string;
  password: string;
}

export interface UserData {
  userId: number;
  userName: string;
  token: string;
  tokenExpirationInDays: number;
}
