import React, { useState } from 'react';
import './LogInForm.css'; 
import LongButton from "../LongButton/LongButton";
import { Link, useNavigate } from 'react-router-dom';
import redErrorIcon from "../../assets/red-error.png";
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useAuthContext } from '../../contexts/authContext';

function LogInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {setTriggerUpdateAuthContext} = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('Logging in with', email, password);

    signInWithEmailAndPassword(auth,email, password).then(async (cred) => {
      setError('');
      console.log(cred.user.getIdToken())
      try{
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({uid:cred.user.uid}),
        });
        if (response.ok){
          setTriggerUpdateAuthContext((prev)=>prev+1);
          navigate("/dashboard");
        }
      } catch (error) {
        console.log(error);
      }
    }).catch(error => {
      console.log(error)
      setError("Invalid credentials.")
      return;
    });
  };

  const logout = async (event) => {
    event.preventDefault();
    signOut(auth);
    try{
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok){
        setTriggerUpdateAuthContext((prev)=>prev+1);
      }
    } catch (error) {
      console.log(error);
    }
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
