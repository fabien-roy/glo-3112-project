import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { Box, Container } from '@material-ui/core';
import { theme } from 'layouts/Theme';
import { Navigation } from '../components/Navigation';
import useGetLoggedUser from '../hooks/users/useGetLoggedUser';

export interface MainLayoutParams {
  children: any;
}

export const MainLayout = ({ children }: MainLayoutParams) => {
  const { loggedUser } = useGetLoggedUser();

  return (
    <ThemeProvider theme={theme}>
      {loggedUser && <Navigation loggedUser={loggedUser} />}
      <Container>
        {children}
        <Box height="calc(64px + 2vh)" />
      </Container>
    </ThemeProvider>
  );
};
export default MainLayout;
