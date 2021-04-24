import { NoteListItem } from '../models/NoteListItem';

const getNotes = async (): Promise<NoteListItem[]> => {
  return new Promise(resolve => resolve([]));
};

export default {
  getNotes,
};
