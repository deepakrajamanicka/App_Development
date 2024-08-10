// src/AppContent.jsx

import React from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import StaffNavbar from './pages/Staff/StaffNavbar'; // Ensure this path is correct
import AdminSidebar from './pages/Admin/AdminSidebar'; // Ensure this path is correct
import StaffSidebar from './pages/Staff/StaffSidebar'; // Ensure this path is correct
import LoginPage from './pages/User/Login'; // Ensure this path is correct
import SignUpComponent from './pages/User/Signup'; // Ensure this path is correct
import AdminDashboard from './pages/Admin/AdminDashboard'; // Ensure this path is correct
import EmployeeStatusDashboard from './pages/Admin/Employees';
import Scheduling from './pages/Admin/Scheduling';
import ShiftSwap from './pages/Admin/ShiftSwap';
import AdminSettings from './pages/Admin/AdminSettings';
import StaffDashboard from './pages/Staff/StaffDashboard'; 
import MySchedule from './pages/Staff/MySchedule'; // Ensure this path is correct
import TimeOffRequestPage from './pages/Staff/TimeOffRequestPage'; // Ensure path is correct
import SwiftSwapping from './pages/Staff/SwiftSwapping';
import ProfileSettings from './pages/Staff/ProfileSettings';
import Navbar from './pages/User/Navbar'; // Adjust the import path as needed

const drawerWidth = 50; // Adjust as necessary
const navbarHeight = 64; // Height of the StaffNavbar or Navbar component

const AppContent = ({ mode, toggleColorMode }) => {
  const location = useLocation();

  console.log("Current path:", location.pathname); // Debugging path

  // Determine which sidebar to display
  const isAdminPath = location.pathname.startsWith('/Admin');
  const isStaffPath = location.pathname.startsWith('/Staff');
  const isAuthPath = ['/Signup', '/'].includes(location.pathname);

  const SidebarComponent = isAdminPath ? AdminSidebar : (isStaffPath ? StaffSidebar : null);

  // Show Navbar based on the path
  const NavbarComponent = isAuthPath ? Navbar : (isStaffPath ? StaffNavbar : null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {NavbarComponent && <NavbarComponent mode={mode} toggleColorMode={toggleColorMode} />}
      
      <div style={{ display: 'flex', flexGrow: 1 }}>
        {SidebarComponent && (
          <SidebarComponent darkTheme={mode === 'dark'} toggleDarkTheme={toggleColorMode} />
        )}
        
        <main
          style={{
            flexGrow: 1,
            padding: '16px', // Adjust padding as needed
            marginLeft: SidebarComponent ? `${drawerWidth}px` : '0',
            marginTop: NavbarComponent ? `${navbarHeight}px` : '0', // Adjust based on Navbar height
          }}
        >
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/Signup" element={<SignUpComponent />} />
            <Route path="/AdminDashboard" element={<AdminDashboard />} />
            <Route path="/AdminEmployees" element={<EmployeeStatusDashboard />} />
            <Route path="/StaffDashboard" element={<StaffDashboard />} />
            <Route path="/Staff/my-schedule" element={<MySchedule />} />
            <Route path="/Staff/time-off-requests" element={<TimeOffRequestPage />} />
            <Route path="/Staff/shift-swapping" element={<SwiftSwapping />} />
            <Route path="/Staff/profile-settings" element={<ProfileSettings />} />
            <Route path="/Admin/Scheduling" element={<Scheduling />} />
            <Route path="/Admin/SwiftSwap" element={<ShiftSwap />} />
            <Route path="/Admin/Settings" element={<AdminSettings />} />
            {/* Add other routes as needed */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AppContent;
