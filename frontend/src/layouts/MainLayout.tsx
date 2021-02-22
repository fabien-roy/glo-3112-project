import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import { Box, Container } from '@material-ui/core';
import { Navigation } from '../components/Navigation';
import useGetUsers from '../hooks/users/useGetUsers';
import SnackbarMessage from '../components/SnackbarMessage';

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
  const { users, loggedUser, isLoading, error } = useGetUsers();

  const errorMessage = error ? (
    <SnackbarMessage severity="error" description="Could not fetch users" />
  ) : null;

  return (
    <ThemeProvider theme={theme}>
      <Navigation users={users} loggedUser={loggedUser} isLoading={isLoading} />
      <Container>
        {children}
        {errorMessage}
        <Box height="calc(64px + 2vh)" />
      </Container>
    </ThemeProvider>
  );
};

export default MainLayout;
