import { OperationResult } from '../__shared__/types';
import { UserData } from './models/UserData';

export type UserState = UserData | null | undefined;

export type RegistrationResult = OperationResult;
