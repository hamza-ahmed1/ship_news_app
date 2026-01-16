import * as React from 'react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { auth } from '../firebase/config';
import { 
  signInWithEmailAndPassword, 
  onAuthStateChanged,
  sendPasswordResetEmail 
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

export default function SignIn({ setUser }) {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  // Auto redirect if user already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        navigate("/home");
      }
    });

    return () => unsubscribe();
  }, []);

  // Forgot Password
  const handleForgotPassword = async () => {
    const email = prompt("Enter your email for password reset:");
    if (!email) return;

    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent to your email.");
    } catch (error) {
      alert("Failed to send reset email. Please check the email address.");
    }
  };

  // Login Submit Handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    const data = new FormData(event.currentTarget);

    try {
      await signInWithEmailAndPassword(
        auth,
        data.get("email"),
        data.get("password")
      );

      navigate("/home");
    } catch (error) {
      // Handle authentication errors with user-friendly messages
      if (error.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else if (error.code === 'auth/user-not-found') {
        setError('No account found with this email address.');
      } else if (error.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else if (error.code === 'auth/invalid-credential') {
        setError('Invalid email or password. Please check your credentials.');
      } else if (error.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please try again later.');
      } else {
        setError('Failed to sign in. Please try again.');
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
          padding: 2
        }}
      >
        <Container component="main" maxWidth="xs">
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
                  mb: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <img 
                  src="/assets/logo.png" 
                  alt="Wharf Logo" 
                  style={{ height: "80px", width: "auto" }}
                />
              </Box>

              <Typography 
                variant="body2"
                sx={{
                  color: '#666',
                  marginBottom: 3,
                  textAlign: 'center'
                }}
              >
                Sign in to access your maritime dashboard
              </Typography>

              {error && (
                <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                  {error}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
                <TextField 
                  fullWidth 
                  required 
                  margin="normal"
                  size="small"
                  label="Email Address" 
                  name="email"
                  type="email"
                  autoComplete="email"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
                
                <TextField 
                  fullWidth 
                  required 
                  margin="normal"
                  size="small"
                  label="Password" 
                  type="password" 
                  name="password"
                  autoComplete="current-password"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />

                <FormControlLabel
                  control={<Checkbox color="primary" size="small" />}
                  label={<Typography variant="body2">Remember me</Typography>}
                  sx={{ marginTop: 0.5 }}
                />

                <Button 
                  type="submit" 
                  fullWidth 
                  variant="contained" 
                  sx={{ 
                    mt: 2, 
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
                  Sign In
                </Button>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Link 
                      onClick={handleForgotPassword} 
                      variant="body2" 
                      sx={{ 
                        cursor: "pointer",
                        color: '#0a4d68',
                        fontWeight: 600,
                        fontSize: '13px',
                        '&:hover': {
                          color: '#088395'
                        }
                      }}
                    >
                      Forgot password?
                    </Link>
                  </Grid>

                  <Grid item xs={12} sm={6} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                    <Link 
                      href="/signup" 
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
                      Create Account
                    </Link>
                  </Grid>
                </Grid>

                {/* Divider */}
                <Box sx={{ my: 2.5, textAlign: 'center', position: 'relative' }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: 0,
                      right: 0,
                      height: '1px',
                      background: '#e0e0e0'
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      position: 'relative',
                      background: 'white',
                      padding: '0 12px',
                      display: 'inline-block',
                      color: '#999'
                    }}
                  >
                    Pakistan's Leading Maritime Platform
                  </Typography>
                </Box>

                {/* Back to Home */}
                <Box sx={{ textAlign: 'center' }}>
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