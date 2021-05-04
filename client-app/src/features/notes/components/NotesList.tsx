import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, List, ListItem } from '../../__shared__/components';
import { useTypedSelector } from '../../__shared__/hooks';
import { deleteNoteRequest, getNotesRequest, noteSelected } from '../actions';
import { NoteListItem } from '../models/NoteListItem';

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

  const handleListItemClick = (note: NoteListItem) => {
    dispatch(noteSelected(note));
  };

  if (status === 'error') {
    return <p>Failed to get notes</p>;
  }

  if (notes.length === 0) {
    return <p>You have not any notes yet</p>;
  }

  return (
    <List>
      {notes.map(note => (
        <React.Fragment key={note.id}>
          <ListItem onClick={handleListItemClick.bind(this, note)}>
            <div>{note.text}</div>
            <div>{note.createdAt}</div>
            <div>{note.updatedAt}</div>
          </ListItem>
          <Button
            role="deletion"
            onClick={handleDeleteClick.bind(this, note.id)}
          >
            Delete
          </Button>
        </React.Fragment>
      ))}
    </List>
  );
};

export default NotesList;
