import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../../../app/components';
import { List, ListItem } from '../../__shared__/components';
import { useTypedSelector } from '../../__shared__/hooks';
import { deleteNoteRequest, getNotesRequest } from '../actions';

const NotesList: React.FC = () => {
  const notes = useTypedSelector(state => state.notes.noteItems);
  const status = useTypedSelector(state => state.notes.status);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotesRequest());
  }, [dispatch]);

  const handleDeleteClick = (noteId: number) => {
    dispatch(deleteNoteRequest(noteId));
  };

  if (status === 'error') {
    return <p>Failed to get notes</p>;
  }

  if (notes.length === 0) {
    return <p>You have not any notes yet</p>;
  }

  return (
    <List>
      {notes.map(({ id, text }) => (
        <React.Fragment key={id}>
          <ListItem>{text}</ListItem>
          <Button role="deletion" onClick={handleDeleteClick.bind(this, id)}>
            Delete
          </Button>
        </React.Fragment>
      ))}
    </List>
  );
};

export default NotesList;
