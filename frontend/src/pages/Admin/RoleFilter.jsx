import React from 'react';
import { MenuItem, FormControl, Select, InputLabel } from '@mui/material';

const RoleFilter = ({ selectedRole, onRoleChange, roles }) => {
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel>Role</InputLabel>
      <Select
        value={selectedRole}
        onChange={(e) => onRoleChange(e.target.value)}
        label="Role"
      >
        <MenuItem value="">All</MenuItem>
        {roles.map((role, index) => (
          <MenuItem key={index} value={role}>{role}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default RoleFilter;
