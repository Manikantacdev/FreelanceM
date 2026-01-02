import React, { useContext, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';
import { GeneralContext } from '../context/GeneralContext';

const NAVIGATION_MAP = {
  freelancer: [
    { label: 'Dashboard', path: '/freelancer' },
    { label: 'All briefs', path: '/all-projects' },
    { label: 'My projects', path: '/my-projects' },
    { label: 'Applications', path: '/myApplications' },
  ],
  client: [
    { label: 'Dashboard', path: '/client' },
    { label: 'New brief', path: '/new-project' },
    { label: 'Applications', path: '/project-applications' },
  ],
  admin: [
    { label: 'Overview', path: '/admin' },
    { label: 'All users', path: '/all-users' },
    { label: 'Projects', path: '/admin-projects' },
    { label: 'Applications', path: '/admin-applications' },
  ],
};

const Navbar = () => {
  const userType = localStorage.getItem('usertype');
  const username = localStorage.getItem('username');
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(GeneralContext);

  const navItems = useMemo(() => NAVIGATION_MAP[userType] ?? [], [userType]);

  if (!userType) {
    return null;
  }

  return (
    <nav className="app-navbar" aria-label="Primary">
      <div className="nav-brand" onClick={() => navigate('/') }>
        <div className="brand-lockup">
          <span className="brand-glyph">SB</span>
          <div className="nav-brand-text">
            <span className="nav-subtle">SB Works Atelier</span>
            <strong>{userType} suite</strong>
          </div>
        </div>
      </div>

      <div className="nav-links">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              type="button"
              data-active={isActive ? 'true' : 'false'}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="nav-meta">
        <div className="nav-user-tag">
          <span className="nav-user-label">{username ? `Hello, ${username}` : 'Signed in'}</span>
          <span className="tag-chip is-accent">{userType}</span>
        </div>
        <button className="ghost-button" type="button" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;