import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from 'app/components';
import { logout } from 'features/auth/actions';
import { useTypedSelector } from 'app/hooks';
import NotesList from './NotesList';
import { Title } from 'features/__shared__/components';

const NotesPage: React.FC = () => {
  const user = useTypedSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.push('/login');
    }
  }, [history, user]);

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
      <NotesList></NotesList>
    </React.Fragment>
  );
};

export default NotesPage;
