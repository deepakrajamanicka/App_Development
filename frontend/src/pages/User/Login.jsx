import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';

// Define themes
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1D1D1D',
    },
    text: {
      primary: '#FFFFFF',
    },
  },
});
const defaultTheme = createTheme(); // Default light theme

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordError, setForgotPasswordError] = useState('');
  const [resetLinkSent, setResetLinkSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = formData;
  
    // Validation logic
    if (email === '' || password === '') {
      setErrorMessage('All fields are required.');
      return;
    }
  
    const savedData = JSON.parse(localStorage.getItem('userData'));
    if (email === 'admin@gmail.com' && password === 'adminpassword') {
      setErrorMessage('');
      setSnackbarMessage('Admin login successful!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
  
      setTimeout(() => {
        navigate('/AdminDashboard'); 
      }, 1000);
    } else if (savedData && savedData.email === email && savedData.password === password) {
      setErrorMessage('');
      setSnackbarMessage('Login successful!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
  
      setTimeout(() => {
        navigate('/StaffDashboard'); 
      }, 1000);
    } else {
      setErrorMessage('Invalid email or password.');
    }
  };
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleForgotPasswordOpen = () => {
    setForgotPasswordOpen(true);
    setForgotPasswordError('');
    setResetLinkSent(false);
  };

  const handleForgotPasswordClose = () => {
    setForgotPasswordOpen(false);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleForgotPasswordSubmit = () => {
    if (!validateEmail(forgotPasswordEmail)) {
      setForgotPasswordError('Please enter a valid email address.');
      return;
    }

    // Simulate sending the reset link
    setResetLinkSent(true);
    setForgotPasswordError('');
  };

  const theme = useTheme(); // Use the current theme

  return (
    <ThemeProvider theme={theme.palette.mode === 'dark' ? darkTheme : defaultTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          height: '100vh',
          backgroundColor: theme.palette.background.default,
          backgroundSize: 'cover',
        }}
      >
        <Grid
          container
          component="main"
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <Grid
            item
            xs={12}
            sm={7}
            md={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              p: 2,
              color: theme.palette.text.primary,
              textAlign: 'left',
              zIndex: 1,
              pl: 10,
              pr: 8,
              mt: 32,
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                color: theme.palette.text.primary,
              }}
            >
              Welcome Back
            </Typography>
            <Typography variant="h6" component="p" sx={{ lineHeight: '1.5', maxWidth: '100%' }}>
              Efficiently manage your staff with our comprehensive scheduling system.
              Increase productivity and streamline operations with ease.
              Customize shifts, manage availability, and improve communication.
              Join hundreds of businesses who trust our solution.
              Start simplifying your scheduling today!
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={6}
            md={6}
            component={Box}
            elevation={6}
            square
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              ml: 'auto',
              mr: 'auto',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <Box
              sx={{
                width: '100%',
                maxWidth: 400,
                py: 4,
                px: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
                backgroundColor: theme.palette.background.paper, // Use theme color
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)',
                position: 'relative',
                color: theme.palette.text.primary,
                top: 40,
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Log In
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={handleChange}
                      InputLabelProps={{ style: { color: theme.palette.text.primary } }}
                      InputProps={{ style: { color: theme.palette.text.primary } }}
                      error={!!errorMessage}
                      helperText={errorMessage}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={handleChange}
                      InputLabelProps={{ style: { color: theme.palette.text.primary } }}
                      InputProps={{ style: { color: theme.palette.text.primary } }}
                      error={!!errorMessage}
                      helperText={errorMessage}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="success"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Log In
                </Button>
                <Grid container justifyContent="center">
                  <Grid item>
                    <Typography
                      variant="body2"
                      color="primary"
                      align="center"
                      sx={{ cursor: 'pointer', textDecoration: 'underline', mb: 0.5 }}
                      onClick={handleForgotPasswordOpen}
                    >
                      Forgot Password?
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container justifyContent="center">
                  <Grid item>
                    <Link href="/Signup" variant="body2">
                      {"Don't have an account? Sign up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          sx={{
            position: 'fixed',
            top: 20,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
        <Modal
          open={forgotPasswordOpen}
          onClose={handleForgotPasswordClose}
          aria-labelledby="forgot-password-modal"
          aria-describedby="forgot-password-modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" component="h2" gutterBottom>
              Forgot Password
            </Typography>
            <TextField
              fullWidth
              id="forgot-password-email"
              label="Email Address"
              value={forgotPasswordEmail}
              onChange={(e) => setForgotPasswordEmail(e.target.value)}
              margin="normal"
              InputLabelProps={{ style: { color: theme.palette.text.primary } }}
              InputProps={{ style: { color: theme.palette.text.primary } }}
              error={!!forgotPasswordError}
              helperText={forgotPasswordError}
            />
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleForgotPasswordSubmit}
                sx={{ mr: 1 }}
              >
                Submit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleForgotPasswordClose}
              >
                Cancel
              </Button>
            </Box>
            {resetLinkSent && (
              <Typography variant="body2" color="success.main" sx={{ mt: 2 }}>
                A password reset link has been sent to your email.
              </Typography>
            )}
            <IconButton
              onClick={handleForgotPasswordClose}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Modal>
      </Box>
    </ThemeProvider>
  );
}
