import { Action } from 'redux';

export interface PayloadAction<A, P = unknown, M = unknown> extends Action<A> {
  payload: P;
  meta?: M;
}
