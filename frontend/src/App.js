import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppContent from './AppContent'; // Ensure the import path is correct

const App = () => {
  const [mode, setMode] = useState('light');

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
      background: {
        default: mode === 'light' ? '#f5f5f5' : '#121212',
        paper: mode === 'light' ? '#ffffff' : '#1D1D1D',
      },
      text: {
        primary: mode === 'light' ? '#000000' : '#FFFFFF',
      },
    },
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppContent mode={mode} toggleColorMode={toggleColorMode} />
      </Router>
    </ThemeProvider>
  );
};

export default App;
