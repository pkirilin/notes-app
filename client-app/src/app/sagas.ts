import { all } from 'redux-saga/effects';
import authSaga from 'features/auth/sagas';

export default function* rootSaga(): Generator {
  yield all([authSaga()]);
}
