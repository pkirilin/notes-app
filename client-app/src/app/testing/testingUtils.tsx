import React from 'react';
import {
  render as rtlRender,
  RenderResult as RtlRenderResult,
} from '@testing-library/react';
import { AnyAction, Store } from 'redux';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { Router } from 'react-router-dom';
import { createBrowserHistory, History } from 'history';
import { ThemeProvider } from 'styled-components';
import theme from 'theme';
import { RootState } from '../store';

const mockStore = configureStore<RootState>();

export interface RenderResult extends RtlRenderResult {
  store: MockStoreEnhanced<RootState>;
  history: History;
  rerenderWithStateChange: (
    ui: React.ReactElement,
    newState: RootState,
  ) => void;
}

export const testInitialState: RootState = {
  auth: {
    user: null,
    registrationResult: { status: 'initial' },
  },
  counter: 0,
  notes: {
    noteItems: [],
  },
};

export function render(
  ui: React.ReactElement,
  initialState = testInitialState,
): RenderResult {
  const store = mockStore(initialState);
  const history = createBrowserHistory();
  let renderResult = doRender(ui, store);

  function doRender(
    ui: React.ReactElement,
    store: Store<RootState, AnyAction>,
  ): RtlRenderResult {
    return rtlRender(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router history={history}>{ui}</Router>
        </ThemeProvider>
      </Provider>,
    );
  }

  function rerenderWithStateChange(
    ui: React.ReactElement,
    newState: RootState,
  ): void {
    const newStore = mockStore(newState);
    renderResult = doRender(ui, newStore);
  }

  return {
    ...renderResult,
    store,
    history,
    rerenderWithStateChange,
  };
}
