// src/components/Notification.jsx

import React, { useEffect } from 'react';
import { Snackbar, IconButton, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';
import PropTypes from 'prop-types';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notification = ({ open, onClose, message, severity, autoHideDuration, position }) => {

  // Auto-hide functionality
  useEffect(() => {
    let timer;
    if (open && autoHideDuration > 0) {
      timer = setTimeout(() => {
        onClose();
      }, autoHideDuration);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [open, autoHideDuration, onClose]);

  const handleClose = () => {
    onClose();
  };

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{ vertical: position.vertical, horizontal: position.horizontal }}
      TransitionComponent={(props) => <Slide {...props} direction="up" />}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

Notification.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  severity: PropTypes.oneOf(['success', 'error', 'warning', 'info']).isRequired,
  autoHideDuration: PropTypes.number,
  position: PropTypes.shape({
    vertical: PropTypes.oneOf(['top', 'bottom']),
    horizontal: PropTypes.oneOf(['left', 'center', 'right'])
  })
};

Notification.defaultProps = {
  autoHideDuration: 6000,
  position: { vertical: 'bottom', horizontal: 'right' }
};

export default Notification;
