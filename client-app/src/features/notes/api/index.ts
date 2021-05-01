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
    headers: { ...createAuthHeader() },
    body: JSON.stringify(note),
  });

  return response.json();
};

export default {
  getNotes,
  createNote,
};
