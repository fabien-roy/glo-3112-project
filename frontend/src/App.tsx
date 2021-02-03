import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Navigation } from 'components/Navigation';
import { Router } from 'router/Router';
import { routes } from 'router/Config';

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Rock Salt', 'cursive'].join(','),
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Navigation />
        <Router routes={routes} />
      </div>
    </ThemeProvider>
  );
};

export default App;
