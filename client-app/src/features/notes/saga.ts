import { all, call, put, takeEvery } from '@redux-saga/core/effects';
import api from './api';
import {
  createNoteError,
  createNoteRequest,
  createNoteSuccess,
  NotesActionTypes,
  getNotesSuccess,
  getNotesError,
  editNoteRequest,
  editNoteSuccess,
  editNoteError,
  deleteNoteRequest,
  deleteNoteSuccess,
  deleteNoteError,
} from './actions';
import { NoteListItem } from './models/NoteListItem';

function* getNotes() {
  try {
    const notes: NoteListItem[] = yield call(api.getNotes);
    yield put(getNotesSuccess(notes));
  } catch (error) {
    yield put(getNotesError());
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

function* editNote({ payload, meta }: ReturnType<typeof editNoteRequest>) {
  const noteId = meta || 0;

  try {
    yield call(api.editNote, noteId, payload);
    yield put(
      editNoteSuccess({
        id: noteId,
        text: payload.text,
      }),
    );
  } catch (error) {
    yield put(editNoteError());
  }
}

function* deleteNote({ payload }: ReturnType<typeof deleteNoteRequest>) {
  try {
    yield call(api.deleteNote, payload);
    yield put(deleteNoteSuccess(payload));
  } catch (error) {
    yield put(deleteNoteError());
  }
}

function* watchGetNotes() {
  yield takeEvery(NotesActionTypes.GetNotesRequest, getNotes);
}

function* watchCreateNote() {
  yield takeEvery(NotesActionTypes.CreateNoteRequest, createNote);
}

function* watchEditNote() {
  yield takeEvery(NotesActionTypes.EditNoteRequest, editNote);
}

function* watchDeleteNote() {
  yield takeEvery(NotesActionTypes.DeleteNoteRequest, deleteNote);
}

export default function* (): Generator {
  yield all([
    watchGetNotes(),
    watchCreateNote(),
    watchEditNote(),
    watchDeleteNote(),
  ]);
}
