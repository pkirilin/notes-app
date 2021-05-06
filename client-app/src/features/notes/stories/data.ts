import { UserData } from '../../auth/models/UserData';
import { NoteListItem } from '../models/NoteListItem';

export const STORYBOOK_TEST_USER: UserData = {
  userId: 1,
  userName: 'storybook',
  token: '',
  tokenExpirationInDays: 1,
};

export const STORYBOOK_TEST_NOTE_ITEMS: NoteListItem[] = [
  {
    id: 1,
    text: 'Note 1',
    createdAt: '2021-05-01',
    updatedAt: '2021-05-01',
  },
  {
    id: 2,
    text: 'Note 2',
    createdAt: '2021-05-02',
    updatedAt: '2021-05-02',
  },
  {
    id: 3,
    text: 'Note 3',
    createdAt: '2021-05-03',
    updatedAt: '2021-05-03',
  },
];
