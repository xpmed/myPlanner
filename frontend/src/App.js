import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  const handleLoginSuccess = (token) => {
    setAccessToken(token);
    setIsAuthenticated(true);
  };

  const toggleForm = () => {
    setShowRegister(!showRegister);
  };

  return (
    <div className="App">
      <h1>System Rezerwacji</h1>

      {!isAuthenticated ? (
        <div className="container">
          {showRegister ? (
            <div>
              <Register toggleForm={toggleForm} />
            </div>
          ) : (
            <div>
              <Login setAccessToken={handleLoginSuccess} toggleForm={toggleForm} />
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2>Witaj, Zalogowano!</h2>
          <p>Twój token dostępu: {accessToken}</p>
        </div>
      )}
    </div>
  );
}

export default App;
