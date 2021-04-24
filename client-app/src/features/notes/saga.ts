import { all, call, put, takeEvery } from '@redux-saga/core/effects';
import api from './api';
import { NotesActionTypes, notesReceived } from './actions';
import { NoteListItem } from './models/NoteListItem';

function* getNotes() {
  const notes: NoteListItem[] = yield call(api.getNotes);
  yield put(notesReceived(notes));
}

export default function* (): Generator {
  yield all([takeEvery(NotesActionTypes.NotesRequested, getNotes)]);
}
