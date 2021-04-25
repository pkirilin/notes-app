import { Action } from 'redux';
import { PayloadAction } from '../__shared__/types';
import { NoteListItem } from './models/NoteListItem';

export enum NotesActionTypes {
  NotesRequested = 'notes/notesRequested',
  NotesReceived = 'notes/notesReceived',
  NotesRejected = 'notes/notesRejected',
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

export type NotesActions =
  | ReturnType<typeof notesRequested>
  | ReturnType<typeof notesReceived>
  | ReturnType<typeof notesRejected>;
