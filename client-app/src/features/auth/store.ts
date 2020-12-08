import { UserData } from './models';

export type UserState = UserData | null | undefined;

export type AuthState = {
  user?: UserState;
};
