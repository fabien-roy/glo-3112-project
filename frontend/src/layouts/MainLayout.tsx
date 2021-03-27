import React, { useContext } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { Box, Container } from '@material-ui/core';
import { theme } from 'layouts/Theme';
import { UserContext } from 'context/userContext';
import { Navigation } from '../components/Navigation';
import { NotificationEvent } from '../types/notifications';

export interface MainLayoutParams {
  children: any;
  notifications: NotificationEvent[];
}

export const MainLayout = ({ children, notifications }: MainLayoutParams) => {
  const { currentUser } = useContext(UserContext);

  return (
    <ThemeProvider theme={theme}>
      {currentUser && (
        <Navigation loggedUser={currentUser} notifications={notifications} />
      )}
      <Container>
        {children}
        <Box height="calc(64px + 2vh)" />
      </Container>
    </ThemeProvider>
  );
};
export default MainLayout;
