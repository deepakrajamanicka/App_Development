import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { createRoot } from 'react-dom/client';



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
  const [step, setStep] = useState(1); // To handle form step
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordError, setForgotPasswordError] = useState('');
  const [resetLinkSent, setResetLinkSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmitEmail = () => {
    if (email.trim() === '') {
      setErrorMessage('Email is required.');
      return;
    }
    setErrorMessage('');
    setStep(2); // Move to the password step
  };

  const handleSubmitPassword = async (event) => {
    event.preventDefault();

    // Validate password
    if (password.trim() === '') {
        setErrorMessage('Password is required.');
        return;
    }

    try {
        const response = await axios.post(
            "http://localhost:8080/api/v1/auth/authenticate",
            { email, password }
        );

        const { token } = response.data;

        // Decode the token to get user details
        const decodedToken = jwtDecode(token);
        console.log("Decoded Token:", decodedToken);
        const { role } = decodedToken;
        console.log("User Role:", role);

        // Save the token in session storage
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("tokenExpiration", Date.now() + 86400000);

        // Navigate based on role
        if (email === 'admin3@gmail.com') {
            setSnackbarMessage('Admin login successful!');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
            setTimeout(() => navigate('/AdminDashboard'), 1000);
        } else {
            setSnackbarMessage('Login successful!');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
            setTimeout(() => navigate('/StaffDashboard'), 1000);
        }
    } catch (error) {
        console.error("Error:", error);
        if (error.response) {
            if (error.response.status === 401) {
                setErrorMessage('Invalid email or password.');
            } else {
                setErrorMessage('An unexpected error occurred.');
            }
            setSnackbarMessage(error.response?.data?.message || 'An unexpected error occurred.');
            setSnackbarSeverity('error');
        } else {
            setErrorMessage('An unexpected error occurred.');
            setSnackbarMessage('An unexpected error occurred.');
            setSnackbarSeverity('error');
        }
        setOpenSnackbar(true);
    }
};

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
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

  const handleForgotPasswordSubmit = async () => {
    if (!validateEmail(forgotPasswordEmail)) {
      setForgotPasswordError('Please enter a valid email address.');
      return;
    }

    try {
      await axios.post(
        "http://localhost:8080/api/v1/auth/forgot-password",
        { email: forgotPasswordEmail }
      );
      setResetLinkSent(true);
      setForgotPasswordError('');
    } catch (error) {
      setForgotPasswordError('Failed to send reset link.');
    }
  };

  const theme = useTheme(); // Use the current theme

  return (
    <ThemeProvider theme={theme.palette.mode === 'dark' ? darkTheme : defaultTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Center the form horizontally
          justifyContent: 'center', // Center the form vertically
          height: '100vh',
          backgroundColor: theme.palette.background.default,
          backgroundSize: 'cover',
          p: 3,
        }}
      >
        <Grid
          container
          component="main"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Grid
            item
            xs={12}
            sm={8}
            md={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              p: 3,
              color: theme.palette.text.primary,
              width: '100%',
            }}
          >
            <Box
              sx={{
                width: '100%',
                maxWidth: 450,
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: 5,
                backgroundColor: theme.palette.background.paper,
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography variant="h5" component="h1" gutterBottom sx={{ mb: 2 }}>
                Heaven's Club Hospital
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                The key to happiness is to sign in.
              </Typography>

              {step === 1 && (
                <Box component="form" noValidate sx={{ width: '100%', mt: 3 }}>
             
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={handleEmailChange}
                    value={email}
                    InputLabelProps={{ style: { color: theme.palette.text.primary } }}
                    error={!!errorMessage}
                    helperText={errorMessage}
                    sx={{
                      mb: 2,
                      '& .MuiInputBase-input': {
                        fontSize: '16px',
                      },
                    }}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleSubmitEmail}
                    sx={{ mt: 2 }}
                  >
                    Next
                  </Button>
                </Box>
              )}
              {step === 2 && (
                <Box component="form" noValidate onSubmit={handleSubmitPassword} sx={{ width: '100%', mt: 3 }}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={handleEmailChange}
                    value={email}
                    InputLabelProps={{ style: { color: theme.palette.text.primary } }}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          sx={{ color: 'grey' }}
                          onClick={() => setEmail('')}
                        >
                          <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
                            Change
                          </Typography>
                        </IconButton>
                      ),
                    }}
                    sx={{
                      mb: 2,
                      '& .MuiInputBase-input': {
                        fontSize: '16px',
                      },
                    }}
                  />
                  <TextField
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    onChange={handlePasswordChange}
                    value={password}
                    InputLabelProps={{ style: { color: theme.palette.text.primary } }}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          sx={{ color: 'grey' }}
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      ),
                    }}
                    error={!!errorMessage}
                    helperText={errorMessage}
                    sx={{
                      mb: 2,
                      '& .MuiInputBase-input': {
                        fontSize: '16px',
                      },
                    }}
                  />
                  <Grid container justifyContent="center">
                    <Grid item>
                      <Typography
                        variant="body2"
                        color="primary"
                        align="center"
                        sx={{ cursor: 'pointer', textDecoration: 'underline', mb: 2 }}
                        onClick={handleForgotPasswordOpen}
                      >
                        Forgot Password?
                      </Typography>
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                  >
                    Log In
                  </Button>
                </Box>
              )}
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
              textAlign: 'center',
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
