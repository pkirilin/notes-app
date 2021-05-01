import { all, call, put, takeEvery } from '@redux-saga/core/effects';
import api from './api';
import {
  createNoteError,
  createNoteRequest,
  createNoteSuccess,
  NotesActionTypes,
  notesReceived,
  notesRejected,
} from './actions';
import { NoteListItem } from './models/NoteListItem';

function* getNotes() {
  try {
    const notes: NoteListItem[] = yield call(api.getNotes);
    yield put(notesReceived(notes));
  } catch (error) {
    yield put(notesRejected());
  }
}

function* createNote({ payload }: ReturnType<typeof createNoteRequest>) {
  try {
    const note: NoteListItem = yield call(api.createNote, payload);
    yield put(createNoteSuccess(note));
  } catch (error) {
    yield put(createNoteError());
  }
}

function* watchGetNotes() {
  yield takeEvery(NotesActionTypes.NotesRequested, getNotes);
}

function* watchCreateNote() {
  yield takeEvery(NotesActionTypes.CreateNoteRequest, createNote);
}

export default function* (): Generator {
  yield all([watchGetNotes(), watchCreateNote()]);
}
