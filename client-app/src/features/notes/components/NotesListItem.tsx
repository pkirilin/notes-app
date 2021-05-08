import React from 'react';
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
  const dispatch = useDispatch();

  const handleListItemClick = () => {
    dispatch(noteSelected(note));
  };

  const handleDeleteListItemClick = () => {
    dispatch(deleteNoteRequest(note.id));
  };

  return (
    <ListItem onClick={handleListItemClick}>
      <FlexContainer align="center" spacing="lg">
        <FlexContainer grow={1} direction="column" spacing="md">
          <Typography type="caption" color="default">
            Updated {note.updatedAt}
          </Typography>
          <Typography>{note.text}</Typography>
        </FlexContainer>
        <FlexContainer>
          <IconButton role="deletion" onClick={handleDeleteListItemClick}>
            <Delete size="24" title="Delete note"></Delete>
          </IconButton>
          {/* TODO: implement confirm */}
          {false && (
            <IconButton role="deletion">
              <DeleteForever
                size="24"
                title="Confirm delete note"
              ></DeleteForever>
            </IconButton>
          )}
        </FlexContainer>
      </FlexContainer>
    </ListItem>
  );
};

export default NotesListItem;
