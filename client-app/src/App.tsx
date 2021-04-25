import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { LoginInput, RegisterInput } from './features/auth/components';
import { NotesPage } from './features/notes/components';
import { useTypedSelector } from './features/__shared__/hooks';

const App: React.FC = () => {
  const isAuthorized = useTypedSelector(state => !!state.auth.user);

  return (
    <Router>
      <Switch>
        {isAuthorized ? (
          <React.Fragment>
            <Route exact path="/notes">
              <NotesPage></NotesPage>
            </Route>
            <Redirect to="/notes"></Redirect>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Route exact path="/login">
              <LoginInput></LoginInput>
            </Route>
            <Route exact path="/register">
              <RegisterInput></RegisterInput>
            </Route>
            <Redirect to="/login"></Redirect>
          </React.Fragment>
        )}
      </Switch>
    </Router>
  );
};

export default App;
