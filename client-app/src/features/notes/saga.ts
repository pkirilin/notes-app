import { all, call, debounce, put, takeEvery } from '@redux-saga/core/effects';
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
  loadMoreSuccess,
  loadMoreError,
  loadMoreRequest,
  searchSuccess,
  searchRequest,
  searchError,
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

function* loadMore({ payload }: ReturnType<typeof loadMoreRequest>) {
  try {
    const notes: NoteListItem[] = yield call(api.getNotes, payload);
    yield put(loadMoreSuccess(notes));
  } catch (error) {
    yield put(loadMoreError());
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
    const updatedNote: NoteListItem = yield call(api.editNote, noteId, payload);
    yield put(editNoteSuccess(updatedNote));
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

function* search({ payload }: ReturnType<typeof searchRequest>) {
  try {
    const notes: NoteListItem[] = yield call(api.searchNotes, payload);
    yield put(searchSuccess(notes));
  } catch (error) {
    yield put(searchError());
  }
}

function* watchGetNotes() {
  yield takeEvery(NotesActionTypes.GetNotesRequest, getNotes);
}

function* watchLoadMore() {
  yield takeEvery(NotesActionTypes.LoadMoreRequest, loadMore);
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

function* watchSearch() {
  yield debounce(350, NotesActionTypes.SearchRequest, search);
}

export default function* (): Generator {
  yield all([watchGetNotes(), watchLoadMore(), watchCreateNote(), watchEditNote(), watchDeleteNote(), watchSearch()]);
}
