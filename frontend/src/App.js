// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Sidebar from './components/Sidebar';
import Calendar from './components/Calendar';
import Forecast from './components/Forecast';
import Account from './components/Account';
import News from './components/News.js';
import TodoList from './components/TodoList.js';
import ShopList from './components/ShopList.js';
import Modal from 'react-modal';
import './App.css';

Modal.setAppElement('#root');

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [activities, setActivities] = useState({});

  const handleLoginSuccess = (token) => {
    setAccessToken(token);
    setIsAuthenticated(true);
  };

  const toggleForm = () => {
    setShowRegister(!showRegister);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAccessToken('');
  };

  // Funkcja dodawania aktywności
  const addActivity = (day, activity) => {
    const newActivities = { ...activities };
    if (!newActivities[day]) {
      newActivities[day] = [];
    }
    newActivities[day].push(activity);
    setActivities(newActivities);
  };

  return (
    <Router>
      <div className="App">
        {!isAuthenticated ? (
          <>
            <h1>Mój Planner</h1>
            <div className="container-login">
              {showRegister ? (
                <Register toggleForm={toggleForm} />
              ) : (
                <Login setAccessToken={handleLoginSuccess} toggleForm={toggleForm} />
              )}
            </div>
          </>
        ) : (
          <div className="app-layout">
            <Sidebar onLogout={handleLogout} />
            <div className="content">
              <Routes>
                <Route path="/" element={<Navigate to="/calendar" />} />
                <Route 
                  path="/calendar" 
                  element={<Calendar activities={activities} addActivity={addActivity} />} 
                />
                <Route path="/forecast" element={<Forecast />} />
                <Route path="/account" element={<Account />} />
                <Route path="/news" element={<News />} />
                <Route path="/todo" element={<TodoList />} />
                <Route path="/shoplist" element={<ShopList />} />
                <Route path="/account" element={<Account accessToken={accessToken} />} />
              </Routes>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
