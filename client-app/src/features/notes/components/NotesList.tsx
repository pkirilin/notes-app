import { Add, ExpandMore, Sync } from '@styled-icons/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  FlexContainer,
  IconButton,
  List,
  ListItem,
  Typography,
} from '../../__shared__/components';
import { useTypedSelector } from '../../__shared__/hooks';
import { draft, getNotesRequest, loadMoreRequest } from '../actions';
import DraftedNoteItem from './DraftedNoteItem';
import NotesListItem from './NotesListItem';

const ListItemAddNote = styled(ListItem)`
  margin-bottom: ${props => props.theme.sizing.md};
`;

const EmptyNotesPlaceholder = styled.div`
  margin-top: ${props => props.theme.sizing.lg};
`;

const LoadMoreNotesContainer = styled(FlexContainer)`
  margin-top: ${props => props.theme.sizing.md};
`;

const NotesListLoader = styled(Sync)`
  color: ${props => props.theme.colors.text.hint};
  animation: spin 2s linear infinite;
`;

const NotesList: React.FC = () => {
  const notes = useTypedSelector(state => state.notes.noteItems);
  const notesStatus = useTypedSelector(state => state.notes.status);
  const showMoreVisible = useTypedSelector(
    state => state.notes.showMoreVisible,
  );
  const draftedNote = useTypedSelector(state => state.notes.draftedNote);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotesRequest());
  }, [dispatch]);

  useEffect(() => {
    if (currentPageIndex > 0) {
      dispatch(loadMoreRequest(currentPageIndex));
    }
  }, [currentPageIndex]);

  const handleAddNoteClick = () => {
    if (!draftedNote) {
      dispatch(draft());
    }
  };

  const handleLoadMoreClick = () => {
    setCurrentPageIndex(pageIndex => pageIndex + 1);
  };

  if (notesStatus === 'loading') {
    return (
      <FlexContainer justify="center" align="center" spacing="md">
        <NotesListLoader size="32"></NotesListLoader>
        <Typography type="body2" color="hint" align="center">
          Loading notes...
        </Typography>
      </FlexContainer>
    );
  }

  if (notesStatus === 'error') {
    return (
      <Typography type="body2" color="default" align="center">
        Failed to get notes
      </Typography>
    );
  }

  return (
    <List>
      <ListItemAddNote role="add" onClick={handleAddNoteClick}>
        <FlexContainer justify="center" align="center" spacing="md">
          <Typography color="hint">
            <Add size="24"></Add>
          </Typography>
          <Typography color="hint">New note</Typography>
        </FlexContainer>
      </ListItemAddNote>
      <DraftedNoteItem></DraftedNoteItem>
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
      {showMoreVisible && (
        <LoadMoreNotesContainer justify="center">
          <IconButton onClick={handleLoadMoreClick}>
            <ExpandMore size="24" title="Load more notes"></ExpandMore>
          </IconButton>
        </LoadMoreNotesContainer>
      )}
    </List>
  );
};

export default NotesList;
