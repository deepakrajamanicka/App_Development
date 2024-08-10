import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
  Button,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormHelperText,
  TextField
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Custom theme for styling
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const ProfileSettings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState('en');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [otp, setOtp] = useState('');
  const [isMobileVerified, setIsMobileVerified] = useState(false);
  const [isGmailLinked, setIsGmailLinked] = useState(false);
  const [errors, setErrors] = useState({});

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleChangePassword = () => {
    let hasErrors = false;
    const newErrors = {};
    if (!currentPassword) {
      newErrors.currentPassword = 'Current password is required';
      hasErrors = true;
    }
    if (!newPassword) {
      newErrors.newPassword = 'New password is required';
      hasErrors = true;
    }
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      hasErrors = true;
    }
    if (hasErrors) {
      setErrors(newErrors);
      return;
    }
    // Handle password change logic
    alert('Password changed successfully!');
  };

  const handleOtpVerification = () => {
    if (otp === '123456') {
      setIsMobileVerified(true);
      console.log('Mobile Number Verified');
    } else {
      console.log('Invalid OTP');
    }
  };

  const formatMobileNumber = (number) => {
    if (number.length < 4) return number;
    return '*'.repeat(number.length - 4) + number.slice(-4);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" gutterBottom>
            Settings
          </Typography>

          {/* Verify Mobile Number Section */}
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Verify Your Mobile Number
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <FormControl fullWidth margin="normal">
              <InputLabel>Mobile Number</InputLabel>
              <Select value="+91">
                <MenuItem value="+91">+91</MenuItem>
                {/* Add more country codes as needed */}
              </Select>
            </FormControl>
            <Typography variant="body1">
              Mobile Number: {formatMobileNumber('+91 7092382751')}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Verification Status: {isMobileVerified ? 'Verified' : 'Not Verified'}
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              label="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleOtpVerification}>
              Verify OTP
            </Button>
          </Paper>

          {/* Change Password Section */}
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Change Password
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel htmlFor="current-password">Current Password</InputLabel>
              <OutlinedInput
                id="current-password"
                type={showPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Current Password"
                error={Boolean(errors.currentPassword)}
              />
              <FormHelperText error={Boolean(errors.currentPassword)}>
                {errors.currentPassword}
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel htmlFor="new-password">New Password</InputLabel>
              <OutlinedInput
                id="new-password"
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="New Password"
                error={Boolean(errors.newPassword)}
              />
              <FormHelperText error={Boolean(errors.newPassword)}>
                {errors.newPassword}
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
              <OutlinedInput
                id="confirm-password"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
                error={Boolean(errors.confirmPassword)}
              />
              <FormHelperText error={Boolean(errors.confirmPassword)}>
                {errors.confirmPassword}
              </FormHelperText>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              onClick={handleChangePassword}
              sx={{ mt: 2 }}
            >
              Change Password
            </Button>
          </Paper>

          {/* Notifications Section */}
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Notifications
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <FormControl fullWidth margin="normal">
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationsEnabled}
                    onChange={(e) => setNotificationsEnabled(e.target.checked)}
                    color="primary"
                  />
                }
                label="Enable Notifications"
              />
            </FormControl>
          </Paper>

          {/* Language Preferences Section */}
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Language Preferences
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel htmlFor="language-select">Select Language</InputLabel>
              <Select
                id="language-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                label="Select Language"
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="es">Spanish</MenuItem>
                <MenuItem value="fr">French</MenuItem>
                <MenuItem value="de">German</MenuItem>
                {/* Add more languages as needed */}
              </Select>
            </FormControl>
          </Paper>

          {/* Two-Factor Authentication Section */}
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Two-Factor Authentication (2FA)
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <FormControl fullWidth margin="normal">
              <FormControlLabel
                control={
                  <Switch
                    checked={twoFactorEnabled}
                    onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                    color="primary"
                  />
                }
                label="Enable Two-Factor Authentication"
              />
            </FormControl>
          </Paper>

          {/* Linked Gmail Account Section */}
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Linked Gmail Account
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsGmailLinked(!isGmailLinked)}
            >
              {isGmailLinked ? 'Unlink Gmail Account' : 'Link Gmail Account'}
            </Button>
            {isGmailLinked && (
              <Typography variant="body1" color="green" sx={{ mt: 2 }}>
                Gmail account linked successfully
              </Typography>
            )}
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ProfileSettings;
