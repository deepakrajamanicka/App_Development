import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Divider
} from '@mui/material';
import {
  Check as CheckIcon,
  Cancel as CancelIcon,
  Search as SearchIcon
} from '@mui/icons-material';

const initialSwapRequests = [
  { id: 1, requester: 'Dr. John Doe', requestedShift: 'Morning', newShift: 'Afternoon', requestedTime: '09:00', newTime: '13:00', status: 'Pending', reason: 'Personal appointment', history: [] },
  { id: 2, requester: 'Jane Smith', requestedShift: 'Afternoon', newShift: 'Evening', requestedTime: '14:00', newTime: '18:00', status: 'Pending', reason: 'Family event', history: [] },
];

const initialStaffAvailability = [
  { id: 1, name: 'Dr. John Doe', availableTimes: ['09:00', '13:00', '18:00'] },
  { id: 2, name: 'Jane Smith', availableTimes: ['14:00', '18:00'] },
];

const ShiftSwap = () => {
  const [swapRequests, setSwapRequests] = useState(initialSwapRequests);
  const [staffAvailability, setStaffAvailability] = useState(initialStaffAvailability);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [newShift, setNewShift] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [availabilitySearchTerm, setAvailabilitySearchTerm] = useState('');

  useEffect(() => {
    // Fetch actual swap requests and staff availability from an API or data source here
    // For now, using static initial data
  }, []);

  const handleOpenModal = (request) => {
    setSelectedRequest(request);
    setNewShift(request.newShift);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRequest(null);
  };

  const handleApprove = () => {
    if (!isStaffAvailable(selectedRequest.newTime)) {
      alert('The requested time is not available for staff.');
      return;
    }

    setSwapRequests(prev => prev.map(req =>
      req.id === selectedRequest.id ? {
        ...req,
        status: 'Approved',
        history: [...req.history, { action: 'Approved', date: new Date().toLocaleString() }]
      } : req
    ));
    handleCloseModal();
  };

  const handleReject = () => {
    setSwapRequests(prev => prev.map(req =>
      req.id === selectedRequest.id ? {
        ...req,
        status: 'Rejected',
        history: [...req.history, { action: 'Rejected', date: new Date().toLocaleString() }]
      } : req
    ));
    handleCloseModal();
  };

  const handleChangeShift = (event) => {
    setNewShift(event.target.value);
  };

  const handleSubmitRequest = () => {
    // Check if the new time is available
    if (!isStaffAvailable('08:00')) {
      alert('The requested new time is not available for staff.');
      return;
    }

    const newRequest = {
      id: swapRequests.length + 1,
      requester: 'New Staff', // Replace with actual data
      requestedShift: 'Morning', // Replace with actual data
      newShift,
      requestedTime: '08:00', // Replace with actual data
      newTime: '12:00', // Replace with actual data
      status: 'Pending',
      reason: 'New request reason', // Replace with actual data
      history: []
    };
    setSwapRequests(prev => [...prev, newRequest]);
    handleCloseModal();
  };

  const isStaffAvailable = (time) => {
    return staffAvailability.some(staff =>
      staff.availableTimes.includes(time)
    );
  };

  const filteredRequests = swapRequests.filter(request =>
    request.requester.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAvailability = staffAvailability.filter(staff =>
    staff.name.toLowerCase().includes(availabilitySearchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Shift Swap Management
      </Typography>

      <TextField
        fullWidth
        margin="normal"
        label="Search by Requester"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Search Staff Availability"
        value={availabilitySearchTerm}
        onChange={(e) => setAvailabilitySearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Requester</TableCell>
              <TableCell>Requested Shift</TableCell>
              <TableCell>Requested Time</TableCell>
              <TableCell>New Shift</TableCell>
              <TableCell>New Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.id}</TableCell>
                  <TableCell>{request.requester}</TableCell>
                  <TableCell>{request.requestedShift}</TableCell>
                  <TableCell>{request.requestedTime}</TableCell>
                  <TableCell>{request.newShift}</TableCell>
                  <TableCell>{request.newTime}</TableCell>
                  <TableCell>{request.status}</TableCell>
                  <TableCell>{request.reason}</TableCell>
                  <TableCell>
                    {request.status === 'Pending' ? (
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => handleOpenModal(request)}
                        >
                          Approve
                          <CheckIcon sx={{ ml: 1 }} />
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleOpenModal(request)}
                        >
                          Reject
                          <CancelIcon sx={{ ml: 1 }} />
                        </Button>
                      </Box>
                    ) : (
                      <Typography variant="body2">{request.status}</Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  No requests available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Availability Table */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Staff Availability
        </Typography>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Available Times</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAvailability.length > 0 ? (
                filteredAvailability.map((staff) => (
                  <TableRow key={staff.id}>
                    <TableCell>{staff.id}</TableCell>
                    <TableCell>{staff.name}</TableCell>
                    <TableCell>{staff.availableTimes.join(', ')}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No staff available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Modal for viewing/editing shift swap request */}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 3, maxWidth: 600, mx: 'auto', mt: 10 }}>
          <Typography variant="h6" gutterBottom>
            {selectedRequest ? `Edit Swap Request for ${selectedRequest.requester}` : 'Create New Swap Request'}
          </Typography>
          {selectedRequest && (
            <>
              <Typography variant="body2" gutterBottom>
                Reason: {selectedRequest.reason}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                History:
              </Typography>
              {selectedRequest.history.length > 0 ? (
                <Box sx={{ mb: 2 }}>
                  {selectedRequest.history.map((entry, index) => (
                    <Typography key={index} variant="body2">
                      {entry.date}: {entry.action}
                    </Typography>
                  ))}
                </Box>
              ) : (
                <Typography variant="body2">No history available</Typography>
              )}
            </>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Requested Shift"
                value={selectedRequest ? selectedRequest.requestedShift : ''}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Requested Time"
                value={selectedRequest ? selectedRequest.requestedTime : ''}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>New Shift</InputLabel>
                <Select
                  value={newShift}
                  onChange={handleChangeShift}
                  label="New Shift"
                >
                  <MenuItem value="Morning">Morning</MenuItem>
                  <MenuItem value="Afternoon">Afternoon</MenuItem>
                  <MenuItem value="Evening">Evening</MenuItem>
                  <MenuItem value="Night">Night</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="normal"
                label="New Time"
                value={newShift} // Update as necessary
                onChange={(e) => setNewShift(e.target.value)}
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 2, textAlign: 'right' }}>
            <Button
              variant="outlined"
              onClick={handleCloseModal}
              sx={{ mr: 1 }}
            >
              Cancel
            </Button>
            {selectedRequest ? (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleApprove}
                >
                  Approve
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleReject}
                >
                  Reject
                </Button>
              </Box>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmitRequest}
              >
                Submit Request
              </Button>
            )}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ShiftSwap;
