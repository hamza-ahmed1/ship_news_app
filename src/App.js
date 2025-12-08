import logo from './logo.svg';
import './App.css';
import Home from './components/home';
import SignIn from './components/signin';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './firebase/config';
import React from 'react';
import LatestNews from './components/LatestNews';
import AdminPanel from './components/AdminPanel';

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
    return <h2>Loading...</h2>; // prevent flicker
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element=  {!user ? <SignIn setUser={setUser}/> : <Home />} />
        <Route path="/home" element={user ? <Home /> : <SignIn setUser={setUser}/>} />
        <Route path="/latest-news" element={user ? <LatestNews /> : <SignIn setUser={setUser}/>} />
        <Route path="/admin-panel" element={user ? <AdminPanel /> : <SignIn setUser={setUser}/>} />

      </Routes>
    </Router>
  );
}

export default App;
