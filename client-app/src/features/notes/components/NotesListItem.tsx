import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  FlexContainer,
  IconButton,
  ListItem,
  Typography,
} from '../../__shared__/components';
import { deleteNoteRequest, noteSelected } from '../actions';
import { NoteListItem } from '../models/NoteListItem';
import { Delete, DeleteForever } from '@styled-icons/material';

export type NotesListItemProps = {
  note: NoteListItem;
};

const NotesListItem: React.FC<NotesListItemProps> = ({
  note,
}: NotesListItemProps) => {
  const [deleteClicked, setDeleteClicked] = useState(false);
  const dispatch = useDispatch();

  const handleListItemClick = () => {
    dispatch(noteSelected(note));
  };

  const handleDeleteClick = () => {
    setDeleteClicked(true);
  };

  const handleDeleteConfirmClick = () => {
    dispatch(deleteNoteRequest(note.id));
  };

  return (
    <ListItem onClick={handleListItemClick}>
      <FlexContainer align="center" spacing="lg">
        <FlexContainer grow={1} direction="column" spacing="md">
          <FlexContainer align="center" spacing="md">
            <Typography type="overline" color="hint">
              #{note.id}
            </Typography>
            <Typography type="caption" color="default">
              Updated {note.updatedAt}
            </Typography>
          </FlexContainer>
          <Typography maxLines={3}>{note.text}</Typography>
        </FlexContainer>
        {deleteClicked ? (
          <IconButton role="deletion" onClick={handleDeleteConfirmClick}>
            <DeleteForever
              size="24"
              title="Confirm delete note"
            ></DeleteForever>
          </IconButton>
        ) : (
          <IconButton role="deletion" onClick={handleDeleteClick}>
            <Delete size="24" title="Delete note"></Delete>
          </IconButton>
        )}
      </FlexContainer>
    </ListItem>
  );
};

export default NotesListItem;
