import React from 'react';
import {
  render as rtlRender,
  RenderResult as RtlRenderResult,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import { RootState } from '../store';
import { ThemeProvider } from 'styled-components';
import theme from 'theme';

const mockStore = configureStore<RootState>();

export interface RenderResult extends RtlRenderResult {
  store: MockStoreEnhanced<RootState>;
}

export function render(
  ui: React.ReactElement,
  initialState?: RootState,
): RenderResult {
  const store = mockStore(initialState);
  const renderResult = rtlRender(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>{ui}</Router>
      </ThemeProvider>
    </Provider>,
  );

  return {
    ...renderResult,
    store,
  };
}
