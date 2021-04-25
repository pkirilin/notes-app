import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { List, ListItem } from '../../__shared__/components';
import { useTypedSelector } from '../../__shared__/hooks';
import { notesRequested } from '../actions';

const NotesList: React.FC = () => {
  const notes = useTypedSelector(state => state.notes.noteItems);
  const status = useTypedSelector(state => state.notes.status);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(notesRequested());
  }, [dispatch]);

  if (status === 'error') {
    return <p>Failed to get notes</p>;
  }

  if (notes.length === 0) {
    return <p>You have not any notes yet</p>;
  }

  return (
    <List>
      {notes.map(({ id, text }) => (
        <ListItem key={id}>{text}</ListItem>
      ))}
    </List>
  );
};

export default NotesList;
