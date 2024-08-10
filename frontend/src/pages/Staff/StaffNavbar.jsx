import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, InputBase, Badge, Tooltip, Box, styled, alpha,Avatar } from '@mui/material';
import { Search as SearchIcon, Notifications as NotificationsIcon, Message as MessageIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import NotificationMenu from './NotificationMenu';
import MessageMenu from './MessageMenu';
import Profile from './Profile'; // Import the Profile component

const drawerWidth = 200;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.15),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(2),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'black',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

const iconColor = '#1E90FF';

const StaffNavbar = ({ mode, toggleColorMode }) => {
  const [notificationCount, setNotificationCount] = useState(4);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);
  const [messageCount, setMessageCount] = useState(2);
  const [messages, setMessages] = useState([
    { title: 'New Task Assigned', content: 'You have been assigned a new task by John Doe.' },
    { title: 'Meeting Reminder', content: 'Don\'t forget about the team meeting at 3 PM.' },
  ]);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    age: 30,
    email: 'john.doe@example.com',
    phoneNumber: '123-456-7890',
    address: '123 Main St',
    position: 'Manager',
    profilePicture: localStorage.getItem('profilePicture') || 'https://via.placeholder.com/150',
  });

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem('profileData')) || {};
    const savedProfilePicture = localStorage.getItem('profilePicture');
    setProfile({
      ...savedProfile,
      profilePicture: savedProfilePicture || 'https://via.placeholder.com/150',
    });
  }, []);

  const handleNotificationToggle = () => {
    if (messageVisible) {
      setMessageVisible(false);
    }
    setNotificationVisible(!notificationVisible);
  };

  const handleMessageToggle = () => {
    if (notificationVisible) {
      setNotificationVisible(false);
    }
    if (!messageVisible) {
      setMessageCount(0);
    }
    setMessageVisible(!messageVisible);
  };

  const handleSendMessage = (newMessage) => {
    const newMessages = [
      ...messages,
      {
        title: 'New Message',
        content: newMessage,
      },
    ];
    setMessages(newMessages);
    setMessageCount(prevCount => prevCount + 1);
  };

  const handleProfileToggle = () => {
    setProfileModalOpen(!profileModalOpen);
  };

  const handleProfileUpdate = (updatedProfile) => {
    setProfile(updatedProfile);
    localStorage.setItem('profileData', JSON.stringify(updatedProfile));
    localStorage.setItem('profilePicture', updatedProfile.profilePicture);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          background: 'linear-gradient(to right, #abbaab, #ffffff)',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          borderBottom: '1px solid #bdc3c7',
        }}
      >
        <Toolbar>
          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: iconColor }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <NotificationMenu
            visible={notificationVisible}
            onClose={handleNotificationToggle}
            notificationCount={notificationCount}
            setNotificationCount={setNotificationCount}
          />
          <Tooltip title="Messages">
            <IconButton
              size="large"
              aria-label="show messages"
              color="inherit"
              sx={{ p: 2 }}
              onClick={handleMessageToggle}
            >
              <Badge badgeContent={messageCount} color="error">
                <MessageIcon sx={{ color: iconColor, fontSize: 30 }} />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Notifications">
            <IconButton
              size="large"
              aria-label="show notifications"
              color="inherit"
              sx={{ p: 2 }}
              onClick={handleNotificationToggle}
            >
              <Badge badgeContent={notificationCount} color="error">
                <NotificationsIcon sx={{ color: iconColor, fontSize: 30 }} />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Profile">
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              sx={{ p: 2 }}
              onClick={handleProfileToggle}
            >
              <Avatar
                src={profile.profilePicture || 'https://via.placeholder.com/150'}
                sx={{ width: 30, height: 30 }}
              />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <MessageMenu
        open={messageVisible}
        onClose={handleMessageToggle}
        messages={messages}
        sendMessage={handleSendMessage}
      />
      <Profile
        open={profileModalOpen}
        onClose={handleProfileToggle}
        profile={profile}
        onProfileUpdate={handleProfileUpdate}
      />
    </>
  );
};

export default StaffNavbar;
