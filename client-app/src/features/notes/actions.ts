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

export type NotesActions =
  | ReturnType<typeof getNotesRequest>
  | ReturnType<typeof getNotesSuccess>
  | ReturnType<typeof getNotesError>
  | ReturnType<typeof createNoteRequest>
  | ReturnType<typeof createNoteSuccess>
  | ReturnType<typeof createNoteError>;
