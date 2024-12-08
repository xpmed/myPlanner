import React, { useState } from 'react';

const Login = ({ setAccessToken, toggleForm }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('http://127.0.0.1:8000/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      setAccessToken(data.access);
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div>
      <h2>Logowanie</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Nazwa użytkownika"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Zaloguj się</button>
      </form>
      <p>
        Nie masz konta? <a href="#" onClick={toggleForm}>Zarejestruj się</a>
      </p>
    </div>
  );
};

export default Login;
