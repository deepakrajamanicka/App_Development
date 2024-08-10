import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Modal, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

// Sample data for demonstration purposes
const shifts = [
  { id: 1, date: '2024-07-30', startTime: '09:00', endTime: '17:00', role: 'Doctor', location: 'Room 101', notes: 'Routine checkup' },
  { id: 2, date: '2024-07-31', startTime: '13:00', endTime: '21:00', role: 'Doctor', location: 'Room 102', notes: 'Surgery' },
  // Add more shifts as needed
];

const appointments = [
  { id: 1, date: '2024-07-30', time: '10:00', type: 'Operation', patient: 'John Doe', location: 'Operating Room 1', notes: 'Pre-op assessment required' },
  { id: 2, date: '2024-07-31', time: '14:00', type: 'Outpatient', patient: 'Jane Smith', location: 'Consultation Room 3', notes: 'Follow-up visit' },
  // Add more appointments as needed
];

const timeOffRequests = [
  { id: 1, date: '2024-08-05', status: 'Approved' },
  { id: 2, date: '2024-08-10', status: 'Pending' },
  // Add more requests as needed
];

const MySchedule = () => {
  const [date, setDate] = useState(new Date());
  const [selectedShifts, setSelectedShifts] = useState([]);
  const [selectedAppointments, setSelectedAppointments] = useState([]);
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [appointmentForm, setAppointmentForm] = useState({
    patient: '',
    time: '',
    type: 'Operation',
    location: '',
    notes: '',
  });

  useEffect(() => {
    const selectedDate = formatDate(date);
    setSelectedShifts(shifts.filter(shift => shift.date === selectedDate));
    setSelectedAppointments(appointments.filter(appointment => appointment.date === selectedDate));
    setSelectedRequests(timeOffRequests.filter(request => request.date === selectedDate));
  }, [date]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const day = (`0${date.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const formatDisplayDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleAppointmentChange = (e) => {
    const { name, value } = e.target;
    setAppointmentForm({ ...appointmentForm, [name]: value });
  };

  const handleSubmitAppointment = () => {
    // Add logic to save the appointment
    console.log('Appointment Submitted:', appointmentForm);
    handleCloseModal();
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Schedule
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Calendar</Typography>
              <Calendar
                onChange={setDate}
                value={date}
                view="month"
                minDate={new Date()}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Shifts for {formatDisplayDate(date)}</Typography>
              {selectedShifts.length > 0 ? (
                <div>
                  {selectedShifts.map((shift) => (
                    <Card key={shift.id} sx={{ marginBottom: 2 }}>
                      <CardContent>
                        <Typography variant="subtitle1">
                          {shift.role} - {shift.startTime} to {shift.endTime}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Location: {shift.location}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Notes: {shift.notes}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" color="primary">
                          View Details
                        </Button>
                        <Button size="small" color="secondary">
                          Swap Shift
                        </Button>
                      </CardActions>
                    </Card>
                  ))}
                </div>
              ) : (
                <Typography>No shifts for this day.</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Divider sx={{ marginY: 3 }} />
      <Typography variant="h6">Appointments for {formatDisplayDate(date)}</Typography>
      {selectedAppointments.length > 0 ? (
        <div>
          {selectedAppointments.map((appointment) => (
            <Card key={appointment.id} sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="subtitle1">
                  {appointment.type} - {appointment.time}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Patient: {appointment.patient}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Location: {appointment.location}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Notes: {appointment.notes}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  View Details
                </Button>
                <Button size="small" color="secondary">
                  Reschedule
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      ) : (
        <Typography>No appointments for this day.</Typography>
      )}
      <Button variant="contained" color="primary" onClick={handleOpenModal} sx={{ marginTop: 3 }}>
        Add Appointment
      </Button>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{ padding: 3, backgroundColor: 'white', margin: 'auto', width: '50%', marginTop: '5%' }}>
          <Typography variant="h6" gutterBottom>
            Add New Appointment
          </Typography>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Patient Name</InputLabel>
            <TextField
              name="patient"
              value={appointmentForm.patient}
              onChange={handleAppointmentChange}
              placeholder="Enter patient name"
              required
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Appointment Time</InputLabel>
            <TextField
              name="time"
              type="time"
              value={appointmentForm.time}
              onChange={handleAppointmentChange}
              placeholder="Enter appointment time"
              required
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Type</InputLabel>
            <Select
              name="type"
              value={appointmentForm.type}
              onChange={handleAppointmentChange}
              required
            >
              <MenuItem value="Operation">Operation</MenuItem>
              <MenuItem value="Lecture">Lecture</MenuItem>
              <MenuItem value="Outpatient">Outpatient</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Location</InputLabel>
            <TextField
              name="location"
              value={appointmentForm.location}
              onChange={handleAppointmentChange}
              placeholder="Enter location"
              required
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Notes</InputLabel>
            <TextField
              name="notes"
              value={appointmentForm.notes}
              onChange={handleAppointmentChange}
              multiline
              rows={3}
              placeholder="Enter any notes"
            />
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleSubmitAppointment}>
            Submit
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default MySchedule;
