import { Action, ActionCreator } from 'redux';

export enum CounterActionTypes {
  Increment = 'INCREMENT_COUNTER',
  Decrement = 'DECREMENT_COUNTER',
}

export type CounterActions = IncrementAction | DecrementAction;

export type IncrementAction = Action<CounterActionTypes.Increment>;
export type DecrementAction = Action<CounterActionTypes.Decrement>;

export const increment: ActionCreator<IncrementAction> = () => ({
  type: CounterActionTypes.Increment,
});

export const decrement: ActionCreator<DecrementAction> = () => ({
  type: CounterActionTypes.Decrement,
});
