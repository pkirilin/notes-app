import { combineReducers, Reducer } from 'redux';
import { NotesActions, NotesActionTypes } from './actions';
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
      return state.map(note =>
        note.id === action.payload.id ? action.payload : note,
      );
    case NotesActionTypes.DeleteNoteSuccess:
      return state.filter(note => note.id !== action.payload);
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
    case NotesActionTypes.CreateNoteSuccess:
      return 'note created';
    case NotesActionTypes.EditNoteSuccess:
      return 'note updated';
    default:
      return state;
  }
};

export default combineReducers({
  noteItems: noteItemsReducer,
  status: statusReducer,
});
