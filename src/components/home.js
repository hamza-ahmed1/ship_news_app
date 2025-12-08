import React, { useState } from 'react';
import { Search, Ship, Anchor, MapPin, Calendar, Clock, Package, ArrowRight, TrendingUp, Activity } from 'lucide-react';
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
// import vessel mov comp:
import VesselMovement from './VesselMovement';
import ShippingCompanySelector from './ShippingCompanySelector';
// Shipping Company Selection Component

// Main Dashboard Component
const ShippingDashboard = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
    await signOut(auth);
    navigate("/"); // Redirect to sign-in
  };
    const handle_latest_news = async () => {
    navigate("/latest-news"); // Redirect to Latest News
  };
  return (
  <>
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #020617, #0f172a, #020617)',
      padding: '24px'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #22d3ee, #60a5fa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '8px'
          }}>
            Port Operations Dashboard
          </h1>
            {/* LOGOUT BUTTON */}
          <Button 
            variant="outlined" 
            color="error" 
            onClick={handleLogout}
          >
            Logout
            {/* add some space */}
            &nbsp; 
            &nbsp; 

          </Button>
                <Button 
            variant="outlined" 
            color="primary" 
            onClick={handle_latest_news}
          >
            Latest News
          </Button>
          <p style={{ color: '#94a3b8', fontSize: '18px', margin: 0 }}>Real-time vessel tracking and shipping management</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '24px' }}>
          <ShippingCompanySelector />
          <VesselMovement />
        </div>
      </div>
    </div>
  </>
  );
};

export default ShippingDashboard;