import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Paper, TextField, Button } from '@mui/material';
import { Mail, Phone, MapPin, Send, Clock, Globe } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ContactUs({ setUser, user }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for contacting us! We'll get back to you soon.`);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'info@wharf.com.pk',
      link: 'mailto:info@wharf.com.pk'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+92 21 1234 5678',
      link: 'tel:+922112345678'
    },
    {
      icon: MapPin,
      title: 'Location',
      content: 'Karachi, Pakistan',
      link: '#'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      content: 'Mon - Fri: 9:00 AM - 6:00 PM',
      link: '#'
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
            Contact Us
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
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </Typography>
        </Container>
      </Box>

      {/* Contact Section */}
      <Container maxWidth="lg" sx={{ paddingY: 8 }}>
        <Grid container spacing={4}>
          {/* Contact Information Cards */}
          <Grid item xs={12} md={5}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: '#0a4d68',
                marginBottom: 3,
                fontSize: { xs: '24px', md: '32px' }
              }}
            >
              Get In Touch
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#666',
                marginBottom: 4,
                lineHeight: 1.7
              }}
            >
              Whether you have a question about our services, need technical support, or just want to provide feedback, our team is ready to help you.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {contactInfo.map((info, index) => (
                <Paper
                  key={index}
                  elevation={2}
                  sx={{
                    padding: 3,
                    borderRadius: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    transition: 'all 0.3s',
                    cursor: info.link !== '#' ? 'pointer' : 'default',
                    '&:hover': {
                      transform: info.link !== '#' ? 'translateX(8px)' : 'none',
                      boxShadow: '0 8px 25px rgba(10, 77, 104, 0.15)'
                    }
                  }}
                  onClick={() => {
                    if (info.link !== '#') {
                      window.location.href = info.link;
                    }
                  }}
                >
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #0a4d68 0%, #088395 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <info.icon size={24} color="white" />
                  </Box>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 700,
                        color: '#0a4d68',
                        marginBottom: 0.5
                      }}
                    >
                      {info.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#666'
                      }}
                    >
                      {info.content}
                    </Typography>
                  </Box>
                </Paper>
              ))}
            </Box>

            {/* Additional Info */}
            <Paper
              elevation={3}
              sx={{
                marginTop: 4,
                padding: 3,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #0a4d68 0%, #088395 100%)',
                color: 'white'
              }}
            >
              <Globe size={40} style={{ marginBottom: '12px' }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  marginBottom: 1
                }}
              >
                Maritime Support 24/7
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.95 }}>
                Our team is dedicated to providing round-the-clock support for critical maritime operations and inquiries.
              </Typography>
            </Paper>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Paper
              elevation={3}
              sx={{
                padding: 4,
                borderRadius: 3,
                background: 'white'
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: '#0a4d68',
                  marginBottom: 1,
                  fontSize: { xs: '24px', md: '32px' }
                }}
              >
                Send Us a Message
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#666',
                  marginBottom: 3
                }}
              >
                Fill out the form below and we'll get back to you within 24 hours
              </Typography>

              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      multiline
                      rows={6}
                      label="Your Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2
                        }
                      }}
                    />
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  startIcon={<Send size={20} />}
                  sx={{
                    marginTop: 3,
                    padding: '14px',
                    borderRadius: 2,
                    fontSize: '16px',
                    fontWeight: 700,
                    textTransform: 'none',
                    background: 'linear-gradient(135deg, #0a4d68 0%, #088395 100%)',
                    boxShadow: '0 4px 15px rgba(10, 77, 104, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #083d54 0%, #076a7a 100%)',
                      boxShadow: '0 6px 20px rgba(10, 77, 104, 0.4)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Send Message
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Map Section (Optional) */}
      <Box sx={{ background: '#ffffff', paddingY: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            sx={{
              textAlign: 'center',
              fontWeight: 800,
              color: '#0a4d68',
              marginBottom: 4,
              fontSize: { xs: '24px', md: '32px' }
            }}
          >
            Find Us
          </Typography>
          <Paper
            elevation={3}
            sx={{
              borderRadius: 3,
              overflow: 'hidden',
              height: '400px'
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462562.6588176466!2d66.59499!3d24.8607343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e06651d4bbf%3A0x9cf92f44555a0c23!2sKarachi%2C%20Pakistan!5e0!3m2!1sen!2s!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map"
            />
          </Paper>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}