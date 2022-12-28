import React from 'react';
import MyThemeProvider from '../src/styles/MyThemeProvider';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <MyThemeProvider>
      <Story />
      <div id="modal"></div>
    </MyThemeProvider>
  ),
];
