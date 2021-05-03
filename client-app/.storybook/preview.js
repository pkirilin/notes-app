import React from 'react';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from 'styled-components';
import theme from '../src/theme';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  ),
  (Story) => (
    <Router history={createBrowserHistory()}>
      <Story></Story>
    </Router>
  )
];
