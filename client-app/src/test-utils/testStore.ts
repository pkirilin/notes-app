import { AnyAction, applyMiddleware, createStore, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../app/reducer';
import rootSaga from '../app/sagas';

export function createTestStore(actions: AnyAction[]): Store {
  const initialState = actions.reduce(rootReducer, undefined);
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware),
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
