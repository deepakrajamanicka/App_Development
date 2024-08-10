import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Typography, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Modal, TextField, Select, MenuItem, FormControl,
  InputLabel, IconButton, Tooltip, Dialog, DialogActions, DialogContent, DialogTitle
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Replace with your API URL
const apiUrl = 'http://localhost:8080/api';

const EmployeeStatusDashboard = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [openDetails, setOpenDetails] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [staffData, setStaffData] = useState([]);

  useEffect(() => {
    fetchStaffData();
  }, []);

  const fetchStaffData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/profiles`);
      setStaffData(response.data);
    } catch (error) {
      console.error('Error fetching staff data', error);
    }
  };

  const handleOpenDetails = (staff) => {
    formik.setValues(staff || {
      userId: '',
      email: '',
      password: '',
      name: '',
      age: '',
      role: '',
      mobile: '',
      address: '',
      department: ''
    });
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  const handleSave = async (values) => {
    try {
      const loginDetails = {
        email: values.email,
        password: values.password
      };

      const profileDetails = {
        name: values.name,
        age: values.age,
        role: values.role,
        mobile: values.mobile,
        address: values.address,
        department: values.department
      };

      if (values.userId) {
        await axios.put(`${apiUrl}/persons/${values.userId}`, loginDetails);
        await axios.put(`${apiUrl}/profiles/${values.userId}`, profileDetails);
      } else {
        const loginResponse = await axios.post(`${apiUrl}/persons`, loginDetails);
        await axios.post(`${apiUrl}/profiles`, { ...profileDetails, userId: loginResponse.data.userId });
      }

      fetchStaffData();
      handleCloseDetails();
    } catch (error) {
      console.error('Error saving staff data', error);
    }
  };

  const handleDelete = (id) => {
    setConfirmDeleteId(id);
    setOpenConfirmDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${apiUrl}/profiles/${confirmDeleteId}`);
      await axios.delete(`${apiUrl}/persons/${confirmDeleteId}`);
      fetchStaffData();
    } catch (error) {
      console.error('Error deleting staff data', error);
    }
    setOpenConfirmDialog(false);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const filteredData = selectedRole === '' ? staffData : staffData.filter(item => item.role === selectedRole);

  const formik = useFormik({
    initialValues: {
      userId: '',
      email: '',
      password: '',
      name: '',
      age: '',
      role: '',
      mobile: '',
      address: '',
      department: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
      name: Yup.string().required('Required'),
      age: Yup.string().required('Required'),
      role: Yup.string().required('Required'),
      mobile: Yup.string().required('Required'),
      address: Yup.string().required('Required'),
      department: Yup.string().required('Required')
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
        <Select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          displayEmpty
          inputProps={{ 'aria-label': 'Select Role' }}
          sx={{ width: '100%' }}
        >
          <MenuItem value="">
            <em>All Roles</em>
          </MenuItem>
          <MenuItem value="Doctor">Doctor</MenuItem>
          <MenuItem value="Nurse">Nurse</MenuItem>
          <MenuItem value="Receptionist">Receptionist</MenuItem>
          {/* Add other roles as necessary */}
        </Select>
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
              <TableCell>Department</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((row) => (
                <TableRow key={row.userId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{row.userId}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>{row.age}</TableCell>
                  <TableCell>{row.department}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleOpenDetails(row)}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDelete(row.userId)}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
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
        aria-labelledby="staff-details-title"
        aria-describedby="staff-details-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            maxHeight: '80vh',
            overflowY: 'scroll',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4
          }}
        >
          <Typography id="staff-details-title" variant="h6" component="h2" gutterBottom>
            {formik.values.userId ? 'Edit Staff' : 'Add Staff'}
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              margin="normal"
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              fullWidth
              margin="normal"
              id="name"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              fullWidth
              margin="normal"
              id="age"
              name="age"
              label="Age"
              value={formik.values.age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.age && Boolean(formik.errors.age)}
              helperText={formik.touched.age && formik.errors.age}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.role && Boolean(formik.errors.role)}
              >
                <MenuItem value="Doctor">Doctor</MenuItem>
                <MenuItem value="Nurse">Nurse</MenuItem>
                <MenuItem value="Receptionist">Receptionist</MenuItem>
                {/* Add other roles as necessary */}
              </Select>
              {formik.touched.role && formik.errors.role && (
                <Typography color="error" variant="caption">
                  {formik.errors.role}
                </Typography>
              )}
            </FormControl>
            <TextField
              fullWidth
              margin="normal"
              id="mobile"
              name="mobile"
              label="Mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              helperText={formik.touched.mobile && formik.errors.mobile}
            />
            <TextField
              fullWidth
              margin="normal"
              id="address"
              name="address"
              label="Address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
            <TextField
              fullWidth
              margin="normal"
              id="department"
              name="department"
              label="Department"
              value={formik.values.department}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.department && Boolean(formik.errors.department)}
              helperText={formik.touched.department && formik.errors.department}
            />
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={handleCloseDetails} variant="outlined" sx={{ mr: 2 }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                {formik.values.userId ? 'Save Changes' : 'Add Staff'}
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      {/* Confirmation Dialog for Deleting Staff */}
      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        aria-labelledby="confirm-delete-dialog-title"
        aria-describedby="confirm-delete-dialog-description"
      >
        <DialogTitle id="confirm-delete-dialog-title">
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this staff member?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmployeeStatusDashboard;
