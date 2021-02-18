import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import { Container } from '@material-ui/core';
import { User } from 'types/users';
import { Navigation } from '../components/Navigation';
import useGetUsers from '../hooks/useGetUsers';

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
  const [loggedUser, setLoggedUser] = useState<User>({
    username: 'TestUser',
    email: '',
    phoneNumber: '',
    firstName: '',
    lastName: '',
    description: '',
    avatarReference: '',
  });

  // TODO: Check TS script error with isLoading after merge
  // const { users, isLoading } = useGetUsers();
  const { users } = useGetUsers();

  useEffect(() => {
    const user = {
      username: 'TestUser',
      email: '',
      phoneNumber: '',
      firstName: 'Test',
      lastName: 'User',
      description: '',
      avatarReference:
        'https://secure.gravatar.com/avatar/9f1f9255ae409c09a725b269b586405a',
    };

    const getUser = () => {
      setLoggedUser(user);
    };
    getUser();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Navigation users={users} loggedUser={loggedUser} isLoading={false} />
      <Container>{children}</Container>
    </ThemeProvider>
  );
};

export default MainLayout;
