import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import { Container } from '@material-ui/core';
import { Navigation } from '../components/Navigation';

export interface MainLayoutParams {
  children: any;
}

const theme = createMuiTheme({
  palette: {
    primary: purple,
  },
  typography: {
    fontFamily: ['Noto+Sans', 'sans-serif'].join(','),
  },
});

export const MainLayout = ({ children }: MainLayoutParams) => {
  return (
    <ThemeProvider theme={theme}>
      <Navigation />
      <Container>{children}</Container>
    </ThemeProvider>
  );
};

export default MainLayout;
