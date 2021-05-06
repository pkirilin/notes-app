import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { List } from '../../__shared__/components';
import { useTypedSelector } from '../../__shared__/hooks';
import { getNotesRequest } from '../actions';
import NotesListItem from './NotesListItem';

const NotesList: React.FC = () => {
  const notes = useTypedSelector(state => state.notes.noteItems);
  const status = useTypedSelector(state => state.notes.status);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotesRequest());
  }, [dispatch]);

  if (status === 'error') {
    return <p>Failed to get notes</p>;
  }

  if (notes.length === 0) {
    return <p>You have not any notes yet</p>;
  }

  return (
    <List>
      {notes.map(note => (
        <NotesListItem key={note.id} note={note}></NotesListItem>
      ))}
    </List>
  );
};

export default NotesList;
