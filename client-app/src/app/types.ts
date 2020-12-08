import { Action } from 'redux';

export interface BaseAction<A, P = unknown, M = unknown> extends Action<A> {
  payload?: P;
  meta?: M;
}

export type OperationStatus = 'initial' | 'idle' | 'completed' | 'error';
