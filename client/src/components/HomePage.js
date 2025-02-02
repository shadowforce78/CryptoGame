import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = ({ username, onLogout }) => {
  const navigate = useNavigate();

  const handleMarketClick = () => {
    navigate('/market');
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  return (
    <div className="home-container">
      <div className="button-group">
        <h1>Welcome {username}</h1>
        <button onClick={handleMarketClick}>Enter in the market</button>
        <button onClick={handleSettingsClick}>Settings</button>
        <button onClick={onLogout}>LogOut</button>
      </div>
    </div>
  );
};

export default HomePage;
