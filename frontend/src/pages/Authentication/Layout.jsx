  import React from 'react';
  import { Box } from '@mui/material';
  import StaffSidebar from '../Staff/StaffSidebar'; // Correct path
  import AdminSidebar from '../Admin/AdminSidebar'; // Correct path

  const drawerWidth = -300; // Adjust width as needed

  const Layout = ({ children, darkTheme, toggleDarkTheme, isAdmin }) => {
    const Sidebar = isAdmin ? AdminSidebar : StaffSidebar;

    return (
      <Box sx={{ display: 'flex' }}>
        <Sidebar darkTheme={darkTheme} toggleDarkTheme={toggleDarkTheme} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            marginLeft: `${drawerWidth}px`, // Offset content by the sidebar width
          }}
        >
          {children}
        </Box>
      </Box>
    );
  };

  export default Layout;
