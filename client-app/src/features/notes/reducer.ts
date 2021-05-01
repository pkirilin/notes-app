import { combineReducers, Reducer } from 'redux';
import { NotesActions, NotesActionTypes } from './actions';
import { NoteListItem } from './models/NoteListItem';
import { NotesStatus } from './state';

const noteItemsReducer: Reducer<NoteListItem[], NotesActions> = (
  state = [],
  action,
) => {
  switch (action.type) {
    case NotesActionTypes.NotesReceived:
      return action.payload;
    case NotesActionTypes.CreateNoteSuccess:
      return [action.payload, ...state];
    default:
      return state;
  }
};

const statusReducer: Reducer<NotesStatus | null, NotesActions> = (
  state = null,
  action,
) => {
  switch (action.type) {
    case NotesActionTypes.NotesRejected:
      return 'error';
    case NotesActionTypes.CreateNoteSuccess:
      return 'note created';
    default:
      return state;
  }
};

export default combineReducers({
  noteItems: noteItemsReducer,
  status: statusReducer,
});
