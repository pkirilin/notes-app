import { PayloadAction } from 'features/__shared__/types';
import { Action } from 'redux';
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
