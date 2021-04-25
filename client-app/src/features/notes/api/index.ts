import Cookies from 'js-cookie';
import config from '../../../config';
import { UserData } from '../../auth/models';
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

export default {
  getNotes,
};
