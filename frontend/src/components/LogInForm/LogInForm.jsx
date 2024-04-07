import React, { useState } from 'react';
import './LogInForm.css'; 
import LongButton from "../LongButton/LongButton";
import { Link } from 'react-router-dom';

function LogInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the form submission logic here, e.g., authenticating the user
    console.log('Logging in with', email, password);
    // Redirect to another route upon success, if needed
    // history.push('/dashboard');
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Log In</h2>
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
        <p>
          Don’t have an account? <Link to="/signup" className="link">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default LogInForm;
