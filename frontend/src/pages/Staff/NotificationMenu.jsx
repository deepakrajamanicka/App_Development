import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  Typography,
  Divider,
  IconButton,
  Box,
  styled,
  Button,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

// Gradient background for notification box
const NotificationBar = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 80, // Adjust based on your navbar height
  right: 0,
  width: 400, // Increased width for better readability
  backgroundImage: 'linear-gradient(-60deg, #16a085 0%, #f4d03f 100%)', // Gradient background
  borderLeft: '1px solid #ddd',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  zIndex: 1200, // Ensure it sits above other content
  maxHeight: 'calc(100vh - 80px)',
  overflowY: 'auto',
  transition: 'transform 0.3s ease',
}));

const NotificationBarHidden = styled(NotificationBar)({
  transform: 'translateX(100%)', // Hidden position
});

const NotificationItem = styled(ListItem)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

// Background color for details and other elements
const detailsBackgroundColor = '#f5f5f5'; // Light gray background

// Background color for the bottom pop-up message
const popUpBackgroundColor = '#ffffff'; // White background for pop-up

const notificationData = [
  {
    id: 1,
    title: 'Appointment Reminder',
    description: 'You have an appointment with Dr. Smith at 3 PM today.',
    type: 'info',
  },
  {
    id: 2,
    title: 'Shift Swap Request',
    description: 'John Doe requested to swap shifts with you for tomorrow.',
    type: 'action',
  },
  {
    id: 3,
    title: 'Time Off Request',
    description: 'Your request for time off from July 30 to August 2 has been approved.',
    type: 'approval',
  },
  {
    id: 4,
    title: 'Emergency Alert',
    description: 'A new emergency case has been reported. Please check the details immediately.',
    type: 'alert',
  },
];

const NotificationMenu = ({ visible, onClose, notificationCount, setNotificationCount }) => {
  const [selectedNotification, setSelectedNotification] = React.useState(null);
  const [notifications, setNotifications] = React.useState(notificationData);

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
  };

  const handleCloseNotification = (notificationId) => {
    setNotifications(notifications.filter((n) => n.id !== notificationId));
    setNotificationCount(notificationCount - 1);
  };

  const handleCloseDetails = () => {
    setSelectedNotification(null);
  };

  return (
    <>
      <NotificationBar style={{ transform: visible ? 'translateX(0)' : 'translateX(100%)' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2, // Increased padding
            backgroundColor: '#333333', // Dark background for header
            borderBottom: '1px solid #ddd',
          }}
        >
          <Typography variant="h6" sx={{ color: '#ffffff' }}>Notifications</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon sx={{ fontSize: 30, color: '#ffffff' }} /> {/* Adjusted icon size and color */}
          </IconButton>
        </Box>
        <List>
          {notifications.map((notification) => (
            <div key={notification.id}>
              <NotificationItem button onClick={() => handleNotificationClick(notification)}>
                <ListItemText
                  primary={<Typography sx={{ color: '#000000' }}>{notification.title}</Typography>} // Black text color
                  secondary={<Typography sx={{ color: '#000000' }}>{notification.description}</Typography>} // Black text color
                />
                <IconButton edge="end" onClick={() => handleCloseNotification(notification.id)}>
                  <CloseIcon sx={{ fontSize: 24, p: 1, color: '#333333' }} /> {/* Adjusted icon size and color */}
                </IconButton>
              </NotificationItem>
              <Divider />
            </div>
          ))}
        </List>
        {selectedNotification && (
          <Collapse in={Boolean(selectedNotification)}>
            <Box
              sx={{
                p: 3, // Increased padding
                backgroundColor: detailsBackgroundColor, // Light gray background
                borderTop: '1px solid #ddd',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000000' }}>{selectedNotification.title}</Typography>
              <Typography variant="body2" sx={{ color: '#000000' }}>
                {selectedNotification.description}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button variant="outlined" color="primary" onClick={handleCloseDetails}>
                  Close
                </Button>
              </Box>
            </Box>
          </Collapse>
        )}
      </NotificationBar>
      {selectedNotification && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            p: 2,
            backgroundColor: popUpBackgroundColor, // White background for pop-up
            borderTop: '1px solid #ddd',
            boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="body2" sx={{ color: '#000000', fontWeight: 'bold' }}>
            {selectedNotification.description}
          </Typography>
          <IconButton onClick={() => setSelectedNotification(null)}>
            <CloseIcon sx={{ fontSize: 24, color: '#000000' }} /> {/* Black icon for close */}
          </IconButton>
        </Box>
      )}
    </>
  );
};

export default NotificationMenu;
