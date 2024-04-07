import React, { useState } from 'react';
import './SignUpForm.css'; 
import LongButton from "../LongButton/LongButton";
import { Link } from 'react-router-dom';
import redErrorIcon from "../../assets/red-error.png";
import {auth, createUserWithEmailAndPassword} from "../../config/firebase";

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password.length < 6) {
      setError('Password should be atleast 6 characters.')
      return;
    }
    else if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    console.log('Signing up with', email, password);
    
    createUserWithEmailAndPassword(auth, email, password).then(cred => {
      setError('');
      console.log(cred.user);
    }).catch(error => {
      if (error.code === "auth/email-already-in-use"){
        setError("This email already has an account. Try Logging In.")
        return;
      } else if (error.code === "auth/invalid-email"){
        setError("Enter valid email.")
        return;
      }else {
        setError("An error occured")
        console.log(error.code);
        return;
      }
    });
    
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
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        
        <LongButton text="Sign Up" onClick={handleSubmit}/>
        <p>
          Have an account? <Link to="/login" className="link">Log In</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUpForm;
