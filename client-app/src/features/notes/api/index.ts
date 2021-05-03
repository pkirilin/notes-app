import config from '../../../config';
import { createAuthHeader } from '../../__shared__/utils/createAuthHeader';
import { NoteCreateEdit } from '../models/NoteCreateEdit';
import { NoteListItem } from '../models/NoteListItem';

const getNotes = async (): Promise<NoteListItem[]> => {
  const response = await fetch(`${config.apiUrl}/notes`, {
    headers: { ...createAuthHeader() },
  });

  return response.json();
};

const createNote = async (note: NoteCreateEdit): Promise<NoteListItem> => {
  const response = await fetch(`${config.apiUrl}/notes`, {
    method: 'POST',
    headers: {
      ...createAuthHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });

  return response.json();
};

const editNote = async (id: number, note: NoteCreateEdit): Promise<void> => {
  await fetch(`${config.apiUrl}/notes/${id}`, {
    method: 'PUT',
    headers: {
      ...createAuthHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
};

const deleteNote = async (id: number): Promise<void> => {
  await fetch(`${config.apiUrl}/notes/${id}`, {
    method: 'DELETE',
    headers: { ...createAuthHeader() },
  });
};

export default {
  getNotes,
  createNote,
  editNote,
  deleteNote,
};
