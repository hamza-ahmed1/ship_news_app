import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { auth } from '../firebase/config';
import { 
  createUserWithEmailAndPassword, 
  updateProfile 
} from 'firebase/auth';

import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

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
    // Remove spaces and dashes
    const cleaned = phone.replace(/[\s-]/g, '');
    // Check if it contains only digits and is between 7-15 characters
    return /^\d{7,15}$/.test(cleaned);
  };

  const validateName = (name) => {
    // Check if name contains only letters, spaces, hyphens, and apostrophes
    // At least 2 characters
    return /^[a-zA-Z\s'-]{2,}$/.test(name.trim());
  };

  const validatePassword = (password) => {
    // At least 6 characters (Firebase requirement)
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

    // First name validation
    if (!firstName) {
      newErrors.firstName = 'First name is required';
    } else if (!validateName(firstName)) {
      newErrors.firstName = 'Please enter a valid first name';
    }

    // Last name validation
    if (!lastName) {
      newErrors.lastName = 'Last name is required';
    } else if (!validateName(lastName)) {
      newErrors.lastName = 'Please enter a valid last name';
    }

    // Email validation
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (!phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(phone)) {
      newErrors.phone = 'Please enter a valid phone number (7-15 digits)';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation
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

    // Validate form
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

      // Update user profile with name
      await updateProfile(userCredential.user, {
        displayName: `${data.get('firstName').trim()} ${data.get('lastName').trim()}`
      });

      // Here you can save additional data (phone, company) to Firestore if needed
      // Example:
      // await setDoc(doc(db, "users", userCredential.user.uid), {
      //   firstName: data.get('firstName').trim(),
      //   lastName: data.get('lastName').trim(),
      //   phone: `${countryCode}${data.get('phone').trim()}`,
      //   companyName: data.get('companyName')?.trim() || '',
      //   email: data.get('email').trim(),
      //   createdAt: new Date()
      // });

      setUser(userCredential.user);
      navigate('/home');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setErrors({ email: 'This email is already registered' });
      } else if (error.code === 'auth/weak-password') {
        setErrors({ password: 'Password is too weak' });
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="firstName"
                  label="First Name"
                  autoComplete="given-name"
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="lastName"
                  label="Last Name"
                  autoComplete="family-name"
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="email"
                  label="Email Address"
                  type="email"
                  autoComplete="email"
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  select
                  fullWidth
                  label="Code"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
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
                  name="phone"
                  label="Phone Number"
                  type="tel"
                  autoComplete="tel"
                  error={!!errors.phone}
                  helperText={errors.phone}
                  placeholder="3001234567"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="companyName"
                  label="Company Name (Optional)"
                  autoComplete="organization"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="new-password"
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  autoComplete="new-password"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign In
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}