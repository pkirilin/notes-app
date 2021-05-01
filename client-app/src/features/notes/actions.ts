import { Action } from 'redux';
import { PayloadAction } from '../__shared__/types';
import { NoteCreateEdit } from './models/NoteCreateEdit';
import { NoteListItem } from './models/NoteListItem';

export enum NotesActionTypes {
  NotesRequested = 'notes/notesRequested',
  NotesReceived = 'notes/notesReceived',
  NotesRejected = 'notes/notesRejected',
  CreateNoteRequest = 'notes/createNoteRequested',
  CreateNoteSuccess = 'notes/createNoteSucceeded',
  CreateNoteError = 'notes/createNoteFailed',
}

export const notesRequested = (): Action<NotesActionTypes.NotesRequested> => ({
  type: NotesActionTypes.NotesRequested,
});

export const notesReceived = (
  notes: NoteListItem[],
): PayloadAction<NotesActionTypes.NotesReceived, NoteListItem[]> => ({
  type: NotesActionTypes.NotesReceived,
  payload: notes,
});

export const notesRejected = (): Action<NotesActionTypes.NotesRejected> => ({
  type: NotesActionTypes.NotesRejected,
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
  | ReturnType<typeof notesRequested>
  | ReturnType<typeof notesReceived>
  | ReturnType<typeof notesRejected>
  | ReturnType<typeof createNoteRequest>
  | ReturnType<typeof createNoteSuccess>
  | ReturnType<typeof createNoteError>;
