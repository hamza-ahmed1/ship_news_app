import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Menu,
  MenuItem
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Bold, Ship } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { signOut, onAuthStateChanged } from "firebase/auth";

export default function Navbar() {
  const navigate = useNavigate();

  /* ================= STATES ================= */
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [user, setUser] = useState(null);

  /* ================= FIREBASE AUTH LISTENER ================= */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  /* ================= DROPDOWN HANDLERS ================= */
  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  const handlePortSelect = (port) => {
    handleMouseLeave();
    navigate(`/daily-vessel-movement/${port}`);
  };

  /* ================= LOGOUT ================= */
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      {/* ==================== FIRST ROW: LOGO ==================== */}
    {/* ==================== FIRST ROW: LOGO ==================== */}
      <Box
        sx={{
          py: -9,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderBottom: "1px solid #eee"
        }}
      >
        <img 
          src="/assets/logo.png" 
          alt="Wharf Logo" 
          style={{ height: "9rem", width: "auto" }}
        />
      </Box>

      {/* ==================== SECOND ROW: NAVBAR ==================== */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 5,
          py: 3,
          borderBottom: "1px solid #eee",
          backgroundColor: "#f7c961",
          position: "relative"
        }}
      >
        {/* ===== NAV LINKS ===== */}
        <Box sx={{ display: "flex", gap: 5, fontSize: "18px" }}>
          <Link to="/home" style={linkStyle}>Home</Link>
          <Link to="/latest-news" style={linkStyle}>Latest News</Link>

          {/* ===== DROPDOWN ===== */}
          <Box
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{ position: "relative" }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                cursor: "pointer",
                color: "#0a4d68",
                fontWeight: 100,
                "&:hover": { textDecoration: "underline" }
              }}
            >
              {/* make it bold text */}
              <Typography component="span" sx={{ fontWeight: "bold" }}>
                Daily Vessel Movement
              </Typography>
              <KeyboardArrowDownIcon fontSize="small" />
            </Box>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMouseLeave}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              MenuListProps={{ onMouseLeave: handleMouseLeave }}
            >
              <MenuItem onClick={() => handlePortSelect("port-qasim")}>
                Port Qasim
              </MenuItem>
              <MenuItem onClick={() => handlePortSelect("karachi-port-trust")}>
                Karachi Port Trust
              </MenuItem>
            </Menu>
          </Box>
          <Link to="/about" style={linkStyle}>About Us</Link>

          <Link to="/contact" style={linkStyle}>Contact</Link>
        </Box>

        {/* ===== LOGIN / LOGOUT ===== */}
        <Box
          sx={{
            position: "absolute",
            right: 40
          }}
        >
          {user ? (
            <Button
              color="error"
              variant="outlined"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Button
              color="primary"
              variant="outlined"
              onClick={() => navigate("/signin")}
            >
              Login
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
}

/* ==================== STYLES ==================== */
const linkStyle = {
  color: "#0a4d68",
  textDecoration: "none",
  fontWeight: 600
};
