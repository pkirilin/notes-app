import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, ListItem } from '../../__shared__/components';
import { deleteNoteRequest, noteSelected } from '../actions';
import { NoteListItem } from '../models/NoteListItem';

export type NotesListItemProps = {
  note: NoteListItem;
};

const NotesListItem: React.FC<NotesListItemProps> = ({
  note,
}: NotesListItemProps) => {
  const dispatch = useDispatch();

  const handleListItemClick = () => {
    dispatch(noteSelected(note));
  };

  const handleDeleteListItemClick = () => {
    dispatch(deleteNoteRequest(note.id));
  };

  return (
    <React.Fragment key={note.id}>
      <ListItem onClick={handleListItemClick}>
        <div>{note.text}</div>
        <div>{note.createdAt}</div>
        <div>{note.updatedAt}</div>
      </ListItem>
      <Button role="deletion" onClick={handleDeleteListItemClick}>
        Delete
      </Button>
    </React.Fragment>
  );
};

export default NotesListItem;
