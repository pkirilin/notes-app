import { Add } from '@styled-icons/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  FlexContainer,
  List,
  ListItem,
  Typography,
} from '../../__shared__/components';
import { useTypedSelector } from '../../__shared__/hooks';
import { getNotesRequest, noteSelectionCancelled } from '../actions';
import NotesListItem from './NotesListItem';

const ListItemAddNote = styled(ListItem)`
  margin-bottom: ${props => props.theme.sizing.md};
`;

const EmptyNotesPlaceholder = styled.div`
  margin-top: ${props => props.theme.sizing.lg};
`;

const NotesList: React.FC = () => {
  const notes = useTypedSelector(state => state.notes.noteItems);
  const status = useTypedSelector(state => state.notes.status);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotesRequest());
  }, [dispatch]);

  const handleAddNoteClick = () => {
    dispatch(noteSelectionCancelled());
  };

  if (status === 'error') {
    return (
      <Typography type="body2" color="default" align="center">
        Failed to get notes
      </Typography>
    );
  }

  return (
    <List>
      <ListItemAddNote onClick={handleAddNoteClick}>
        <FlexContainer justify="center" align="center" spacing="md">
          <Typography color="hint">
            <Add size="24"></Add>
          </Typography>
          <Typography color="hint">New note</Typography>
        </FlexContainer>
      </ListItemAddNote>
      {notes.length > 0 ? (
        notes.map(note => (
          <NotesListItem key={note.id} note={note}></NotesListItem>
        ))
      ) : (
        <EmptyNotesPlaceholder>
          <Typography type="body2" color="default" align="center">
            You have not any notes yet
          </Typography>
        </EmptyNotesPlaceholder>
      )}
    </List>
  );
};

export default NotesList;
