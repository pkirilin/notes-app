import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '../../../app/components';
import { logout } from '../../auth/actions';
import { Title } from '../../__shared__/components';
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
      <NoteCreateEditForm></NoteCreateEditForm>
      <NotesList></NotesList>
    </React.Fragment>
  );
};

export default NotesPage;
