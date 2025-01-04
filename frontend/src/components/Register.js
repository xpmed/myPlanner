import React, { useState } from 'react';

const Register = ({ toggleForm }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    const response = await fetch('http://127.0.0.1:8000/api/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    if (response.ok) {
      setUsername('');
      setEmail('');
      setPassword('');
      toggleForm();
    } else {
      setError('Błąd rejestracji');
    }
  };

  return (
    <div>
      <h2>Rejestracja</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nazwa użytkownika"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Zarejestruj się</button>
      </form>
      <p>
        Masz już konto? <a href="#" onClick={toggleForm}>Zaloguj się</a>
      </p>
    </div>
  );
};

export default Register;
