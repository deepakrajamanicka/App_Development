import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Avatar, IconButton } from '@mui/material';
import { CameraAlt as CameraAltIcon } from '@mui/icons-material';

const Profile = ({ open, onClose, profile, onProfileUpdate }) => {
  const [editableProfile, setEditableProfile] = useState(profile);

  useEffect(() => {
    setEditableProfile(profile);
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setEditableProfile((prev) => ({
          ...prev,
          profilePicture: base64String,
        }));
        localStorage.setItem('profilePicture', base64String); // Save the new profile picture
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onProfileUpdate(editableProfile); // Update parent with new profile data
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal open={open} onClose={handleCancel}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          p: 4,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="profile-picture-upload"
            type="file"
            onChange={handleProfilePictureChange}
          />
          <label htmlFor="profile-picture-upload">
            <IconButton component="span">
              <Avatar
                src={editableProfile.profilePicture || 'https://via.placeholder.com/150'}
                sx={{ width: 100, height: 100 }}
              >
                <CameraAltIcon />
              </Avatar>
            </IconButton>
          </label>
        </Box>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={editableProfile.name}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Age"
          name="age"
          type="number"
          value={editableProfile.age}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={editableProfile.email}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Phone Number"
          name="phoneNumber"
          value={editableProfile.phoneNumber}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Address"
          name="address"
          value={editableProfile.address}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Position"
          name="position"
          value={editableProfile.position}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default Profile;
