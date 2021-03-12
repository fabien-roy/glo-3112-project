import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { Box, Container } from '@material-ui/core';
import { theme } from 'layouts/Theme';

export interface AuthentificationLayoutParams {
  children: any;
}

export const AuthentificationLayout = ({
  children,
}: AuthentificationLayoutParams) => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        {children}
        <Box height="calc(64px + 2vh)" />
      </Container>
    </ThemeProvider>
  );
};
export default AuthentificationLayout;
