import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gérer la connexion ici
    console.log('Login attempt:', username);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>CryptoGame</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Se connecter</button>
        </form>
        <p className="register-link">
          Pas encore de compte? <a href="/register">S'inscrire</a>
        </p>
      </div>
    </div>
  );
}

export default App;
