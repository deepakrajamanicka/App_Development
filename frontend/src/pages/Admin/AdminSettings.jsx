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
  Grid,
  Select,
  MenuItem,
  FormHelperText,
  Modal,
  Tooltip,
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
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
  },
});

const Settings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState('en');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [errors, setErrors] = useState({});
  const [themeModalOpen, setThemeModalOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('light');
  const [previewTheme, setPreviewTheme] = useState('light');

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

  const handleToggleNotifications = (event) => {
    setNotificationsEnabled(event.target.checked);
  };

  const handleToggleTwoFactor = (event) => {
    setTwoFactorEnabled(event.target.checked);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleOpenThemeModal = () => setThemeModalOpen(true);
  const handleCloseThemeModal = () => setThemeModalOpen(false);

  const handleThemeChange = (theme) => {
    setPreviewTheme(theme);
  };

  const handleApplyTheme = () => {
    setSelectedTheme(previewTheme);
    handleCloseThemeModal();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" gutterBottom>
            Settings
          </Typography>

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
                    onChange={handleToggleNotifications}
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
                onChange={handleLanguageChange}
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
                    onChange={handleToggleTwoFactor}
                    color="primary"
                  />
                }
                label="Enable Two-Factor Authentication"
              />
            </FormControl>
          </Paper>

          {/* Theme Customization Modal */}
          <Modal
            open={themeModalOpen}
            onClose={handleCloseThemeModal}
            aria-labelledby="theme-customization-modal"
            aria-describedby="theme-customization-description"
          >
            <Box sx={{
              width: 400,
              bgcolor: 'background.paper',
              p: 4,
              borderRadius: 2,
              boxShadow: 24,
              mx: 'auto',
              my: '20vh'
            }}>
              <Typography variant="h6" gutterBottom>
                Customize Theme
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="theme-select">Select Theme</InputLabel>
                <Select
                  id="theme-select"
                  value={previewTheme}
                  onChange={(e) => handleThemeChange(e.target.value)}
                  label="Select Theme"
                >
                  <MenuItem value="light">Light</MenuItem>
                  <MenuItem value="dark">Dark</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                onClick={handleApplyTheme}
                sx={{ mt: 2 }}
              >
                Apply Theme
              </Button>
            </Box>
          </Modal>

          {/* Theme Customization Button */}
          <Tooltip title="Customize Theme">
            <Button
              variant="contained"
              color="secondary"
              onClick={handleOpenThemeModal}
              sx={{ mt: 2 }}
            >
              Customize Theme
            </Button>
          </Tooltip>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Settings;
