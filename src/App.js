import logo from './logo.svg';
import './App.css';
import Home from './components/home';
import SignIn from './components/signin';
import SignUp from './components/signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './firebase/config';
import React from 'react';
import LatestNews from './components/LatestNews';
import AdminPanel from './components/AdminPanel/AdminPanel';
import DailyVesselMovement from './components/DailyVesselMovement';
import { CircularProgress, Box } from "@mui/material";
import VesselDailyUpdate from './components/AdminPanel/PortQasim';

function App() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

if (loading) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh", // center vertically
      }}
    >
      <CircularProgress />
    </Box>
  );
}

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home setUser={setUser} user={user} />} />
        <Route path="/signin" element={!user ? <SignIn setUser={setUser}/> : <Home setUser={setUser} user={user}/>} />
        <Route path="/signup" element={<SignUp setUser={setUser}/>} />
        <Route path="/home" element={user ? <Home setUser={setUser} user={user}/> : <SignIn setUser={setUser}/>} />
        <Route path="/latest-news" element={user ? <LatestNews user={user} /> : <SignIn setUser={setUser}/>} />
        <Route path="/admin-panel" element={user ? <AdminPanel /> : <SignIn setUser={setUser}/>} />
        <Route path="/daily-vessel-movement" element={user ? <DailyVesselMovement user={user} /> : <SignIn setUser={setUser}/>} />
        {/* for Port Qasim Updates routes */}
        <Route path='/admin/vessel-updates/port-qasim' element={user ? <VesselDailyUpdate/>:<SignIn setUser={setUser}/>} />

      </Routes>
    </Router>
  );
}

export default App;
