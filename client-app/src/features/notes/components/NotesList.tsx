import React, { useEffect } from 'react';
import { List, ListItem } from 'features/__shared__/components';
import { useDispatch } from 'react-redux';
import { notesRequested } from '../actions';
import { useTypedSelector } from 'app/hooks';

const NotesList: React.FC = () => {
  const notes = useTypedSelector(state => state.notes.noteItems);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(notesRequested());
  }, [dispatch]);

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
