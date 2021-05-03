import React from 'react';
import { Provider } from 'react-redux';
import { AnyAction, createStore, Reducer } from 'redux';
import rootReducer from '../rootReducer';

export function createStorybookReduxDecorator(
  actions: AnyAction[] = [],
  reducer?: typeof rootReducer,
): (story: () => React.ReactElement) => React.ReactElement {
  const initialState = actions.reduce(rootReducer, undefined);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const emptyReducer: Reducer<any, AnyAction> = () => initialState;
  const store = createStore(reducer || emptyReducer, initialState);

  // eslint-disable-next-line react/display-name
  return story => <Provider store={store}>{story()}</Provider>;
}
