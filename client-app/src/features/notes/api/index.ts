import config from '../../../config';
import { createAuthHeader } from '../../__shared__/utils/createAuthHeader';
import { NoteCreateEdit } from '../models/NoteCreateEdit';
import { NoteListItem } from '../models/NoteListItem';

const getNotes = async (pageIndex = 0): Promise<NoteListItem[]> => {
  const response = await fetch(`${config.apiUrl}/notes?pageIndex=${pageIndex}&pageSize=${config.notesPageSize}`, {
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

const editNote = async (id: number, note: NoteCreateEdit): Promise<NoteListItem> => {
  const response = await fetch(`${config.apiUrl}/notes/${id}`, {
    method: 'PUT',
    headers: {
      ...createAuthHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });

  return response.json();
};

const deleteNote = async (id: number): Promise<void> => {
  await fetch(`${config.apiUrl}/notes/${id}`, {
    method: 'DELETE',
    headers: { ...createAuthHeader() },
  });
};

const searchNotes = async (term: string): Promise<NoteListItem[]> => {
  const response = await fetch(
    `${config.apiUrl}/notes/search?term=${encodeURIComponent(term)}&showCount=${config.notesPageSize}`,
    {
      headers: { ...createAuthHeader() },
    },
  );

  return response.json();
};

export default {
  getNotes,
  createNote,
  editNote,
  deleteNote,
  searchNotes,
};
