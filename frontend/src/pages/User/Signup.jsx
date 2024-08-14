// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Snackbar from '@mui/material/Snackbar';
// import Alert from '@mui/material/Alert';
// import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';

// // Define a theme
// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//     background: {
//       default: '#121212',
//       paper: '#1D1D1D',
//     },
//     text: {
//       primary: '#FFFFFF',
//     },
//   },
// });

// export default function SignUp() {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//   });
//   const [errorMessages, setErrorMessages] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     terms: '',
//   });
//   const [agreeToTerms, setAgreeToTerms] = useState(false);
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState('success');
//   const navigate = useNavigate();
//   const theme = useTheme(); // Use the theme hook

 
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const { email, password, firstName, lastName } = formData;
//     let errorMessage = '';
  
//     // Clear previous error messages
//     setErrorMessages({
//       firstName: '',
//       lastName: '',
//       email: '',
//       password: '',
//       terms: '',
//     });
  
//     // Validation logic
//     if (email === '' || password === '' || firstName === '') {
//       errorMessage = 'All fields are required.';
//     } else if (firstName.length < 1) {
//       errorMessage = 'First Name must be at least 1 character.';
//     } else if (firstName.charAt(0) !== firstName.charAt(0).toUpperCase()) {
//       errorMessage = 'First Name must start with a capital letter.';
//     } else if (password.length < 8) {
//       errorMessage = 'Password must be at least 8 characters.';
//     } else if (!agreeToTerms) {
//       errorMessage = 'You must agree to the terms and conditions.';
//     }
  
//     if (errorMessage) {
//       setErrorMessages(prev => ({ ...prev, terms: errorMessage }));
//       return;
//     }
  
//     // If validation passes, store data in localStorage and navigate to Login page
//     setSnackbarMessage('Account created successfully!');
//     setSnackbarSeverity('success');
//     setOpenSnackbar(true);
  
//     // Ensure role is defined if needed
//     const role = 'user'; // Set this based on your requirements
  
//     localStorage.setItem('userData', JSON.stringify({ email, password }));
//     localStorage.setItem('userName', JSON.stringify({ email, password, firstName, lastName, role }));
  
//     setTimeout(() => {
//       navigate('/');
//     }, 1000);
//   };
  

//   // Handle input field change
//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   // Handle checkbox change
//   const handleCheckboxChange = (event) => {
//     setAgreeToTerms(event.target.checked);
//   };

//   // Close snackbar
//   const handleCloseSnackbar = () => {
//     setOpenSnackbar(false);
//   };

