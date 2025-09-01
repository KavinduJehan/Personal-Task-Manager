import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/kanban', label: 'To-Do' },
    { path: '/work-mode', label: 'Work Mode' },
    { path: '/grading', label: 'Grading' },
    { path: '/diary', label: 'Diary' },
  ];

  return (
    <nav className="navigation">
      <div className="nav-profile">
        <div className="profile-pic"></div>
      </div>
      
      <div className="nav-links">
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;