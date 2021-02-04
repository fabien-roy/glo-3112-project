import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Navigation } from 'components/Navigation';
import { BrowserRouter } from 'react-router-dom';
import { Router } from 'router/Router';
import { routes } from 'router/Config';

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Rock Salt', 'cursive'].join(','),
  },
});

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Navigation />
          <Router routes={routes} />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
