import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import { Container } from '@material-ui/core';
import { Navigation } from '../components/Navigation';
import useGetUsers from '../hooks/users/useGetUsers';
import { getLoggedUser, setLoggedUser } from '../services/Authentication';

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
  const { users, isLoading } = useGetUsers();

  if (users[0]) setLoggedUser(users[0]);

  return (
    <ThemeProvider theme={theme}>
      <Navigation
        users={users}
        loggedUser={getLoggedUser()}
        isLoading={isLoading}
      />
      <Container>{children}</Container>
    </ThemeProvider>
  );
};

export default MainLayout;
