import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { createBrowserHistory, History } from 'history';
import theme from '../theme';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { AnyAction, Store } from 'redux';
import { createTestStore } from './testStore';

export interface RenderConnectedResult extends RenderResult {
  store: Store;
  history: History;
}

export function renderConnected(ui: React.ReactElement, actions: AnyAction[] = []): RenderConnectedResult {
  const store = createTestStore(actions);
  const history = createBrowserHistory();

  return {
    ...render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router history={history}>{ui}</Router>
        </ThemeProvider>
      </Provider>,
    ),
    store,
    history,
  };
}
