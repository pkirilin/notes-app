import { Action } from 'redux';
import { PayloadAction } from '../__shared__/types';
import { NoteListItem } from './models/NoteListItem';

export enum NotesActionTypes {
  NotesRequested = 'notes/notesRequested',
  NotesReceived = 'notes/notesReceived',
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

export type NotesActions =
  | ReturnType<typeof notesRequested>
  | ReturnType<typeof notesReceived>;
