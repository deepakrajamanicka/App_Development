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
  Tabs,
  Tab,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Modal,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import calendar styles

// Mock Data (replace with API calls or a database)
const roles = ['Doctor', 'Nurse', 'Surgeon', 'Anesthesiologist'];
const operations = ['Operation A', 'Operation B', 'Operation C'];
const operationTheatres = ['Theatre 1', 'Theatre 2', 'Theatre 3'];
const shifts = ['Morning', 'Afternoon', 'Evening', 'Night'];

// Sample staff data
const staffData = [
  { id: 1, name: 'Dr. John Doe', role: 'Doctor', availability: { '2024-07-29': ['Morning', 'Afternoon'] }, specialization: 'Cardiology' },
  { id: 2, name: 'Jane Smith', role: 'Nurse', availability: { '2024-07-29': ['Afternoon', 'Evening'] }, specialization: 'Pediatrics' },
  { id: 3, name: 'Dr. Mike Johnson', role: 'Surgeon', availability: { '2024-07-29': ['Morning', 'Evening'] }, specialization: 'Orthopedics' },
  { id: 4, name: 'Emily Davis', role: 'Anesthesiologist', availability: { '2024-07-29': ['Night'] }, specialization: 'Anesthesia' }
];

const Scheduling = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [scheduleData, setScheduleData] = useState({
    week: []
  });
  const [tabValue, setTabValue] = useState(0);
  const [editingSchedule, setEditingSchedule] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [shift, setShift] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [operationDetailsOpen, setOperationDetailsOpen] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState(null);
  const [operationDetails, setOperationDetails] = useState({
    patientName: '',
    timing: '',
    involvedStaff: []
  });

  useEffect(() => {
    initializeSchedule();
  }, []);

  useEffect(() => {
    const formattedDate = formatDate(selectedDate);
    setScheduleData(prevData => ({
      week: generateWeeklySchedule(formattedDate)
    }));
  }, [selectedDate]);

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const generateSchedule = (date) => {
    return staffData.map(staff => ({
      ...staff,
      shifts: staff.availability[date] || [],
      operations: operations[Math.floor(Math.random() * operations.length)],
      theatre: operationTheatres[Math.floor(Math.random() * operationTheatres.length)]
    }));
  };

  const generateWeeklySchedule = (startDate) => {
    const schedule = [];
    const start = new Date(startDate);
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      const formattedDate = formatDate(date);
      schedule.push({
        date: formattedDate,
        staff: generateSchedule(formattedDate)
      });
    }
    return schedule;
  };

  const initializeSchedule = () => {
    const today = formatDate(new Date());
    setScheduleData({
      week: generateWeeklySchedule(today)
    });
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelectedStaff(prev => ({ ...prev, [name]: value }));
  };

  const handleShiftChange = (event) => {
    setShift(event.target.value);
  };

  const handleSave = () => {
    // Save logic for schedule
    console.log('Saving schedule', editingSchedule);
    setModalOpen(false);
  };

  const handleEdit = (staff) => {
    setSelectedStaff(staff);
    setModalOpen(true);
  };

  const handleAddShift = () => {
    if (selectedStaff && shift) {
      const updatedSchedule = editingSchedule.map(staff => {
        if (staff.id === selectedStaff.id) {
          return {
            ...staff,
            shifts: [...staff.shifts, shift]
          };
        }
        return staff;
      });
      setEditingSchedule(updatedSchedule);
      setShift('');
    }
  };

  const handleOperationClick = (operation) => {
    const details = scheduleData.week.flatMap(day => day.staff).find(op => op.operations === operation);
    if (details) {
      setOperationDetails({
        patientName: details.patientName || '',
        timing: details.timing || '',
        involvedStaff: staffData.filter(staff => staff.shifts.includes(details.shifts[0])) // Dummy example; adjust based on actual data
      });
      setSelectedOperation(operation);
      setOperationDetailsOpen(true);
    }
  };

  const handleOperationDetailsChange = (event) => {
    const { name, value } = event.target;
    setOperationDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOperationDetailsSave = () => {
    // Update logic for operation details
    console.log('Saving operation details', operationDetails);
    setOperationDetailsOpen(false);
    setSelectedOperation(null);
  };

  const handleOperationDetailsClose = () => {
    setOperationDetailsOpen(false);
    setSelectedOperation(null);
  };

  const handleChangeShift = (event, staffId) => {
    const newShift = event.target.value;
    const updatedSchedule = scheduleData.week.flatMap(day => day.staff).map(staff => {
      if (staff.id === staffId) {
        return {
          ...staff,
          shifts: [newShift] // Modify this logic as needed to handle multiple shifts
        };
      }
      return staff;
    });
    setScheduleData(prevData => ({
      ...prevData,
      week: prevData.week.map(day => ({
        ...day,
        staff: updatedSchedule.filter(s => s.date === day.date)
      }))
    }));
  };

  const renderScheduleTable = (schedule, date) => (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Schedule for {date}
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Specialization</TableCell>
            <TableCell>Shifts</TableCell>
            <TableCell>Operation</TableCell>
            <TableCell>Theatre</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {schedule.length > 0 ? (
            schedule.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.specialization}</TableCell>
                <TableCell>{row.shifts.join(', ')}</TableCell>
                <TableCell>{row.operations}</TableCell>
                <TableCell>{row.theatre}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(row)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7}>No data available</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        view="month" // Show calendar in month view
      />
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="schedule tabs">
            <Tab label="This Week's Schedule" />
            <Tab label="Operations" />
          </Tabs>
          {tabValue === 0 && (
            <Box>
              {scheduleData.week.map(day => (
                <Box key={day.date}>
                  {renderScheduleTable(day.staff, day.date)}
                </Box>
              ))}
            </Box>
          )}
          {tabValue === 1 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Operations Details
              </Typography>
              {operations.map((operation, index) => (
                <Button
                  key={index}
                  variant="outlined"
                  sx={{ m: 1 }}
                  onClick={() => handleOperationClick(operation)}
                >
                  {operation}
                </Button>
              ))}
            </Box>
          )}
        </Grid>
      </Grid>

      {/* Edit Schedule Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 3, maxWidth: 600, mx: 'auto', mt: 10 }}>
          <Typography variant="h6" gutterBottom>
            Edit Schedule for {selectedStaff?.name}
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            value={selectedStaff?.name || ''}
            onChange={handleChange}
            disabled
          />
          <TextField
            fullWidth
            margin="normal"
            label="Role"
            name="role"
            value={selectedStaff?.role || ''}
            onChange={handleChange}
            disabled
          />
          <TextField
            fullWidth
            margin="normal"
            label="Specialization"
            name="specialization"
            value={selectedStaff?.specialization || ''}
            onChange={handleChange}
            disabled
          />
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Shift</InputLabel>
                <Select
                  value={shift}
                  onChange={handleShiftChange}
                  label="Shift"
                >
                  {shifts.map((shift) => (
                    <MenuItem key={shift} value={shift}>{shift}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" color="primary" onClick={handleAddShift} sx={{ mt: 2 }}>
                Add Shift
              </Button>
            </Grid>
          </Grid>
          <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }}>
            Save
          </Button>
        </Box>
      </Modal>

      {/* Operation Details Dialog */}
      <Dialog open={operationDetailsOpen} onClose={handleOperationDetailsClose} maxWidth="md" fullWidth>
        <DialogTitle>
          Operation Details
        </DialogTitle>
        <DialogContent>
          {selectedOperation && (
            <Box>
              <TextField
                fullWidth
                margin="normal"
                label="Patient Name"
                name="patientName"
                value={operationDetails.patientName}
                onChange={handleOperationDetailsChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Timing"
                name="timing"
                value={operationDetails.timing}
                onChange={handleOperationDetailsChange}
              />
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Specialization</TableCell>
                      <TableCell>Shift</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {operationDetails.involvedStaff.map((staff, index) => (
                      <TableRow key={index}>
                        <TableCell>{staff.name}</TableCell>
                        <TableCell>{staff.role}</TableCell>
                        <TableCell>{staff.specialization}</TableCell>
                        <TableCell>
                          <FormControl fullWidth>
                            <InputLabel>Shift</InputLabel>
                            <Select
                              value={staff.shifts ? staff.shifts.join(', ') : ''}
                              onChange={(e) => handleChangeShift(e, staff.id)}
                              label="Shift"
                            >
                              {shifts.map((shift) => (
                                <MenuItem key={shift} value={shift}>{shift}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOperationDetailsSave} color="primary">
            Save
          </Button>
          <Button onClick={handleOperationDetailsClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Scheduling;
