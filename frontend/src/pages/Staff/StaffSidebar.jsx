    import React from 'react';
    import Box from '@mui/material/Box';
    import Drawer from '@mui/material/Drawer';
    import List from '@mui/material/List';
    import Divider from '@mui/material/Divider';
    import ListItem from '@mui/material/ListItem';
    import ListItemButton from '@mui/material/ListItemButton';
    import ListItemIcon from '@mui/material/ListItemIcon';
    import ListItemText from '@mui/material/ListItemText';
    import AccountCircleIcon from '@mui/icons-material/AccountCircle';
    import Brightness4Icon from '@mui/icons-material/Brightness4';
    import ExitToAppIcon from '@mui/icons-material/ExitToApp';
    import DashboardIcon from '@mui/icons-material/Dashboard';
    import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
    import { Link} from 'react-router-dom';

    // Utility function to get user data from local storage
    const getUserFromLocalStorage = () => {
      const userData = localStorage.getItem('userName');
      if (userData) {
        try {
          return JSON.parse(userData);
        } catch (error) {
          console.error("Error parsing user data from local storage", error);
          return {};
        }
      }
      return {};
    };

    const drawerWidth = 200;

    const StaffSidebar = ({ darkTheme, toggleDarkTheme }) => {
      const drawerStyle = {
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          background: darkTheme ? 'linear-gradient(to bottom, #333, #555)' : '#fff',
          color: darkTheme ? '#fff' : '#000',
          borderRight: `1px solid ${darkTheme ? '#555' : '#ddd'}`,
        },
      };

      const listItemStyle = {
        '&:hover': {
          backgroundColor: darkTheme ? '#444' : '#f5f5f5',
        },
      };

      const iconStyle = {
        color: darkTheme ? '#fff' : '#000',
      };

      // Retrieve user data from local storage
      const user = getUserFromLocalStorage();
      const userName = user.firstName || 'Guest'; // Use firstName if available

      return (
        <Drawer
          variant="permanent"
          anchor="left"
          sx={drawerStyle}
        >
          <Box sx={{ width: drawerWidth }} role="presentation">
              <List>
                <ListItem disablePadding>
                  <ListItemButton sx={listItemStyle}>
                    <ListItemIcon sx={iconStyle}>
                      <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Profile" secondary={userName} />
                  </ListItemButton>
                </ListItem>
              </List>
            <Divider />
            <ListItem disablePadding>
            <ListItemButton component={Link} to="/StaffDashboard" sx={listItemStyle}>
              <ListItemIcon sx={iconStyle}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/Staff/my-schedule" sx={listItemStyle}>
              <ListItemIcon sx={iconStyle}>
                <CalendarTodayIcon />
              </ListItemIcon>
              <ListItemText primary="My Schedule" />
            </ListItemButton>
          </ListItem>
          <Divider />
            <Link to="/Staff/time-off-requests" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem disablePadding>
                <ListItemButton sx={listItemStyle}>
                  <ListItemIcon sx={iconStyle}>
                    <CalendarTodayIcon />
                  </ListItemIcon>
                  <ListItemText primary="Time-Off Requests" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Divider />
            <Link to="/Staff/shift-swapping" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem disablePadding>
                <ListItemButton sx={listItemStyle}>
                  <ListItemIcon sx={iconStyle}>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Shift Swapping" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Divider />
            <Link to="/Staff/profile-settings" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem disablePadding>
                <ListItemButton sx={listItemStyle}>
                  <ListItemIcon sx={iconStyle}>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Divider />
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={toggleDarkTheme} sx={{ ...listItemStyle, mb: 2 }}>
                  <ListItemIcon sx={iconStyle}>
                    <Brightness4Icon />
                  </ListItemIcon>
                  <ListItemText primary="Dark Theme" />
                </ListItemButton>
              </ListItem>
              <Divider />
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItem disablePadding>
                  <ListItemButton sx={listItemStyle}>
                    <ListItemIcon sx={iconStyle}>
                      <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                </ListItem>
              </Link>
            </List>
          </Box>
        </Drawer>
      );
    };

    export default StaffSidebar;
      