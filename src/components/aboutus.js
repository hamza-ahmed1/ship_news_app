import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { Ship, Target, Zap, Globe, TrendingUp, Shield } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function AboutUs({ setUser, user }) {
  const features = [
    {
      icon: Ship,
      title: 'Real-Time Monitoring',
      description: 'Track vessel movements and port operations with live, accurate data from Karachi Port Trust and Port Qasim.'
    },
    {
      icon: Zap,
      title: 'Digital Transformation',
      description: 'Modernizing maritime information systems with cutting-edge digital solutions for seamless operations.'
    },
    {
      icon: Globe,
      title: 'Comprehensive Coverage',
      description: "Pakistan's most comprehensive maritime database with detailed vessel and cargo information."
    },
    {
      icon: TrendingUp,
      title: 'Data Analytics',
      description: 'Advanced analytics and insights to help you make informed decisions about shipping and logistics.'
    },
    {
      icon: Shield,
      title: 'Reliable & Secure',
      description: 'Trusted by maritime professionals with enterprise-grade security and data accuracy.'
    }
  ];

  return (
    <Box sx={{ background: '#f8fafc', minHeight: '100vh' }}>
      <Navbar setUser={setUser} user={user} />

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #0a4d68 0%, #088395 50%, #0d7c92 100%)',
          padding: '80px 20px',
          textAlign: 'center',
          color: 'white'
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              marginBottom: 2,
              fontSize: { xs: '36px', md: '48px' }
            }}
          >
            About Wharf
          </Typography>
          <Typography
            variant="h6"
            sx={{
              maxWidth: '800px',
              margin: '0 auto',
              opacity: 0.95,
              lineHeight: 1.6
            }}
          >
            Pakistan's leading maritime information platform providing real-time vessel tracking and port operations data
          </Typography>
        </Container>
      </Box>

      {/* Mission Section */}
      <Container maxWidth="lg" sx={{ paddingY: 8 }}>
        <Paper
          elevation={3}
          sx={{
            padding: 6,
            borderRadius: 4,
            background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
            border: '2px solid #5bc0de'
          }}
        >
          <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
            <Target size={60} color="#0a4d68" style={{ marginBottom: '16px' }} />
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: '#0a4d68',
                marginBottom: 2,
                fontSize: { xs: '28px', md: '36px' }
              }}
            >
              Our Mission
            </Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  padding: 4,
                  background: 'white',
                  borderRadius: 3,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                  height: '100%'
                }}
              >
                <Ship size={40} color="#088395" style={{ marginBottom: '16px' }} />
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: '#0a4d68',
                    marginBottom: 2
                  }}
                >
                  Real-Time Monitoring of Ships Record
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#555',
                    lineHeight: 1.8,
                    fontSize: '16px'
                  }}
                >
                  We provide comprehensive, real-time tracking of vessel movements, cargo operations, and port activities across Pakistan's major maritime hubs. Our platform ensures you have instant access to accurate shipping data whenever you need it.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  padding: 4,
                  background: 'white',
                  borderRadius: 3,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                  height: '100%'
                }}
              >
                <Zap size={40} color="#088395" style={{ marginBottom: '16px' }} />
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: '#0a4d68',
                    marginBottom: 2
                  }}
                >
                  Transform Monitoring Digitally
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#555',
                    lineHeight: 1.8,
                    fontSize: '16px'
                  }}
                >
                  We're revolutionizing maritime information systems by digitizing traditional monitoring processes. Our cutting-edge platform brings transparency, efficiency, and accessibility to Pakistan's shipping industry through modern technology.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* Features Section */}
      <Box sx={{ background: '#ffffff', paddingY: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{
              textAlign: 'center',
              fontWeight: 800,
              color: '#0a4d68',
              marginBottom: 2,
              fontSize: { xs: '28px', md: '36px' }
            }}
          >
            Why Choose Wharf?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              color: '#666',
              marginBottom: 6,
              maxWidth: '700px',
              margin: '0 auto 48px'
            }}
          >
            Discover what makes us Pakistan's most trusted maritime information platform
          </Typography>

          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  elevation={2}
                  sx={{
                    padding: 3,
                    borderRadius: 3,
                    height: '100%',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 30px rgba(10, 77, 104, 0.15)'
                    }
                  }}
                >
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #0a4d68 0%, #088395 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 2
                    }}
                  >
                    <feature.icon size={30} color="white" />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: '#0a4d68',
                      marginBottom: 1.5
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#666',
                      lineHeight: 1.7
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #0a4d68 0%, #088395 100%)',
          padding: '60px 20px',
          textAlign: 'center',
          color: 'white'
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              marginBottom: 2,
              fontSize: { xs: '24px', md: '32px' }
            }}
          >
            Ready to Experience Digital Maritime Monitoring?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              marginBottom: 4,
              opacity: 0.95
            }}
          >
            Join thousands of maritime professionals who trust Wharf for real-time shipping data
          </Typography>
          {!user && (
            <button
              onClick={() => window.location.href = '/signup'}
              style={{
                background: 'white',
                color: '#0a4d68',
                padding: '16px 48px',
                border: 'none',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 12px 35px rgba(0,0,0,0.3)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
              }}
            >
              Get Started Today
            </button>
          )}
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}