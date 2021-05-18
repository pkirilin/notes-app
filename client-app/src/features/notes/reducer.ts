import { combineReducers, Reducer } from 'redux';
import config from '../../config';
import { NotesActions, NotesActionTypes } from './actions';
import { NoteCreateEdit } from './models/NoteCreateEdit';
import { NoteListItem } from './models/NoteListItem';
import { NotesStatus } from './state';

const noteItemsReducer: Reducer<NoteListItem[], NotesActions> = (
  state = [],
  action,
) => {
  switch (action.type) {
    case NotesActionTypes.GetNotesSuccess:
      return action.payload;
    case NotesActionTypes.CreateNoteSuccess:
      return [action.payload, ...state];
    case NotesActionTypes.EditNoteSuccess:
      return [
        action.payload,
        ...state.filter(note => note.id !== action.payload.id),
      ];
    case NotesActionTypes.DeleteNoteSuccess:
      return state.filter(note => note.id !== action.payload);
    case NotesActionTypes.LoadMoreSuccess:
      return state.concat(action.payload);
    default:
      return state;
  }
};

const statusReducer: Reducer<NotesStatus | null, NotesActions> = (
  state = null,
  action,
) => {
  switch (action.type) {
    case NotesActionTypes.GetNotesError:
      return 'error';
    default:
      return state;
  }
};

const selectedNoteReducer: Reducer<NoteListItem | null, NotesActions> = (
  state = null,
  action,
) => {
  switch (action.type) {
    case NotesActionTypes.SelectNote:
      return action.payload;
    case NotesActionTypes.CancelSelectNote:
      return null;
    case NotesActionTypes.Draft:
      return {
        id: 0,
        text: '',
        createdAt: '',
        updatedAt: '',
      };
    case NotesActionTypes.CancelDraft:
      return null;
    case NotesActionTypes.CreateNoteSuccess:
      return null;
    case NotesActionTypes.EditNoteSuccess:
      return null;
    case NotesActionTypes.DeleteNoteSuccess:
      return action.payload === state?.id ? null : state;
    default:
      return state;
  }
};

const draftedNoteReducer: Reducer<NoteCreateEdit | null, NotesActions> = (
  state = null,
  action,
) => {
  switch (action.type) {
    case NotesActionTypes.Draft:
      return { text: '' };
    case NotesActionTypes.ChangeDraft:
      return { text: action.payload };
    case NotesActionTypes.CancelDraft:
      return null;
    case NotesActionTypes.CreateNoteSuccess:
      return null;
    default:
      return state;
  }
};

const showMoreVisibleReducer: Reducer<boolean, NotesActions> = (
  state = false,
  action,
) => {
  switch (action.type) {
    case NotesActionTypes.GetNotesSuccess:
      return action.payload.length >= config.notesPageSize;
    case NotesActionTypes.LoadMoreSuccess:
      return action.payload.length >= config.notesPageSize;
    default:
      return state;
  }
};

export default combineReducers({
  noteItems: noteItemsReducer,
  status: statusReducer,
  selectedNote: selectedNoteReducer,
  draftedNote: draftedNoteReducer,
  showMoreVisible: showMoreVisibleReducer,
});
