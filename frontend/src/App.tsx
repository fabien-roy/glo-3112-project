import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';
import { Navigation } from './components/Navigation';

const theme = createMuiTheme({
  palette: {
    primary: purple,
  },
  typography: {
    fontFamily: ['Noto+Sans', 'sans-serif'].join(','),
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
