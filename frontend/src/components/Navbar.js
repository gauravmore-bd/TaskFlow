import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to={isAdmin() ? '/admin' : '/dashboard'} className="navbar-logo">
          TaskFlow
        </Link>

        <div className="navbar-menu">
          <div className="navbar-user">
            <span className="user-name">{user?.name}</span>
            <span className="user-role">{user?.role}</span>
          </div>

          {isAdmin() && (
            <Link to="/admin" className="navbar-link">
              Admin Panel
            </Link>
          )}

          {!isAdmin() && (
            <Link to="/dashboard" className="navbar-link">
              My Tasks
            </Link>
          )}

          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;