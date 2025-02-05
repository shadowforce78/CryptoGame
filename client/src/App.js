import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import HomePage from './components/HomePage';
import Market from './components/Market';
import Profile from './components/Profile';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          !isAuthenticated 
            ? <Login onLogin={(userData) => {
                setIsAuthenticated(true);
                setUser(userData);
              }} />
            : <Navigate to="/home" />
        } />
        <Route path="/home" element={
          isAuthenticated 
            ? <HomePage username={user.username} onLogout={handleLogout} />
            : <Navigate to="/login" />
        } />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/market" element={
          isAuthenticated 
            ? <Market />
            : <Navigate to="/login" />
        } />
        <Route 
          path="/profile" 
          element={
            isAuthenticated 
              ? <Profile user={user} />
              : <Navigate to="/login" />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
