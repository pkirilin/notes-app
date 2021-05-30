import { AnyAction, applyMiddleware, createStore, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../rootReducer';
import rootSaga from '../rootSaga';

export function createTestStore(actions: AnyAction[]): Store {
  const initialState = actions.reduce(rootReducer, undefined);
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware));

  sagaMiddleware.run(rootSaga);

  return store;
}
