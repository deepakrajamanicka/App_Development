import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  TextField,
  MenuItem,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  IconButton,
  InputAdornment
} from '@mui/material';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const defaultDepartments = [
  'Cardiology', 'Radiology', 'Oncology', 'Pediatrics', 'Emergency',
  'Gynecology', 'Neurology', 'Orthopedics', 'Urology', 'Internal Medicine',
];

const professions = [
  'Doctor', 'Nurse', 'Surgeon', 'Receptionist',
];

const roles = ['USER', 'ADMIN'];

const EmployeeStatusDashboard = () => {
  const [staffData, setStaffData] = useState([]);
  const [departments, setDepartments] = useState(defaultDepartments);
  const [roleOptions, setRoleOptions] = useState(roles);
  const [professionsOptions, setProfessionsOptions] = useState(professions);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [editingStaff, setEditingStaff] = useState(null);
  const [deletingStaff, setDeletingStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState(sessionStorage.getItem('token') || '');

  useEffect(() => {
    fetchStaffData();
  }, [selectedDepartment, selectedRole]);

  const fetchStaffData = async () => {
    setLoading(true);
    try {
      const params = {};
      if (selectedDepartment) params.dept = selectedDepartment;
      if (selectedRole) params.role = selectedRole;
  
      const response = await axios.get('http://localhost:8080/api/profiles', {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      
      console.log('API Response:', response.data);
  
      if (Array.isArray(response.data)) {
        setStaffData(response.data);
      } else {
        console.error('Expected an array but got:', response.data);
        setStaffData([]);
      }
    } catch (error) {
      console.error('Error fetching staff data:', error);
      setStaffData([]);
    } finally {
      setLoading(false);
    }
  };
  

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const handleOpenEdit = (staff) => {
    setEditingStaff(staff);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setEditingStaff(null);
  };

  const handleOpenDelete = (staff) => {
    setDeletingStaff(staff);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setDeletingStaff(null);
  };

  const handleAddStaff = async (values, { setSubmitting, resetForm }) => {
    try {
      const formattedValues = {
        ...values,
        role: "USER", // Fixed value for now; change if you need dynamic role assignment
      };
      const response = await axios.post('http://localhost:8080/api/v1/auth/register', formattedValues, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });
      
      const newToken = response.data.token;
      setToken(newToken);
      sessionStorage.setItem('token', newToken);
  
      fetchStaffData();
      handleCloseAdd();
      resetForm();
    } catch (error) {
      console.error('Error adding staff:', error);
    }
    setSubmitting(false);
  };
  
  const handleEditStaff = async (values, { setSubmitting }) => {
    try {
      const formattedValues = {
        ...values,
        role: values.role || "USER", // Default to "USER" if no role is provided
      };
      await axios.put(`http://localhost:8080/api/profiles/${values.profileId}`, formattedValues, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      fetchStaffData();
      handleCloseEdit();
    } catch (error) {
      console.error('Error updating staff:', error);
    }
    setSubmitting(false);
  };
  
  const handleDeleteStaff = async () => {
    if (deletingStaff) {
      try {
        await axios.delete(`http://localhost:8080/api/profiles/${deletingStaff.profileId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        fetchStaffData();
        handleCloseDelete();
      } catch (error) {
        console.error('Error deleting staff:', error);
      }
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    profession: Yup.string().required('Profession is required'),
    age: Yup.number().required('Age is required').positive('Age must be positive').integer('Age must be an integer'),
    dept: Yup.string().required('Department is required'),
    experience: Yup.string().required('Experience is required'),
    mobile: Yup.string().required('Mobile number is required'),
    address: Yup.string(),
    role: Yup.string().required('Role is required'), // Add role validation
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Manage Staff
      </Typography>

      <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
        <FormControl fullWidth>
          <InputLabel>Department</InputLabel>
          <Select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            label="Department"
          >
            <MenuItem value="">All Departments</MenuItem>
            {departments.map(dept => (
              <MenuItem key={dept} value={dept}>{dept}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
  <InputLabel>Role</InputLabel>
  <Select
    value={selectedRole}
    onChange={(e) => setSelectedRole(e.target.value)}
    label="Role"
  >

    <MenuItem value="">All Roles</MenuItem>
    {professionsOptions.map(prof => (
      <MenuItem key={prof} value={prof}>{prof}</MenuItem>
    ))}
  </Select>
</FormControl>

        <Button variant="contained" color="success" onClick={handleOpenAdd}>
          Add Staff
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Profile ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Experience</TableCell>
                <TableCell>Mobile Number</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                    {Array.isArray(staffData) && staffData.length > 0 ? (
                      staffData.map(staff => (
                        <TableRow key={staff.profileId}>
                          <TableCell>{staff.profileId}</TableCell>
                          <TableCell>{staff.name}</TableCell>
                          <TableCell>{staff.age}</TableCell>
                          <TableCell>{staff.dept}</TableCell>
                          <TableCell>{staff.role}</TableCell>
                          <TableCell>{staff.experience}</TableCell>
                          <TableCell>{staff.mobile}</TableCell>
                          <TableCell>{staff.email}</TableCell>
                          <TableCell>{staff.status}</TableCell>
                          <TableCell>
                            <Button variant="contained" color="primary" onClick={() => handleOpenEdit(staff)}>Edit</Button>
                            <Button variant="contained" color="error" onClick={() => handleOpenDelete(staff)}>Delete</Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={10} align="center">No staff data available</TableCell>
                      </TableRow>
                    )}
                  </TableBody>

          </Table>
        </TableContainer>
      )}

      {/* Add Staff Modal */}
      <Modal open={openAdd} onClose={handleCloseAdd}>
        <Box sx={{ ...modalStyle, width: 600 }}>
          <Typography variant="h6" gutterBottom>
            Add New Staff
          </Typography>
          <Box sx={{ maxHeight: '80vh', overflowY: 'auto' }}>
            <Formik
              initialValues={{
                name: '',
                email: '',
                password: '',
                profession: '',
                age: '',
                dept: '',
                experience: '',
                mobile: '',
                address: '',
                role: 'USER', // Default role
              }}
              validationSchema={validationSchema}
              onSubmit={handleAddStaff}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field
                    name="name"
                    as={TextField}
                    label="Name"
                    fullWidth
                    margin="normal"
                    helperText={<ErrorMessage name="name" />}
                  />
                  <Field
                    name="email"
                    as={TextField}
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    helperText={<ErrorMessage name="email" />}
                  />
                  <Field
                    name="password"
                    as={TextField}
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    helperText={<ErrorMessage name="password" />}
                  />
                  <Field
                    name="profession"
                    as={TextField}
                    label="Profession"
                    select
                    fullWidth
                    margin="normal"
                    helperText={<ErrorMessage name="profession" />}
                  >
                    {professionsOptions.map(prof => (
                      <MenuItem key={prof} value={prof}>{prof}</MenuItem>
                    ))}
                  </Field>
                  <Field
                    name="age"
                    as={TextField}
                    label="Age"
                    type="number"
                    fullWidth
                    margin="normal"
                    helperText={<ErrorMessage name="age" />}
                  />
                  <Field
                    name="dept"
                    as={TextField}
                    label="Department"
                    select
                    fullWidth
                    margin="normal"
                    helperText={<ErrorMessage name="dept" />}
                  >
                    {departments.map(dept => (
                      <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                    ))}
                  </Field>
                  <Field
                    name="experience"
                    as={TextField}
                    label="Experience"
                    fullWidth
                    margin="normal"
                    helperText={<ErrorMessage name="experience" />}
                  />
                  <Field
                    name="mobile"
                    as={TextField}
                    label="Mobile Number"
                    fullWidth
                    margin="normal"
                    helperText={<ErrorMessage name="mobile" />}
                  />
                  <Field
                    name="address"
                    as={TextField}
                    label="Address"
                    fullWidth
                    margin="normal"
                    helperText={<ErrorMessage name="address" />}
                  />
                  <Field
                    name="role"
                    as={TextField}
                    label="Role"
                    select
                    fullWidth
                    margin="normal"
                    helperText={<ErrorMessage name="role" />}
                  >
                    {roleOptions.map(role => (
                      <MenuItem key={role} value={role}>{role}</MenuItem>
                    ))}
                  </Field>
                  <Box sx={{ mt: 2 }}>
                    <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                      {isSubmitting ? 'Submitting...' : 'Add Staff'}
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={handleCloseAdd}>
                      Cancel
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Modal>

      {/* Edit Staff Modal */}
      <Modal open={openEdit} onClose={handleCloseEdit}>
        <Box sx={{ ...modalStyle, width: 600 }}>
          <Typography variant="h6" gutterBottom>
            Edit Staff
          </Typography>
          <Box sx={{ maxHeight: '80vh', overflowY: 'auto' }}>
            <Formik
              initialValues={editingStaff || {
                name: '',
                email: '',
                password: '',
                profession: '',
                age: '',
                dept: '',
                experience: '',
                mobile: '',
                address: '',
                role: 'USER', // Default role
              }}
              enableReinitialize
              validationSchema={validationSchema}
              onSubmit={handleEditStaff}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field
                    name="name"
                    as={TextField}
                    label="Name"
                    fullWidth
                    margin="normal"
                    helperText={<ErrorMessage name="name" />}
                  />
                  <Field
                    name="email"
                    as={TextField}
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    helperText={<ErrorMessage name="email" />}
                  />
                  <Field
                    name="password"
                    as={TextField}
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    helperText={<ErrorMessage name="password" />}
                  />
                  <Field
                    name="profession"
                    as={TextField}
                    label="Profession"
                    select
                    fullWidth
                    margin="normal"
                    helperText={<ErrorMessage name="profession" />}
                  >
                    {professionsOptions.map(prof => (
                      <MenuItem key={prof} value={prof}>{prof}</MenuItem>
                    ))}
                  </Field>
                  <Field
                    name="age"
                    as={TextField}
                    label="Age"
                    type="number"
                    fullWidth
                    margin="normal"
                    helperText={<ErrorMessage name="age" />}
                  />
                  <Field
                    name="dept"
                    as={TextField}
                    label="Department"
                    select
                    fullWidth
                    margin="normal"
                    helperText={<ErrorMessage name="dept" />}
                  >
                    {departments.map(dept => (
                      <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                    ))}
                  </Field>
                  <Field
                    name="experience"
                    as={TextField}
                    label="Experience"
                    fullWidth
                    margin="normal"
                    helperText={<ErrorMessage name="experience" />}
                  />
                  <Field
                    name="mobile"
                    as={TextField}
                    label="Mobile Number"
                    fullWidth
                    margin="normal"
                    helperText={<ErrorMessage name="mobile" />}
                  />
                  <Field
                    name="address"
                    as={TextField}
                    label="Address"
                    fullWidth
                    margin="normal"
                    helperText={<ErrorMessage name="address" />}
                  />
                  <Field
                    name="role"
                    as={TextField}
                    label="Role"
                    select
                    fullWidth
                    margin="normal"
                    helperText={<ErrorMessage name="role" />}
                  >
                    {roleOptions.map(role => (
                      <MenuItem key={role} value={role}>{role}</MenuItem>
                    ))}
                  </Field>
                  <Box sx={{ mt: 2 }}>
                    <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                      {isSubmitting ? 'Submitting...' : 'Save Changes'}
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={handleCloseEdit}>
                      Cancel
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Modal>

      {/* Delete Staff Modal */}
      <Modal open={openDelete} onClose={handleCloseDelete}>
        <Box sx={{ ...modalStyle, width: 400 }}>
          <Typography variant="h6" gutterBottom>
            Delete Staff
          </Typography>
          <Typography variant="body1">
            Are you sure you want to delete {deletingStaff?.name}?
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="error" onClick={handleDeleteStaff}>
              Delete
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCloseDelete}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default EmployeeStatusDashboard;
