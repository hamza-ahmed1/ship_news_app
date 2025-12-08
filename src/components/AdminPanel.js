
import CssBaseline from '@mui/material/CssBaseline';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';


const defaultTheme = createTheme();

export default function SignIn({ setUser }) {
  const navigate = useNavigate();

  // 🔥 Auto redirect if user already logged in

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
        

          <Typography component="h1" variant="h5">
         Admin panel coming soon!
          </Typography>

       
        </Box>
      </Container>
    </ThemeProvider>
  );
}
