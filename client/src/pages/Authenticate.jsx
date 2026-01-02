import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import '../styles/authenticate.css';

const Authenticate = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const initialMode = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('mode') === 'register' ? 'register' : 'login';
  }, [location.search]);

  const [authType, setAuthType] = useState(initialMode);

  useEffect(() => {
    setAuthType(initialMode);
  }, [initialMode]);

  return (
    <div className="auth-page page-shell">
      <header className="auth-header" role="banner">
        <div className="brand-lockup" onClick={() => navigate('/') }>
          <span className="brand-glyph">SB</span>
          <span className="brand-wordmark">SB Works Atelier</span>
        </div>
        <button className="ghost-button" type="button" onClick={() => navigate('/') }>
          Return home
        </button>
      </header>

      <section className="auth-body panel-surface">
        <div className="auth-intro">
          <span className="eyebrow">Purpose-built for modern collaborators</span>
          <h1>{authType === 'login' ? 'Welcome back, maker.' : 'We saved you a seat at the table.'}</h1>
          <p>
            {authType === 'login'
              ? 'Sign in to rejoin your project rooms, pick up conversations where you left off, and keep momentum flowing.'
              : 'Create an account to curate briefs, collaborate with teams who respect the craft, and steward work that matters.'}
          </p>
          <div className="auth-toggle">
            <button
              className={authType === 'login' ? 'active' : ''}
              type="button"
              onClick={() => setAuthType('login')}
            >
              Sign in
            </button>
            <button
              className={authType === 'register' ? 'active' : ''}
              type="button"
              onClick={() => setAuthType('register')}
            >
              Create account
            </button>
          </div>
        </div>

        <div className="auth-forms">
          {authType === 'login' ? (
            <Login setAuthType={setAuthType} />
          ) : (
            <Register setAuthType={setAuthType} />
          )}
        </div>
      </section>
    </div>
  );
};

export default Authenticate;