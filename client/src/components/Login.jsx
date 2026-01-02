import React, { useContext } from 'react';
import { GeneralContext } from '../context/GeneralContext';

const Login = ({ setAuthType }) => {
  const { setEmail, setPassword, login } = useContext(GeneralContext);

  const handleLogin = async (event) => {
    event.preventDefault();
    await login();
  };

  return (
    <form className="auth-card" onSubmit={handleLogin}>
      <h2>Sign in</h2>
      <p className="auth-lede">Enter your credentials to reconnect with your project rooms and collaborators.</p>

      <div className="form-field">
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>

      <button type="submit">Enter the studio</button>

      <p className="form-switch">
        Need an account?
        <button type="button" onClick={() => setAuthType('register')}>
          Create one
        </button>
      </p>
    </form>
  );
};

export default Login;