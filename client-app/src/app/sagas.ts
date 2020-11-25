import { SagaIterator } from 'redux-saga';

export function* rootSaga(): SagaIterator {
  console.log('root saga is working');
}
