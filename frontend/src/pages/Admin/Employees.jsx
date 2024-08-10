import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Modal, TextField, List, ListItem, ListItemText, Divider,
  IconButton, Tooltip, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import RoleFilter from './RoleFilter'; // Import your RoleFilter component

const EmployeeStatusDashboard = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [openDetails, setOpenDetails] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [staffData, setStaffData] = useState([]);
  const [roles, setRoles] = useState(new Set());

  // Initialize sample staff data
  useEffect(() => {
    const initialData = [
      { id: '1', name: 'Dr. John Doe', role: 'Doctor', age: 45, experience: '20 years', specialization: 'Cardiology', availability: '9 AM - 5 PM', successRate: '90%', location: 'City Hospital', performance: 'Excellent', patientsAttended: [{ name: 'Patient A', date: '2024-06-01', outcome: 'Successful' }, { name: 'Patient B', date: '2024-06-15', outcome: 'Successful' }], attendance: '95%', medicalSchool: 'Harvard Medical School', email: 'johndoe@example.com', contactNumber: '123-456-7890', salary: '$150,000' },
      { id: '2', name: 'Nurse Jane Smith', role: 'Nurse', age: 30, experience: '8 years', specialization: 'Pediatrics', availability: '7 AM - 3 PM', successRate: '85%', location: 'City Hospital', performance: 'Good', patientsAttended: [{ name: 'Patient C', date: '2024-07-01', outcome: 'Successful' }], attendance: '98%', medicalSchool: '', email: 'janesmith@example.com', contactNumber: '123-456-7891', salary: '$70,000' },
      { id: '3', name: 'Surgeon Alice Johnson', role: 'Surgeon', age: 50, experience: '25 years', specialization: 'Orthopedic Surgery', availability: '10 AM - 6 PM', successRate: '88%', location: 'General Hospital', performance: 'Excellent', patientsAttended: [{ name: 'Patient D', date: '2024-07-10', outcome: 'Successful' }], attendance: '93%', medicalSchool: 'Stanford Medical School', email: 'alicejohnson@example.com', contactNumber: '123-456-7892', salary: '$180,000' },
      { id: '4', name: 'Anesthesiologist Mark Brown', role: 'Anesthesiologist', age: 40, experience: '15 years', specialization: 'General Anesthesia', availability: '8 AM - 4 PM', successRate: '92%', location: 'General Hospital', performance: 'Excellent', patientsAttended: [{ name: 'Patient E', date: '2024-07-15', outcome: 'Successful' }], attendance: '96%', medicalSchool: 'Yale Medical School', email: 'markbrown@example.com', contactNumber: '123-456-7893', salary: '$160,000' },
      { id: '5', name: 'Receptionist Linda Lee', role: 'Receptionist', age: 28, experience: '5 years', specialization: '', availability: '9 AM - 5 PM', successRate: '80%', location: 'City Clinic', performance: 'Good', patientsAttended: [], attendance: '100%', medicalSchool: '', email: 'lindalee@example.com', contactNumber: '123-456-7894', salary: '$50,000' },
      // Add more data as needed
    ];
    setStaffData(initialData);
    updateRoles(initialData);
  }, []);

  const updateRoles = (data) => {
    if (data && Array.isArray(data)) {
      const roleSet = new Set(data.map(item => item.role));
      setRoles(roleSet);
    }
  };

  const handleOpenDetails = (staff) => {
    formik.setValues(staff || {
      id: '',
      name: '',
      role: '',
      age: '',
      experience: '',
      specialization: '',
      availability: '',
      successRate: '',
      location: '',
      performance: '',
      patientsAttended: [],
      attendance: '',
      medicalSchool: '',
      email: '',
      contactNumber: '',
      salary: ''
    });
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  const handleSave = (values) => {
    if (values.id) {
      setStaffData(prev => prev.map(item =>
        item.id === values.id ? values : item
      ));
    } else {
      setStaffData(prev => [...prev, { ...values, id: `${Date.now()}` }]);
    }
    updateRoles(staffData.map(item => item.role));
    handleCloseDetails();
  };

  const handleDelete = (id) => {
    setConfirmDeleteId(id);
    setOpenConfirmDialog(true);
  };

  const confirmDelete = () => {
    setStaffData(prev => prev.filter(item => item.id !== confirmDeleteId));
    updateRoles(staffData.map(item => item.role));
    setOpenConfirmDialog(false);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const filteredData = selectedRole === '' ? staffData : staffData.filter(item => item.role === selectedRole);

  const formik = useFormik({
    initialValues: {
      id: '',
      name: '',
      role: '',
      age: '',
      experience: '',
      specialization: '',
      availability: '',
      successRate: '',
      location: '',
      performance: '',
      patientsAttended: [],
      attendance: '',
      medicalSchool: '',
      email: '',
      contactNumber: '',
      salary: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      role: Yup.string().required('Required'),
      age: Yup.number().required('Required').positive().integer(),
      experience: Yup.string().required('Required'),
      specialization: Yup.string().required('Required'),
      availability: Yup.string().required('Required'),
      successRate: Yup.string().required('Required'),
      location: Yup.string().required('Required'),
      performance: Yup.string().required('Required'),
      attendance: Yup.string().required('Required'),
      medicalSchool: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      contactNumber: Yup.string().required('Required'),
      salary: Yup.string().required('Required')
    }),
    onSubmit: (values) => {
      handleSave(values);
    }
  });

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Staff Management Dashboard
      </Typography>
      <Typography variant="h5" gutterBottom>
        Filter By Role:
      </Typography>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', width: 250 }}>
        <RoleFilter selectedRole={selectedRole} onRoleChange={setSelectedRole} roles={Array.from(roles)} />
      </Box>
      <Box sx={{ textAlign: 'right', mb: 2 }}>
        <Button variant="contained" color="primary" onClick={() => handleOpenDetails(null)}>
          <Add /> Add Staff
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ mt: 0 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Experience</TableCell>
              <TableCell>Specialization</TableCell>
              <TableCell>Availability</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((row) => (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>{row.age}</TableCell>
                  <TableCell>{row.experience}</TableCell>
                  <TableCell>{row.specialization}</TableCell>
                  <TableCell>{row.availability}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleOpenDetails(row)}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDelete(row.id)}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Staff Details Modal */}
      <Modal
        open={openDetails}
        onClose={handleCloseDetails}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ width: 600, bgcolor: 'background.paper', p: 4, borderRadius: 2, boxShadow: 24, mx: 'auto', mt: '10%' }}>
          <Typography id="modal-title" variant="h6" component="h2">
            {formik.values.id ? 'Edit Staff' : 'Add Staff'}
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              id="name"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Role</InputLabel>
              <Select
                id="role"
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                label="Role"
                error={formik.touched.role && Boolean(formik.errors.role)}
                helperText={formik.touched.role && formik.errors.role}
              >
                <MenuItem value="">None</MenuItem>
                {Array.from(roles).map((role, index) => (
                  <MenuItem key={index} value={role}>{role}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              margin="normal"
              id="age"
              name="age"
              label="Age"
              type="number"
              value={formik.values.age}
              onChange={formik.handleChange}
              error={formik.touched.age && Boolean(formik.errors.age)}
              helperText={formik.touched.age && formik.errors.age}
            />
            <TextField
              fullWidth
              margin="normal"
              id="experience"
              name="experience"
              label="Experience"
              value={formik.values.experience}
              onChange={formik.handleChange}
              error={formik.touched.experience && Boolean(formik.errors.experience)}
              helperText={formik.touched.experience && formik.errors.experience}
            />
            <TextField
              fullWidth
              margin="normal"
              id="specialization"
              name="specialization"
              label="Specialization"
              value={formik.values.specialization}
              onChange={formik.handleChange}
              error={formik.touched.specialization && Boolean(formik.errors.specialization)}
              helperText={formik.touched.specialization && formik.errors.specialization}
            />
            <TextField
              fullWidth
              margin="normal"
              id="availability"
              name="availability"
              label="Availability"
              value={formik.values.availability}
              onChange={formik.handleChange}
              error={formik.touched.availability && Boolean(formik.errors.availability)}
              helperText={formik.touched.availability && formik.errors.availability}
            />
            <TextField
              fullWidth
              margin="normal"
              id="successRate"
              name="successRate"
              label="Success Rate"
              value={formik.values.successRate}
              onChange={formik.handleChange}
              error={formik.touched.successRate && Boolean(formik.errors.successRate)}
              helperText={formik.touched.successRate && formik.errors.successRate}
            />
            <TextField
              fullWidth
              margin="normal"
              id="location"
              name="location"
              label="Location"
              value={formik.values.location}
              onChange={formik.handleChange}
              error={formik.touched.location && Boolean(formik.errors.location)}
              helperText={formik.touched.location && formik.errors.location}
            />
            <TextField
              fullWidth
              margin="normal"
              id="performance"
              name="performance"
              label="Performance"
              value={formik.values.performance}
              onChange={formik.handleChange}
              error={formik.touched.performance && Boolean(formik.errors.performance)}
              helperText={formik.touched.performance && formik.errors.performance}
            />
            <TextField
              fullWidth
              margin="normal"
              id="attendance"
              name="attendance"
              label="Attendance"
              value={formik.values.attendance}
              onChange={formik.handleChange}
              error={formik.touched.attendance && Boolean(formik.errors.attendance)}
              helperText={formik.touched.attendance && formik.errors.attendance}
            />
            <TextField
              fullWidth
              margin="normal"
              id="medicalSchool"
              name="medicalSchool"
              label="Medical School"
              value={formik.values.medicalSchool}
              onChange={formik.handleChange}
              error={formik.touched.medicalSchool && Boolean(formik.errors.medicalSchool)}
              helperText={formik.touched.medicalSchool && formik.errors.medicalSchool}
            />
            <TextField
              fullWidth
              margin="normal"
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              margin="normal"
              id="contactNumber"
              name="contactNumber"
              label="Contact Number"
              value={formik.values.contactNumber}
              onChange={formik.handleChange}
              error={formik.touched.contactNumber && Boolean(formik.errors.contactNumber)}
              helperText={formik.touched.contactNumber && formik.errors.contactNumber}
            />
            <TextField
              fullWidth
              margin="normal"
              id="salary"
              name="salary"
              label="Salary"
              value={formik.values.salary}
              onChange={formik.handleChange}
              error={formik.touched.salary && Boolean(formik.errors.salary)}
              helperText={formik.touched.salary && formik.errors.salary}
            />
            <Box sx={{ mt: 2 }}>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
              <Button onClick={handleCloseDetails} variant="outlined" color="secondary" sx={{ ml: 2 }}>
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      {/* Confirm Delete Dialog */}
      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this staff member?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmployeeStatusDashboard;
