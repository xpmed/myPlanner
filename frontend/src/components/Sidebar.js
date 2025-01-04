import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ onLogout }) => {
  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <ul>
        <li>
          <Link to="/todo">Lista zadań</Link>
        </li>
        <li>
          <Link to="/calendar">Kalendarz</Link>
        </li>
        <li>
          <Link to="/shoplist">Lista zakupów</Link>
        </li>
        <li>
          <Link to="/forecast">Pogoda</Link>
        </li>
        <li>
          <Link to="/news">Wiadomości</Link>
        </li>
      </ul>
      <button onClick={onLogout}>Wyloguj</button>
    </div>
  );
};

export default Sidebar;
