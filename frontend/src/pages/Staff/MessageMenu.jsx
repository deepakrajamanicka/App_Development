// src/pages/Staff/MessageMenu.jsx

import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Typography, Divider, List, ListItem, ListItemText, Button, Box, TextField } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const MessageMenu = ({ open, onClose, messages, sendMessage }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        Messages
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ height: '400px', overflowY: 'auto', mb: 2 }}>
          <List>
            {messages.map((message, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText
                    primary={message.title}
                    secondary={message.content}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Type your message here..."
            variant="outlined"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            multiline
            rows={3}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
            <Button variant="contained" onClick={handleSendMessage}>Send</Button>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button variant="contained" onClick={onClose}>Close</Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default MessageMenu;
