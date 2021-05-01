import Cookies from 'js-cookie';
import config from '../../../config';
import { UserData } from '../../auth/models';
import { NoteCreateEdit } from '../models/NoteCreateEdit';
import { NoteListItem } from '../models/NoteListItem';

const getNotes = async (): Promise<NoteListItem[]> => {
  const user: UserData = Cookies.getJSON('auth');
  const response = await fetch(`${config.apiUrl}/notes`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  return response.json();
};

const createNote = async (note: NoteCreateEdit): Promise<NoteListItem> => {
  const user: UserData = Cookies.getJSON('auth');
  const response = await fetch(`${config.apiUrl}/notes`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify(note),
  });

  return response.json();
};

export default {
  getNotes,
  createNote,
};
