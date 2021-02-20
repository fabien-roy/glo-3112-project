import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import { Container } from '@material-ui/core';
import { Navigation } from '../components/Navigation';
import useGetUsers from '../hooks/users/useGetUsers';
import { getLoggedUser, setLoggedUser } from '../services/Authentication';
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
  const { users, isLoading, error } = useGetUsers();

  if (users[0]) setLoggedUser(users[0]);

  const errorMessage = error ? (
    <SnackbarMessage severity="error" description="Could not fetch users" />
  ) : null;

  return (
    <ThemeProvider theme={theme}>
      <Navigation
        users={users}
        loggedUser={getLoggedUser()}
        isLoading={isLoading}
      />
      <Container>
        {children}
        {errorMessage}
      </Container>
    </ThemeProvider>
  );
};

export default MainLayout;
