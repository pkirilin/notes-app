import { all } from 'redux-saga/effects';
import authSaga from './features/auth/sagas';
import notesSaga from './features/notes/saga';

export default function* rootSaga(): Generator {
  yield all([authSaga(), notesSaga()]);
}
