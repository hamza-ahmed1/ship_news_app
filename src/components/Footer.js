import React, { useState } from 'react';
import { Box, Container, Grid, Typography, TextField, IconButton, Link } from '@mui/material';
import { Facebook, Twitter, Linkedin, Send } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed with: ${email}`);
      setEmail('');
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        background: '#0a3d4d',
        color: 'white',
        paddingTop: 6,
        paddingBottom: 3
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Useful Links Section */}
          <Grid item xs={12} md={3}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                marginBottom: 2,
                color: '#5bc0de',
                fontSize: '20px'
              }}
            >
              Useful Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {['About Us', 'Tenders', 'Schedules', 'Projects', 'Facilities', 'FAQs', 'Publications', 'Industries'].map((link) => (
                <Link
                  key={link}
                  href="#"
                  sx={{
                    color: 'rgba(255,255,255,0.8)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'color 0.2s',
                    '&:hover': {
                      color: '#5bc0de',
                      textDecoration: 'underline'
                    }
                  }}
                >
                  + {link}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Government Links Section */}
          <Grid item xs={12} md={3}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                marginBottom: 2,
                color: '#5bc0de',
                fontSize: '20px'
              }}
            >
              Important Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Link href="https://pcsir.gov.pk" target="_blank" rel="noopener">
                <img 
                  src="https://www.pqa.gov.pk/images/footer/PCSIR.png" 
                  alt="Pakistan CSIR"
                  style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }}
                />
              </Link>
              <Link href="#" target="_blank" rel="noopener">
                <img 
                  src="https://www.pqa.gov.pk/images/footer/wafaqi-mohtasib.png" 
                  alt="Wafaqi Mohtasib"
                  style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }}
                />
              </Link>
            </Box>
          </Grid>

          {/* Stay Connected Section */}
          <Grid item xs={12} md={3}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                marginBottom: 2,
                color: '#5bc0de',
                fontSize: '20px'
              }}
            >
              Stay Connected
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
              <IconButton
                href="https://facebook.com"
                target="_blank"
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#5bc0de',
                    transform: 'translateY(-3px)',
                    transition: 'all 0.3s'
                  }
                }}
              >
                <Facebook size={20} />
              </IconButton>
              <IconButton
                href="https://twitter.com"
                target="_blank"
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#5bc0de',
                    transform: 'translateY(-3px)',
                    transition: 'all 0.3s'
                  }
                }}
              >
                <Twitter size={20} />
              </IconButton>
              <IconButton
                href="https://linkedin.com"
                target="_blank"
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#5bc0de',
                    transform: 'translateY(-3px)',
                    transition: 'all 0.3s'
                  }
                }}
              >
                <Linkedin size={20} />
              </IconButton>
            </Box>
          </Grid>

          {/* Newsletter Section */}
          <Grid item xs={12} md={3}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                marginBottom: 2,
                color: '#5bc0de',
                fontSize: '20px'
              }}
            >
              Newsletter
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255,255,255,0.8)',
                marginBottom: 2,
                fontSize: '14px'
              }}
            >
              Stay Connected to Latest News
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubscribe}
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: 2,
                overflow: 'hidden'
              }}
            >
              <TextField
                fullWidth
                size="small"
                placeholder="your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    border: 'none',
                    '& fieldset': {
                      border: 'none'
                    }
                  },
                  '& input': {
                    padding: '10px 12px',
                    fontSize: '14px'
                  }
                }}
              />
              <IconButton
                type="submit"
                sx={{
                  backgroundColor: '#0a4d68',
                  borderRadius: 0,
                  padding: '10px 16px',
                  '&:hover': {
                    backgroundColor: '#088395'
                  }
                }}
              >
                <Send size={20} color="white" />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Footer Links */}
        <Box
          sx={{
            marginTop: 5,
            paddingTop: 3,
            borderTop: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 3,
            flexWrap: 'wrap'
          }}
        >
          {['Disclaimer', 'Sitemap', 'Contact Us'].map((item, index) => (
            <React.Fragment key={item}>
              <Link
                href="#"
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  textDecoration: 'none',
                  fontSize: '14px',
                  '&:hover': {
                    color: '#5bc0de'
                  }
                }}
              >
                {item}
              </Link>
              {index < 2 && (
                <Typography sx={{ color: 'rgba(255,255,255,0.3)' }}>|</Typography>
              )}
            </React.Fragment>
          ))}
        </Box>

        {/* Copyright */}
        <Typography
          sx={{
            textAlign: 'center',
            marginTop: 2,
            color: 'rgba(255,255,255,0.6)',
            fontSize: '13px'
          }}
        >
          © 2026, Wharf Maritime Platform. All rights reserved.
        </Typography>

        {/* Developer Credit */}
        <Box
          sx={{
            textAlign: 'center',
            marginTop: 3,
            opacity: 0.6
          }}
        >
          <Typography variant="caption" sx={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>
            Design & Developed by
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', fontSize: '13px', fontWeight: 600, marginTop: 0.5 }}>
            Integrated Fiscal Systems Pvt (Ltd.)
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}