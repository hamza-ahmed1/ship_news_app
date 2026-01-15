import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import LanguageIcon from '@mui/icons-material/Language';

import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { IconButton, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";
import {
  CloudUpload,
  DirectionsBoat,
  Business,
  People,
  Logout,
  Home,
  Newspaper
} from '@mui/icons-material';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Menu items with their routes and icons
  const menuItems = [
    { 
      text: 'Visit Website', 
      icon: <LanguageIcon />, 
      route: '/home' 
    },

    { 
      text: 'Upload Ship News', 
      icon: <CloudUpload />, 
      route: '/admin/upload-news' 
    },
 { 
    text: 'Daily Vessel Updates', 
    icon: <DirectionsBoat />,
    children: [
      {
        text: 'Port Qasim',
        route: '/admin/vessel-updates/port-qasim'
      },
      {
        text: 'KPT',
        route: '/admin/vessel-updates/kpt'
      }
    ]
  },

    { 
      text: 'Add Ship Company', 
      icon: <Business />, 
      route: '/admin/add-company' 
    },
    { 
      text: 'All Users', 
      icon: <People />, 
      route: '/admin/users' 
    },
  ];

  const handleMenuClick = (route) => {
    navigate(route);
    setOpen(false);
  };

  // Get page title based on current route
  const getPageTitle = () => {
    const currentItem = menuItems.find(item => item.route === location.pathname);
    if (currentItem) {
      return `Admin Panel > ${currentItem.text}`;
    }
    // Default titles for specific routes
    switch(location.pathname) {
      case '/admin/upload-news':
        return 'Admin Panel > Upload Ship News';
      case '/latest-news':
        return 'Port Operations > Latest Shipping News';
      case '/home':
        return 'Port Operations > Dashboard';
      default:
        return 'Admin Panel > News Manager';
    }
  };

  const DrawerList = (
    <Box sx={{ width: 280 }} role="presentation">
      <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="h6" fontWeight={600}>
   Port Operations System
        </Typography>

      </Box>

      <Divider />

      <List>
       {menuItems.map((item) => (
  <React.Fragment key={item.text}>
    {/* Parent Menu Item */}
    <ListItem disablePadding>
      <ListItemButton
        onClick={() => item.route && handleMenuClick(item.route)}
        selected={item.route && location.pathname === item.route}
        sx={{
          '&.Mui-selected': {
            backgroundColor: 'primary.light',
            '&:hover': {
              backgroundColor: 'primary.light',
            },
          },
        }}
      >
        <ListItemIcon
          sx={{
            color:
              item.route && location.pathname === item.route
                ? 'primary.main'
                : 'inherit',
          }}
        >
          {item.icon}
        </ListItemIcon>

        <ListItemText
          primary={item.text}
          primaryTypographyProps={{
            fontWeight:
              item.route && location.pathname === item.route ? 600 : 400,
          }}
        />
      </ListItemButton>
    </ListItem>

    {/* Sub Menu Items */}
    {item.children &&
      item.children.map((child) => (
        <ListItem key={child.text} disablePadding sx={{ pl: 4 }}>
          <ListItemButton
            onClick={() => handleMenuClick(child.route)}
            selected={location.pathname === child.route}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'primary.light',
                '&:hover': {
                  backgroundColor: 'primary.light',
                },
              },
            }}
          >
            <ListItemText
              primary={child.text}
              primaryTypographyProps={{
                fontWeight:
                  location.pathname === child.route ? 600 : 400,
              }}
            />
          </ListItemButton>
        </ListItem>
      ))}
  </React.Fragment>
))}

      </List>

      <Divider />

      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout} sx={{ color: 'error.main' }}>
            <ListItemIcon>
              <Logout sx={{ color: 'error.main' }} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ mb: 3 }}>
      <AppBar position="static" elevation={2}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {getPageTitle()}
          </Typography>

          <Button 
            color="inherit" 
            onClick={() => navigate('/home')}
            sx={{ mr: 1 }}
          >
            Home
          </Button>
          
          <Button 
            color="inherit" 
            startIcon={<Logout />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer 
        open={open} 
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { width: 280 }
        }}
      >
        {DrawerList}
      </Drawer>
    </Box>
  );
}