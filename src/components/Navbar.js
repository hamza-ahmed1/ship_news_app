import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Select,
  MenuItem,
  Menu
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React, { useState } from "react";

// create a navbar with home, latest news, admin panel links
import { Link } from "react-router-dom";
import { Ship } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/config";
import { signOut } from "firebase/auth";

export default function Navbar() {
const [anchorEl, setAnchorEl] = useState(null);
const open = Boolean(anchorEl);

const handleMouseEnter = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleMouseLeave = () => {
  setAnchorEl(null);
};

const handlePortSelect = (port) => {
  setAnchorEl(null);
  navigate(`/daily-vessel-movement/${port}`);
};


      const navigate = useNavigate();
      const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };
    return (
       <>
            {/* ==================== FIRST ROW: LOGO ==================== */}
      <div
        style={{
          padding: "20px 0",
          textAlign: "center",
          borderBottom: "1px solid #eee"
        }}
      >
        <Ship size={45} color="#0a4d68" />
        <h1
          style={{
            margin: 0,
            fontSize: "34px",
            color: "#0a4d68",
            fontWeight: "800"
          }}
        >
          Wharf
        </h1>
      </div>

      {/* ==================== SECOND ROW: NAVBAR ==================== */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "18px 40px",
          borderBottom: "1px solid #eee",
          position: "relative"
        }}
      >
        <div style={{ display: "flex", gap: "40px", fontSize: "18px" }}>
          <a href="/home" style={{ color: "#0a4d68", textDecoration: "none", fontWeight: "600" }}>Home</a>
          <a href="/latest-news" style={{ color: "#0a4d68", textDecoration: "none", fontWeight: "600" }}>LatestNews</a>
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
      fontWeight: 600,
      fontSize: "18px",
      "&:hover": { textDecoration: "underline" }
    }}
  >
    <Typography component="span" sx={{ fontWeight: 600 }}>
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




          {/* gotto admin */}
          {/* <a href="/admin-panel" style={{ color: "#0a4d68", textDecoration: "none", fontWeight: "600" }}>AdminPanel</a> */}
          <a href="#" style={{ color: "#0a4d68", textDecoration: "none", fontWeight: "600" }}>Contact</a>
          {/* <a href="#" style={{ color: "#0a4d68", textDecoration: "none", fontWeight: "600" }}>Advertise</a> */}
        </div>

        {/* <button
          style={{
            position: "absolute",
            right: "40px",
            background: "#0a4d68",
            color: "white",
            border: "none",
            padding: "10px 22px",
            borderRadius: "6px",
            fontSize: "15px",
            cursor: "pointer"
          }}
        >
          LOGIN
        </button> */}
              {/* <button
          style={{
            position: "absolute",
            right: "40px",
            background: "#0a4d68",
            color: "white",
            border: "none",
            padding: "10px 22px",
            borderRadius: "6px",
            fontSize: "15px",
            cursor: "pointer",
            variant:"outlined",
                    color:"red" 
                    
          }}

          onClick={handleLogout}
        >
          LOGIN
        </button> */}
         <Box sx={{ mb: 2, display: 'flex', gap: 1 , padding: "10px 22px",}}>
                  <Button 
                    color="error"
                    cursor="pointer"
                    variant="outlined"
                    // right: "40px",
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                
             </Box>
      </div>
       </>
    );
}