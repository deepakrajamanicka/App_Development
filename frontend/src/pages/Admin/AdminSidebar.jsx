import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; // Import CalendarTodayIcon
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'; // Import SwapHorizIcon
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

// Utility function to get admin data from local storage
const getAdminFromLocalStorage = () => {
  const adminData = localStorage.getItem('adminName');
  if (adminData) {
    try {
      return JSON.parse(adminData);
    } catch (error) {
      console.error("Error parsing admin data from local storage", error);
      return {};
    }
  }
  return {};
};

const drawerWidth = 240;

const AdminSidebar = ({ darkTheme, toggleDarkTheme }) => {
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

  // Retrieve admin data from local storage
  const admin = getAdminFromLocalStorage();
  const adminName = admin.firstName || 'Admin'; // Use firstName if available

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={drawerStyle}
    >
      <Box sx={{ width: drawerWidth }} role="presentation">
        <Link to="/admin/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton sx={listItemStyle}>
                <ListItemIcon sx={iconStyle}>
                <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary={`Profile: ${adminName}`} />
              </ListItemButton>
            </ListItem>
          </List>
        </Link>
        <Divider />
        <Link to="AdminDashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem disablePadding>
            <ListItemButton sx={listItemStyle}>
              <ListItemIcon sx={iconStyle}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />
        <Link to="/AdminEmployees" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem disablePadding>
            <ListItemButton sx={listItemStyle}>
              <ListItemIcon sx={iconStyle}>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Employees" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />
        <Link to="/Admin/Settings" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem disablePadding>
            <ListItemButton sx={listItemStyle}>
              <ListItemIcon sx={iconStyle}>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />
        <Link to="/Admin/Scheduling" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem disablePadding>
            <ListItemButton sx={listItemStyle}>
              <ListItemIcon sx={iconStyle}>
                <CalendarTodayIcon />
              </ListItemIcon>
              <ListItemText primary="Schedule Management" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />
        <Link to="/Admin/SwiftSwap" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem disablePadding>
            <ListItemButton sx={listItemStyle}>
              <ListItemIcon sx={iconStyle}>
                <SwapHorizIcon />
              </ListItemIcon>
              <ListItemText primary="Shift Swapping" />
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

export default AdminSidebar;
