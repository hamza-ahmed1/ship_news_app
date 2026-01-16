import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { auth } from '../firebase/config';
import { 
  createUserWithEmailAndPassword, 
  updateProfile 
} from 'firebase/auth';

import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0a4d68',
    },
    secondary: {
      main: '#088395',
    },
  },
});

// Popular country codes
const countryCodes = [
  { code: '+92', country: 'Pakistan' },
  { code: '+1', country: 'USA/Canada' },
  { code: '+44', country: 'UK' },
  { code: '+91', country: 'India' },
  { code: '+971', country: 'UAE' },
  { code: '+966', country: 'Saudi Arabia' },
  { code: '+86', country: 'China' },
  { code: '+81', country: 'Japan' },
];

export default function SignUp({ setUser }) {
  const navigate = useNavigate();
  const [countryCode, setCountryCode] = useState('+92');
  const [errors, setErrors] = useState({});

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const cleaned = phone.replace(/[\s-]/g, '');
    return /^\d{7,15}$/.test(cleaned);
  };

  const validateName = (name) => {
    return /^[a-zA-Z\s'-]{2,}$/.test(name.trim());
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  // Form validation
  const validateForm = (formData) => {
    const newErrors = {};

    const firstName = formData.get('firstName')?.trim();
    const lastName = formData.get('lastName')?.trim();
    const email = formData.get('email')?.trim();
    const phone = formData.get('phone')?.trim();
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (!firstName) {
      newErrors.firstName = 'First name is required';
    } else if (!validateName(firstName)) {
      newErrors.firstName = 'Please enter a valid first name';
    }

    if (!lastName) {
      newErrors.lastName = 'Last name is required';
    } else if (!validateName(lastName)) {
      newErrors.lastName = 'Please enter a valid last name';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(phone)) {
      newErrors.phone = 'Please enter a valid phone number (7-15 digits)';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  // Sign Up Submit Handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const formErrors = validateForm(data);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({});

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.get('email').trim(),
        data.get('password')
      );

      await updateProfile(userCredential.user, {
        displayName: `${data.get('firstName').trim()} ${data.get('lastName').trim()}`
      });

      setUser(userCredential.user);
      navigate('/home');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setErrors({ email: 'This email is already registered' });
      } else if (error.code === 'auth/weak-password') {
        setErrors({ password: 'Password is too weak' });
      } else {
        setErrors({ general: 'Failed to create account. Please try again.' });
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar/>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0a4d68 0%, #088395 50%, #0d7c92 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 2,
          paddingY: 4
        }}
      >
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Paper
            elevation={24}
            sx={{
              padding: 4,
              borderRadius: 3,
              background: 'white'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {/* Logo */}
              <Box
                sx={{
                  mb: 1.5,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <img 
                  src="/assets/logo.png" 
                  alt="Wharf Logo" 
                  style={{ height: "70px", width: "auto" }}
                />
              </Box>

              <Typography 
                component="h1" 
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: '#0a4d68',
                  marginBottom: 0.5,
                  fontSize: '22px'
                }}
              >
                Create Account
              </Typography>

              <Typography 
                variant="body2"
                sx={{
                  color: '#666',
                  marginBottom: 2.5,
                  textAlign: 'center',
                  fontSize: '13px'
                }}
              >
                Join Pakistan's leading maritime information platform
              </Typography>

              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
                <Grid container spacing={1.5}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      size="small"
                      name="firstName"
                      label="First Name"
                      autoComplete="given-name"
                      error={!!errors.firstName}
                      helperText={errors.firstName}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      size="small"
                      name="lastName"
                      label="Last Name"
                      autoComplete="family-name"
                      error={!!errors.lastName}
                      helperText={errors.lastName}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      size="small"
                      name="email"
                      label="Email Address"
                      type="email"
                      autoComplete="email"
                      error={!!errors.email}
                      helperText={errors.email}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      select
                      fullWidth
                      size="small"
                      label="Code"
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        }
                      }}
                    >
                      {countryCodes.map((option) => (
                        <MenuItem key={option.code} value={option.code}>
                          {option.code}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={8}>
                    <TextField
                      required
                      fullWidth
                      size="small"
                      name="phone"
                      label="Phone Number"
                      type="tel"
                      autoComplete="tel"
                      error={!!errors.phone}
                      helperText={errors.phone}
                      placeholder="3001234567"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      size="small"
                      name="companyName"
                      label="Company Name (Optional)"
                      autoComplete="organization"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      size="small"
                      name="password"
                      label="Password"
                      type="password"
                      autoComplete="new-password"
                      error={!!errors.password}
                      helperText={errors.password}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      size="small"
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      autoComplete="new-password"
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        }
                      }}
                    />
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ 
                    mt: 2.5, 
                    mb: 2,
                    py: 1.2,
                    borderRadius: 2,
                    fontSize: '15px',
                    fontWeight: 700,
                    textTransform: 'none',
                    background: 'linear-gradient(135deg, #0a4d68 0%, #088395 100%)',
                    boxShadow: '0 4px 15px rgba(10, 77, 104, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #083d54 0%, #076a7a 100%)',
                      boxShadow: '0 6px 20px rgba(10, 77, 104, 0.4)',
                    }
                  }}
                >
                  Create Account
                </Button>

                <Grid container justifyContent="center">
                  <Grid item>
                    <Link 
                      href="/signin" 
                      variant="body2"
                      sx={{
                        color: '#0a4d68',
                        fontWeight: 600,
                        fontSize: '13px',
                        '&:hover': {
                          color: '#088395'
                        }
                      }}
                    >
                      Already have an account? Sign In
                    </Link>
                  </Grid>
                </Grid>

                {/* Back to Home */}
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Link
                    href="/"
                    variant="body2"
                    sx={{
                      color: '#666',
                      fontSize: '13px',
                      textDecoration: 'none',
                      '&:hover': {
                        color: '#0a4d68',
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    ← Back to Home
                  </Link>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
      <Footer/>
    </ThemeProvider>
  );
}