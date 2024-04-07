import React, { useState } from 'react';
import './SignUpForm.css'; 
import LongButton from "../LongButton/LongButton";
import { Link } from 'react-router-dom';
import redErrorIcon from "../../assets/red-error.png";

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    // Handle the sign-up logic here, e.g., creating the user
    console.log('Signing up with', email, password);
    // Redirect or show success message
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Sign Up</h2>
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
        <div className="input-group">
          <input
            type="password"
            placeholder="Confirm Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <LongButton text="Sign Up"/>
        <p>
          Have an account? <Link to="/login" className="link">Log In</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUpForm;