//   return (
//     <ThemeProvider theme={darkTheme}>
//       <CssBaseline />
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           position: 'relative',
//           overflow: 'hidden',
//           height: '100vh',
//           backgroundColor: theme.palette.background.default, // Use theme values
//           backgroundSize: 'cover',
//         }}
//       >
//         <Grid
//           container
//           component="main"
//           sx={{
//             height: '100%',
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'center',
//             overflow: 'hidden',
//           }}
//         >
//           <Grid
//             item
//             xs={12}
//             sm={7}
//             md={6}
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'center',
//               p: 2,
//               color: theme.palette.text.primary, // Use theme values
//               textAlign: 'left',
//               zIndex: 1,
//               pl: 10,
//               pr: 8,
//               mt: 32,
//             }}
//           >
//             <Typography
//               variant="h3"
//               component="h1"
//               gutterBottom
//               sx={{
//                 fontWeight: 'bold',
//                 color: theme.palette.text.primary, // Use theme values
//               }}
//             >
//               Staff Scheduling Made Easy
//             </Typography>
//             <Typography variant="h6" component="p" sx={{ lineHeight: '1.5', maxWidth: '100%' }}>
//               Efficiently manage your staff with our comprehensive scheduling system.
//               Increase productivity and streamline operations with ease.
//               Customize shifts, manage availability, and improve communication.
//               Join hundreds of businesses who trust our solution.
//               Start simplifying your scheduling today!
//             </Typography>
//           </Grid>
//           <Grid
//             container
//             item
//             xs={12}
//             sm={6}
//             md={6}
//             component={Box}
//             elevation={6}
//             square
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               ml: 'auto',
//               mr: 'auto',
//               position: 'relative',
//               zIndex: 1,
//             }}
//           >
//             <Box
//               sx={{
//                 width: '100%',
//                 maxWidth: 400,
//                 py: 4,
//                 px: 4,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 borderRadius: 5,
//                 backgroundImage: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',
//                 color: theme.palette.text.primary,
//                 boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.3)', // Adjusted shadow for better visibility
//                 position: 'relative',
//                 top: 40,
//               }}
//             >
//               <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//                 <LockOutlinedIcon />
//               </Avatar>
//               <Typography component="h1" variant="h5" sx={{ color: theme.palette.text.primary }}>
//                 Sign up
//               </Typography>
//               <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, mb: 1 }}>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       autoComplete="given-name"
//                       name="firstName"
//                       required
//                       fullWidth
//                       id="firstName"
//                       label="First Name"
//                       autoFocus
//                       onChange={handleChange}
//                       InputLabelProps={{
//                         style: { color: 'black' } // Label color
//                       }}
//                       InputProps={{
//                         style: { color: 'black', borderColor: 'black' } // Input text color and border color
//                       }}
//                       sx={{
//                         input: { color: 'black' }, // Input text color
//                         label: { color: 'black' },  // Label color
//                         '& .MuiOutlinedInput-root': {
//                           '& fieldset': {
//                             borderColor: 'black', // Border color
//                           },
//                           '&:hover fieldset': {
//                             borderColor: 'black', // Border color on hover
//                           },
//                           '&.Mui-focused fieldset': {
//                             borderColor: 'black', // Border color when focused
//                           },
//                         },
//                       }}
//                       error={!!errorMessages.firstName}
//                       helperText={errorMessages.firstName}
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       required
//                       fullWidth
//                       id="lastName"
//                       label="Last Name"
//                       name="lastName"
//                       autoComplete="family-name"
//                       onChange={handleChange}
//                       InputLabelProps={{
//                         style: { color: 'black' } // Label color
//                       }}
//                       InputProps={{
//                         style: { color: 'black', borderColor: 'black' } // Input text color and border color
//                       }}
//                       sx={{
//                         input: { color: 'black' }, // Input text color
//                         label: { color: 'black' },  // Label color
//                         '& .MuiOutlinedInput-root': {
//                           '& fieldset': {
//                             borderColor: 'black', // Border color
//                           },
//                           '&:hover fieldset': {
//                             borderColor: 'black', // Border color on hover
//                           },
//                           '&.Mui-focused fieldset': {
//                             borderColor: 'black', // Border color when focused
//                           },
//                         },
//                       }}
//                       error={!!errorMessages.lastName}
//                       helperText={errorMessages.lastName}
//                     />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       required
//                       fullWidth
//                       id="email"
//                       label="Email Address"
//                       name="email"
//                       autoComplete="email"
//                       onChange={handleChange}
//                       InputLabelProps={{
//                         style: { color: 'black' } // Label color
//                       }}
//                       InputProps={{
//                         style: { color: 'black', borderColor: 'black' } // Input text color and border color
//                       }}
//                       sx={{
//                         input: { color: 'black' }, // Input text color
//                         label: { color: 'black' },  // Label color
//                         '& .MuiOutlinedInput-root': {
//                           '& fieldset': {
//                             borderColor: 'black', // Border color
//                           },
//                           '&:hover fieldset': {
//                             borderColor: 'black', // Border color on hover
//                           },
//                           '&.Mui-focused fieldset': {
//                             borderColor: 'black', // Border color when focused
//                           },
//                         },
//                       }}
//                       error={!!errorMessages.email}
//                       helperText={errorMessages.email}
//                     />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       required
//                       fullWidth
//                       name="password"
//                       label="Password"
//                       type="password"
//                       id="password"
//                       autoComplete="new-password"
//                       onChange={handleChange}
//                       InputLabelProps={{
//                         style: { color: 'black' } // Label color
//                       }}
//                       InputProps={{
//                         style: { color: 'black', borderColor: 'black' } // Input text color and border color
//                       }}
//                       sx={{
//                         input: { color: 'black' }, // Input text color
//                         label: { color: 'black' },  // Label color
//                         '& .MuiOutlinedInput-root': {
//                           '& fieldset': {
//                             borderColor: 'black', // Border color
//                           },
//                           '&:hover fieldset': {
//                             borderColor: 'black', // Border color on hover
//                           },
//                           '&.Mui-focused fieldset': {
//                             borderColor: 'black', // Border color when focused
//                           },
//                         },
//                       }}
//                       error={!!errorMessages.password}
//                       helperText={errorMessages.password}
//                     />
//                   </Grid>
//                   {errorMessages.terms && (
//                     <Grid item xs={12} sx={{ textAlign: 'center', mt: 0.5, mb: 0.2 }}>
//                       <Typography color="error">{errorMessages.terms}</Typography>
//                     </Grid>
//                   )}
//                   <Grid item xs={12} sx={{ textAlign: 'center', mt: -1 }}>
//                     <FormControlLabel
//                       control={
//                         <Checkbox
//                           value="agree"
//                           sx={{
//                             '& .MuiSvgIcon-root': {
//                               color: 'black', // Checkbox icon color
//                             },
//                             '& .MuiCheckbox-root': {
//                               borderColor: 'black', // Checkbox border color
//                             },
//                           }}
//                           onChange={handleCheckboxChange}
//                         />
//                       }
//                       label={
//                         <Typography
//                           variant="body2"
//                           sx={{
//                             backgroundImage: 'linear-gradient(-60deg, #16a085 0%, #f4d03f 100%)',
//                             padding: '4px',
//                             borderRadius: '4px',
//                             color: 'black',
//                             display: 'inline-block',
//                           }}
//                         >
//                           I agree to the terms and conditions
//                         </Typography>
//                       }
//                     />
//                   </Grid>
//                 </Grid>
//                 <Button
//                   type="submit"
//                   fullWidth
//                   variant="contained"
//                   color="success"
//                   sx={{ mt: 2.5, mb: 2 }}
//                 >
//                   Sign Up
//                 </Button>
//                 <Grid container justifyContent="center" sx={{ textAlign: 'center' }}>
//                   <Grid item>
//                     <Link href="/" variant="body2" sx={{ color: 'black' }}>
//                       Already have an account? Sign In
//                     </Link>
//                   </Grid>
//                 </Grid>
//               </Box>
//             </Box>
//           </Grid>
//         </Grid>
//         <Snackbar
//           open={openSnackbar}
//           autoHideDuration={6000}
//           onClose={handleCloseSnackbar}
//           action={
//             <Button color="inherit" onClick={handleCloseSnackbar}>
//               Close
//             </Button>
//           }
//           anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//           sx={{
//             position: 'fixed',
//             top: 20, // Adjust as needed
//             left: '50%',
//             transform: 'translateX(-50%)',
//             width: 'auto',
//             maxWidth: '90%',
//           }}
//         >
//           <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
//             {snackbarMessage}
//           </Alert>
//         </Snackbar>
//       </Box>
//     </ThemeProvider>
//   );
// }
