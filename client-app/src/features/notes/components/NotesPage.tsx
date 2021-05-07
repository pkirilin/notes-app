import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../auth/actions';
import { Button, FlexContainer, Title } from '../../__shared__/components';
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

  return (
    <React.Fragment>
      <h1>Hello, {user?.userName}</h1>
      <Button
        onClick={() => {
          dispatch(logout());
        }}
      >
        Logout
      </Button>
      <Title>Notes</Title>
      <Button onClick={handleAddNoteClick}>Add note</Button>
      <FlexContainer
        spacing="lg"
        directionBreakpoints={{ xs: 'column-reverse', sm: 'row' }}
      >
        <FlexContainer growBreakpoints={{ sm: 1, md: 1, lg: 1 }}>
          <NotesList></NotesList>
        </FlexContainer>
        <FlexContainer growBreakpoints={{ sm: 1, md: 1.5, lg: 2 }}>
          <NoteCreateEditForm></NoteCreateEditForm>
        </FlexContainer>
      </FlexContainer>
    </React.Fragment>
  );
};

export default NotesPage;
