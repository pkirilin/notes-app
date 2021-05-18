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
import { formatNoteUpdateDate } from '../../__shared__/utils/date';
import { useTypedSelector } from '../../__shared__/hooks';

export type NotesListItemProps = {
  note: NoteListItem;
};

const NotesListItem: React.FC<NotesListItemProps> = ({
  note,
}: NotesListItemProps) => {
  const [deleteClicked, setDeleteClicked] = useState(false);
  const selectedNote = useTypedSelector(state => state.notes.selectedNote);
  const dispatch = useDispatch();

  const handleListItemClick = () => {
    dispatch(noteSelected(note));
  };

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setDeleteClicked(true);
  };

  const handleDeleteConfirmClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(deleteNoteRequest(note.id));
  };

  return (
    <ListItem
      selected={selectedNote?.id === note.id}
      onClick={handleListItemClick}
    >
      <FlexContainer align="center" spacing="lg">
        <FlexContainer flex={1} direction="column" spacing="md">
          <FlexContainer align="center" spacing="md">
            <Typography type="overline" color="hint">
              #{note.id}
            </Typography>
            <Typography type="caption" color="default">
              {formatNoteUpdateDate(new Date(note.updatedAt))}
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
