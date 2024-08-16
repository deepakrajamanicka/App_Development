import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// Set up Axios with JWT Token from sessionStorage
axios.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('jwtToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

const SchedulingComponent = () => {
  const [staffId, setStaffId] = useState('');
  const [staffDetails, setStaffDetails] = useState(null);
  const [staffList, setStaffList] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSchedules = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/api/schedules');
        setSchedule(response.data);
      } catch {
        setError('Error fetching schedules');
      } finally {
        setLoading(false);
      }
    };

    const fetchStaffList = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/api/profiles');
        setStaffList(response.data);
      } catch {
        setError('Error fetching staff list');
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
    fetchStaffList();
  }, []);

  useEffect(() => {
    const fetchSchedulesForDate = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/api/schedules');
        const schedules = response.data.filter(sched => {
          const schedStartDate = new Date(sched.startDate);
          const schedEndDate = new Date(sched.endDate);
          return selectedDate >= schedStartDate && selectedDate <= schedEndDate;
        });
        setSchedule(schedules);
      } catch {
        setError('Error fetching schedules');
      } finally {
        setLoading(false);
      }
    };

    fetchSchedulesForDate();
  }, [selectedDate]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/profiles/${staffId}`);
      if (response.data) {
        setStaffDetails(response.data);
        setError(''); // Clear any previous error
      } else {
        setError('Staff ID not found');
      }
    } catch {
      setError('Invalid staff ID');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setStartDate('');
    setEndDate('');
    setStartTime('');
    setEndTime('');
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setError('');
  };

  const handleAddSchedule = async () => {
    if (staffDetails && startDate && endDate && startTime && endTime) {
      const scheduleData = {
        startDate,
        endDate,
        startTime,
        endTime,
        hoursWorked: calculateHoursWorked(startDate, startTime, endDate, endTime),
        profile: { profileId: staffDetails.profileId },
      };

      try {
        const response = await axios.post('http://localhost:8080/api/schedules', scheduleData);
        setSchedule([...schedule, response.data]);
        handleCloseModal();
      } catch {
        setError('Error adding schedule.');
      }
    } else {
      setError('Please fill out all fields.');
    }
  };

  const calculateHoursWorked = (startDate, startTime, endDate, endTime) => {
    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${endDate}T${endTime}`);
    return (end - start) / (1000 * 60 * 60);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const getStaffNameById = (id) => {
    const staff = staffList.find(staff => staff.profileId === id);
    return staff ? staff.name : 'Unknown';
  };

  return (
    <Box display="flex" flexDirection="column" padding={3} gap={3}>
      <Box display="flex" gap={3}>
        <Box flex={1} display="flex" flexDirection="column" gap={3}>
          <Typography variant="h5" gutterBottom>
            Search Staff
          </Typography>
          <TextField
            label="Staff ID"
            value={staffId}
            onChange={(e) => setStaffId(e.target.value)}
            size="small"
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Button variant="contained" color="primary" onClick={handleSearch} disabled={loading}>
            Search
          </Button>
          {loading && <CircularProgress />}
          {error && <Typography color="error">{error}</Typography>}
          
          {staffDetails && (
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">{staffDetails.name}</Typography>
                <Typography>Department: {staffDetails.dept}</Typography>
                <Typography>Role: {staffDetails.role}</Typography>
                <Button variant="contained" color="primary" onClick={handleOpenModal} sx={{ marginTop: 2 }}>
                  Add Schedule
                </Button>
              </CardContent>
            </Card>
          )}
        </Box>

        <Box flex={1} display="flex" flexDirection="column" alignItems="center" gap={3}>
          <Typography variant="h5" gutterBottom>
            Pick a Date from the Calendar
          </Typography>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            view="month"
          />
        </Box>
      </Box>

      <Box marginTop={3}>
        <Typography variant="h5" gutterBottom>
          Scheduled Details for {selectedDate.toDateString()}
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Schedule ID</TableCell>
                <TableCell>Staff Name</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>End Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schedule.map((sched) => (
                <TableRow key={sched.scheduleId}>
                  <TableCell>{sched.scheduleId}</TableCell>
                  <TableCell>{getStaffNameById(sched.profile.profileId)}</TableCell>
                  <TableCell>{sched.startDate}</TableCell>
                  <TableCell>{sched.endDate}</TableCell>
                  <TableCell>{sched.startTime}</TableCell>
                  <TableCell>{sched.endTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Add Schedule
          </Typography>
          <TextField
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Start Time"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="End Time"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Box display="flex" justifyContent="flex-end" marginTop={2}>
            <Button variant="contained" color="primary" onClick={handleAddSchedule}>
              Save Schedule
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};


export default SchedulingComponent;
