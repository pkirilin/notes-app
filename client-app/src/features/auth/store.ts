import { OperationStatus } from 'app/types';
import { UserData } from './models';

export type UserState = UserData | null | undefined;

export type RegistrationStatusState = OperationStatus;
