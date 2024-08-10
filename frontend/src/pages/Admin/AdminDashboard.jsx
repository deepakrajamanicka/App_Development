import React from 'react';
import { Card, Typography, Grid, Divider, Box, Toolbar } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';  // Verify if this is correct
import { PieChart } from '@mui/x-charts/PieChart';  // Verify if this is correct

const CustomLabel = ({ datum, x, y, color }) => (
  <text
    x={x + 30}  // Move label 30px to the right
    y={y}
    fill={color}
    textAnchor="start"
    style={{ fontSize: 12 }}
  >
    {datum.label}
  </text>
);

const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#f5f5f5' }}>
        <Toolbar />
        <Typography variant="h4" gutterBottom sx={{ mt: -5, marginBottom: 3, fontWeight: 'bold' }}>
          Hospital Staff Dashboard
        </Typography>
        <Grid container spacing={3}>
          {/* Key Metrics */}
          <Grid item xs={12} md={6} lg={3}>
            <Card variant="outlined" sx={{ padding: 3, borderRadius: 4, textAlign: 'center', boxShadow: 3 }}>
              <Typography variant="h6" sx={{ color: '#1976d2' }}>Total Doctors</Typography>
              <Typography variant="h4">45</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Card variant="outlined" sx={{ padding: 3, borderRadius: 4, textAlign: 'center', boxShadow: 3 }}>
              <Typography variant="h6" sx={{ color: '#388e3c' }}>Active Nurses</Typography>
              <Typography variant="h4">120</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Card variant="outlined" sx={{ padding: 3, borderRadius: 4, textAlign: 'center', boxShadow: 3 }}>
              <Typography variant="h6" sx={{ color: '#f57c00' }}>Pending Shift Swaps</Typography>
              <Typography variant="h4">8</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Card variant="outlined" sx={{ padding: 3, borderRadius: 4, textAlign: 'center', boxShadow: 3 }}>
              <Typography variant="h6" sx={{ color: '#d32f2f' }}>Scheduled Surgeries</Typography>
              <Typography variant="h4">12</Typography>
            </Card>
          </Grid>
          {/* Performance Metrics */}
          <Grid item xs={12}>
            <Card variant="outlined" sx={{ padding: 3, borderRadius: 4, textAlign: 'center', boxShadow: 3 }}>
              <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>Staff Performance Metrics</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <BarChart
                    xAxis={[{ scaleType: 'band', data: ['Doctors', 'Nurses', 'Surgeons', 'Anesthesiologists'] }]}
                    series={[{ data: [45, 120, 30, 15] }]}
                    width={500}
                    height={300}
                    sx={{ backgroundColor: '#fff' }}
                  />
                </Grid>
                <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: 45, label: 'Doctors' },
                          { id: 1, value: 120, label: 'Nurses' },
                          { id: 2, value: 30, label: 'Surgeons' },
                          { id: 3, value: 15, label: 'Anesthesiologists' },
                        ],
                      },
                    ]}
                    width={380}
                    height={280}
                    padding={{ top: 40, bottom: 40, left: 40, right: 40 }} // Add padding to ensure space around the chart
                    innerRadius={50} // Add inner radius to create space between labels and chart
                    labelComponent={CustomLabel} // Use custom label component
                  />
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>

        <Divider sx={{ margin: '20px 0' }} />

        <Grid container spacing={3}>
          {/* Recent Activities */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ padding: 3, borderRadius: 4, boxShadow: 3 }}>
              <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>Recent Activities</Typography>
              <Box sx={{ marginTop: 2 }}>
                <Typography variant="body1">- New nurse hired: Emma Brown</Typography>
                <Typography variant="body1">- New shift schedule released for August</Typography>
                <Typography variant="body1">- Emergency protocols updated</Typography>
              </Box>
            </Card>
          </Grid>
          {/* Important Alerts */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ padding: 3, borderRadius: 4, boxShadow: 3 }}>
              <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>Important Alerts</Typography>
              <Box sx={{ marginTop: 2 }}>
                <Typography variant="body1" color="error">- Urgent: Staff meeting for new procedures tomorrow</Typography>
                <Typography variant="body1" color="error">- Alert: Equipment maintenance scheduled for this weekend</Typography>
                <Typography variant="body1" color="error">- Reminder: Submit updated availability by end of day</Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>

        <Divider sx={{ margin: '20px 0' }} />

        <Grid container spacing={3} sx={{ mb: 5.8 }}>
          {/* Staff Performance */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ padding: 3, borderRadius: 4, boxShadow: 3 }}>
              <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>Staff Performance</Typography>
              <Box sx={{ marginTop: 2 }}>
                <Typography variant="body1">- Average patient satisfaction score: 4.7/5</Typography>
                <Typography variant="body1">- Highest performing department: Emergency Care</Typography>
                <Typography variant="body1">- Most improved staff member: Dr. Alex Lee</Typography>
              </Box>
            </Card>
          </Grid>
          {/* Upcoming Events */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ padding: 3, borderRadius: 4, boxShadow: 3 }}>
              <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>Upcoming Events</Typography>
              <Box sx={{ marginTop: 2 }}>
                <Typography variant="body1">- Staff training workshop on Tuesday</Typography>
                <Typography variant="body1">- Hospital safety audit next Friday</Typography>
                <Typography variant="body1">- Quarterly review meeting next month</Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
