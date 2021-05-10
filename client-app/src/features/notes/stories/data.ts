import config from '../../../config';
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
    createdAt: '2021-05-01T13:35:47',
    updatedAt: '2021-05-01T13:35:47',
  },
  {
    id: 2,
    text: 'Note 2',
    createdAt: '2021-05-02T13:35:47',
    updatedAt: '2021-05-02T13:35:47',
  },
  {
    id: 3,
    text: 'Note 3',
    createdAt: '2021-05-03T13:35:47',
    updatedAt: '2021-05-03T13:35:47',
  },
];

export const STORYBOOK_TEST_NOTE_ITEMS_MANY: NoteListItem[] = [];

for (let i = 0; i < config.notesPageSize; i++) {
  const sampleNote = { ...STORYBOOK_TEST_NOTE_ITEMS[0] };
  sampleNote.id = i + 1;
  sampleNote.text = 'Note ' + (i + 1);
  STORYBOOK_TEST_NOTE_ITEMS_MANY.push(sampleNote);
}
