import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Navigation } from './components/Navigation';

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Rock Salt', 'cursive'].join(','),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Navigation />
      </div>
    </ThemeProvider>
  );
}

export default App;
