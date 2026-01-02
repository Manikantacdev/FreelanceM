import React, { useContext } from 'react';
import { GeneralContext } from '../context/GeneralContext';

const Register = ({ setAuthType }) => {
  const { setUsername, setEmail, setPassword, setUsertype, register } = useContext(GeneralContext);

  const handleRegister = async (event) => {
    event.preventDefault();
    await register();
  };

  return (
    <form className="auth-card" onSubmit={handleRegister}>
      <h2>Create your profile</h2>
      <p className="auth-lede">Introduce yourself so we can tailor the right projects and partners to your craft.</p>

      <div className="form-field">
        <label htmlFor="register-username">Display name</label>
        <input
          id="register-username"
          name="username"
          type="text"
          placeholder="Ava the Storyteller"
          onChange={(event) => setUsername(event.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="Create a secure passphrase"
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="register-usertype">I am joining as</label>
        <select
          id="register-usertype"
          name="usertype"
          defaultValue=""
          onChange={(event) => setUsertype(event.target.value)}
          required
        >
          <option value="" disabled>
            Select a path
          </option>
          <option value="freelancer">Freelancer</option>
          <option value="client">Client</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <button type="submit">Join FreelanceM</button>

      <p className="form-switch">
        Already part of the studio?
        <button type="button" onClick={() => setAuthType('login')}>
          Sign in
        </button>
      </p>
    </form>
  );
};

export default Register;