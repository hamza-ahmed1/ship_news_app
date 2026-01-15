import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip
} from "@mui/material";
import {
  DirectionsBoat,
  Refresh,
  OpenInNew
} from "@mui/icons-material";
import Navbar from "./Navbar";

export default function DailyVesselMovement({ user }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const iframeUrl = "https://www.pqa.gov.pk/pqa/portoperation/ExpectedShipArrivalAtOuterAnchorage";

  const handleIframeLoad = () => {
    setLoading(false);
    setError(false);
  };

  const handleIframeError = () => {
    setLoading(false);
    setError(true);
  };

  const handleRefresh = () => {
    setLoading(true);
    setError(false);
    // Force iframe reload
    const iframe = document.getElementById('vessel-iframe');
    if (iframe) {
      iframe.src = iframe.src;
    }
  };

  const handleOpenInNew = () => {
    window.open(iframeUrl, '_blank');
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Navbar user={user} />

      {/* Header */}
      <Paper elevation={3} sx={{ p: 3, mb: 3, bgcolor: 'primary.main', color: 'white' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <DirectionsBoat sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="h4" fontWeight={700}>
                Daily Vessel Movement
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
                Expected Ship Arrival at Outer Anchorage
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Refresh">
              <IconButton 
                onClick={handleRefresh}
                sx={{ 
                  color: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
                }}
              >
                <Refresh />
              </IconButton>
            </Tooltip>

            <Tooltip title="Open in New Tab">
              <IconButton 
                onClick={handleOpenInNew}
                sx={{ 
                  color: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
                }}
              >
                <OpenInNew />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Paper>

      {/* Error Alert */}
      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 3 }}
          action={
            <IconButton
              aria-label="refresh"
              color="inherit"
              size="small"
              onClick={handleRefresh}
            >
              <Refresh />
            </IconButton>
          }
        >
          Failed to load the page. Click refresh to try again or open in a new tab.
        </Alert>
      )}

      {/* Loading Indicator */}
      {loading && (
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1
          }}
        >
          <CircularProgress size={60} />
        </Box>
      )}

      {/* Iframe Container */}
      <Paper 
        elevation={2} 
        sx={{ 
          height: 'calc(100vh - 280px)',
          minHeight: '600px',
          overflow: 'hidden',
          position: 'relative',
          bgcolor: loading ? 'grey.100' : 'white'
        }}
      >
        <iframe
          id="vessel-iframe"
          src={iframeUrl}
          title="Daily Vessel Movement"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            display: loading ? 'none' : 'block'
          }}
        />
      </Paper>

      {/* Footer Info */}
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          Data source: Port Qasim Authority (PQA) - Official Portal
        </Typography>
      </Box>
    </Container>
  );
}   