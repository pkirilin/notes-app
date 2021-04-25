import { all, call, put, takeEvery } from '@redux-saga/core/effects';
import api from './api';
import { NotesActionTypes, notesReceived, notesRejected } from './actions';
import { NoteListItem } from './models/NoteListItem';

function* getNotes() {
  try {
    const notes: NoteListItem[] = yield call(api.getNotes);
    yield put(notesReceived(notes));
  } catch (error) {
    yield put(notesRejected());
  }
}

export default function* (): Generator {
  yield all([takeEvery(NotesActionTypes.NotesRequested, getNotes)]);
}
