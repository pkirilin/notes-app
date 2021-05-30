import { Action } from 'redux';
import { PayloadAction } from '../__shared__/types';
import { NoteCreateEdit } from './models/NoteCreateEdit';
import { NoteListItem } from './models/NoteListItem';

export enum NotesActionTypes {
  GetNotesRequest = 'notes/getNotesRequest',
  GetNotesSuccess = 'notes/getNotesSuccess',
  GetNotesError = 'notes/getNotesError',

  CreateNoteRequest = 'notes/createNoteRequest',
  CreateNoteSuccess = 'notes/createNoteSuccess',
  CreateNoteError = 'notes/createNoteError',

  EditNoteRequest = 'notes/editNoteRequest',
  EditNoteSuccess = 'notes/editNoteSuccess',
  EditNoteError = 'notes/editNoteError',

  DeleteNoteRequest = 'notes/deleteNoteRequest',
  DeleteNoteSuccess = 'notes/deleteNoteSuccess',
  DeleteNoteError = 'notes/deleteNoteError',

  SelectNote = 'notes/noteSelected',
  CancelSelectNote = 'notes/noteSelectionCanceled',

  Draft = 'notes/draft',
  ChangeDraft = 'notes/draftChanged',
  CancelDraft = 'notes/draftCanceled',

  LoadMoreRequest = 'notes/loadMoreRequest',
  LoadMoreSuccess = 'notes/loadMoreSuccess',
  LoadMoreError = 'notes/loadMoreError',

  SearchRequest = 'notes/searchRequest',
  SearchSuccess = 'notes/searchSuccess',
  SearchError = 'notes/searchError',
}

export const getNotesRequest = (): Action<NotesActionTypes.GetNotesRequest> => ({
  type: NotesActionTypes.GetNotesRequest,
});

export const getNotesSuccess = (
  notes: NoteListItem[],
): PayloadAction<NotesActionTypes.GetNotesSuccess, NoteListItem[]> => ({
  type: NotesActionTypes.GetNotesSuccess,
  payload: notes,
});

export const getNotesError = (): Action<NotesActionTypes.GetNotesError> => ({
  type: NotesActionTypes.GetNotesError,
});

export const createNoteRequest = (
  note: NoteCreateEdit,
): PayloadAction<NotesActionTypes.CreateNoteRequest, NoteCreateEdit> => ({
  type: NotesActionTypes.CreateNoteRequest,
  payload: note,
});

export const createNoteSuccess = (
  note: NoteListItem,
): PayloadAction<NotesActionTypes.CreateNoteSuccess, NoteListItem> => ({
  type: NotesActionTypes.CreateNoteSuccess,
  payload: note,
});

export const createNoteError = (): Action<NotesActionTypes.CreateNoteError> => ({
  type: NotesActionTypes.CreateNoteError,
});

export const editNoteRequest = (
  id: number,
  note: NoteCreateEdit,
): PayloadAction<NotesActionTypes.EditNoteRequest, NoteCreateEdit, number> => ({
  type: NotesActionTypes.EditNoteRequest,
  payload: note,
  meta: id,
});

export const editNoteSuccess = (note: NoteListItem): PayloadAction<NotesActionTypes.EditNoteSuccess, NoteListItem> => ({
  type: NotesActionTypes.EditNoteSuccess,
  payload: note,
});

export const editNoteError = (): Action<NotesActionTypes.EditNoteError> => ({
  type: NotesActionTypes.EditNoteError,
});

export const deleteNoteRequest = (id: number): PayloadAction<NotesActionTypes.DeleteNoteRequest, number> => ({
  type: NotesActionTypes.DeleteNoteRequest,
  payload: id,
});

export const deleteNoteSuccess = (id: number): PayloadAction<NotesActionTypes.DeleteNoteSuccess, number> => ({
  type: NotesActionTypes.DeleteNoteSuccess,
  payload: id,
});

export const deleteNoteError = (): Action<NotesActionTypes.DeleteNoteError> => ({
  type: NotesActionTypes.DeleteNoteError,
});

export const noteSelected = (note: NoteListItem): PayloadAction<NotesActionTypes.SelectNote, NoteListItem> => ({
  type: NotesActionTypes.SelectNote,
  payload: note,
});

export const noteSelectionCanceled = (): Action<NotesActionTypes.CancelSelectNote> => ({
  type: NotesActionTypes.CancelSelectNote,
});

export const draft = (): Action<NotesActionTypes.Draft> => ({
  type: NotesActionTypes.Draft,
});

export const draftChanged = (text: string): PayloadAction<NotesActionTypes.ChangeDraft, string> => ({
  type: NotesActionTypes.ChangeDraft,
  payload: text,
});

export const draftCanceled = (): Action<NotesActionTypes.CancelDraft> => ({
  type: NotesActionTypes.CancelDraft,
});

export const loadMoreRequest = (pageIndex: number): PayloadAction<NotesActionTypes.LoadMoreRequest, number> => ({
  type: NotesActionTypes.LoadMoreRequest,
  payload: pageIndex,
});

export const loadMoreSuccess = (
  notes: NoteListItem[],
): PayloadAction<NotesActionTypes.LoadMoreSuccess, NoteListItem[]> => ({
  type: NotesActionTypes.LoadMoreSuccess,
  payload: notes,
});

export const loadMoreError = (): Action<NotesActionTypes.LoadMoreError> => ({
  type: NotesActionTypes.LoadMoreError,
});

export const searchRequest = (searchTerm: string): PayloadAction<NotesActionTypes.SearchRequest, string> => ({
  type: NotesActionTypes.SearchRequest,
  payload: searchTerm,
});

export const searchSuccess = (
  notes: NoteListItem[],
): PayloadAction<NotesActionTypes.SearchSuccess, NoteListItem[]> => ({
  type: NotesActionTypes.SearchSuccess,
  payload: notes,
});

export const searchError = (): Action<NotesActionTypes.SearchError> => ({
  type: NotesActionTypes.SearchError,
});

export type NotesActions =
  | ReturnType<typeof getNotesRequest>
  | ReturnType<typeof getNotesSuccess>
  | ReturnType<typeof getNotesError>
  | ReturnType<typeof createNoteRequest>
  | ReturnType<typeof createNoteSuccess>
  | ReturnType<typeof createNoteError>
  | ReturnType<typeof editNoteRequest>
  | ReturnType<typeof editNoteSuccess>
  | ReturnType<typeof editNoteError>
  | ReturnType<typeof deleteNoteRequest>
  | ReturnType<typeof deleteNoteSuccess>
  | ReturnType<typeof deleteNoteError>
  | ReturnType<typeof noteSelected>
  | ReturnType<typeof noteSelectionCanceled>
  | ReturnType<typeof draft>
  | ReturnType<typeof draftChanged>
  | ReturnType<typeof draftCanceled>
  | ReturnType<typeof loadMoreRequest>
  | ReturnType<typeof loadMoreSuccess>
  | ReturnType<typeof loadMoreError>
  | ReturnType<typeof searchRequest>
  | ReturnType<typeof searchSuccess>
  | ReturnType<typeof searchError>;
