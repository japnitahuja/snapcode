import React, { useState } from 'react';
import './LogInForm.css'; 
import LongButton from "../LongButton/LongButton";
import { Link } from 'react-router-dom';
import redErrorIcon from "../../assets/red-error.png";
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';

function LogInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('Logging in with', email, password);

    signInWithEmailAndPassword(auth,email, password).then((cred) => {
      setError('');
      console.log(cred.user.getIdToken())
    }).catch(error => {
      console.log(error)
      setError("Invalid credentials.")
      return;
    });
  };

  const logout = (event) => {
    event.preventDefault();
    signOut(auth);
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Log In</h2>
        {error && 
        <div className='error-row'>
          <img src={redErrorIcon} />
          <div className="error-message">{error}</div>
        </div>}
        <div className="input-group">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <LongButton text="Log In"/>
        <button onClick={logout}>Log Out</button>
        <p>
          Don’t have an account? <Link to="/signup" className="link">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default LogInForm;
