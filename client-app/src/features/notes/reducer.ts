import { NotesActions, NotesActionTypes } from './actions';
import { NotesState } from './state';

const initialState: NotesState = {
  noteItems: [],
};

export default function (
  state = initialState,
  action: NotesActions,
): NotesState {
  switch (action.type) {
    case NotesActionTypes.NotesRequested:
      return state;
    case NotesActionTypes.NotesReceived:
      return {
        noteItems: action.payload,
      };
    case NotesActionTypes.NotesRejected:
      return {
        ...state,
        status: 'error',
      };
    default:
      return state;
  }
}
