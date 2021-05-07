import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../auth/actions';
import { Button, FlexContainer, Typography } from '../../__shared__/components';
import { useTypedSelector } from '../../__shared__/hooks';
import { noteSelectionCancelled } from '../actions';
import NoteCreateEditForm from './NoteCreateEditForm';
import NotesList from './NotesList';

const NotesPage: React.FC = () => {
  const user = useTypedSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.push('/login');
    }
  }, [history, user]);

  const handleAddNoteClick = () => {
    dispatch(noteSelectionCancelled());
  };

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <FlexContainer direction="column" spacing="lg">
      <FlexContainer
        justify="space-between"
        alignBreakpoints={{ xs: 'flex-start', sm: 'center' }}
        spacing="lg"
        directionBreakpoints={{ xs: 'column-reverse', sm: 'row' }}
      >
        <Typography type="title">Notes</Typography>
        <FlexContainer align="center" spacing="lg">
          <Typography>
            Logged in as <b>{user?.userName}</b>
          </Typography>
          <Button onClick={handleLogoutClick}>Logout</Button>
        </FlexContainer>
      </FlexContainer>
      <FlexContainer
        spacing="lg"
        directionBreakpoints={{ xs: 'column-reverse', sm: 'row' }}
      >
        <FlexContainer growBreakpoints={{ sm: 1, md: 1, lg: 1 }}>
          {/* TODO: move to list */}
          {false && <Button onClick={handleAddNoteClick}>Add note</Button>}
          <NotesList></NotesList>
        </FlexContainer>
        <FlexContainer growBreakpoints={{ sm: 1, md: 1.5, lg: 2 }}>
          <NoteCreateEditForm></NoteCreateEditForm>
        </FlexContainer>
      </FlexContainer>
    </FlexContainer>
  );
};

export default NotesPage;
