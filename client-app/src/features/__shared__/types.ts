import { Action } from 'redux';

export interface PayloadAction<A, P = unknown, M = unknown> extends Action<A> {
  payload: P;
  meta?: M;
}

export type OperationStatus = 'initial' | 'idle' | 'completed' | 'error';

export type OperationResult = {
  status: OperationStatus;
  message?: string;
};

export interface FormHookResultBase<TValue, TBinding> {
  value: TValue;
  setValue: React.Dispatch<React.SetStateAction<TValue>>;
  binding: TBinding;
}
