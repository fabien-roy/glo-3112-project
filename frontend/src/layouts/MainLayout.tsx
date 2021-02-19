import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import { Container } from '@material-ui/core';
import { User } from 'types/users';
import { Navigation } from '../components/Navigation';
import useGetUsers from '../hooks/useGetUsers';
import { getLoggedUser } from '../services/Authentication';

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
  const loadingStatus = typeof isLoading === 'boolean' ? isLoading : false;

  const user: User = getLoggedUser();

  return (
    <ThemeProvider theme={theme}>
      <Navigation users={users} loggedUser={user} isLoading={loadingStatus} />
      <Container>{children}</Container>
    </ThemeProvider>
  );
};

export default MainLayout;
