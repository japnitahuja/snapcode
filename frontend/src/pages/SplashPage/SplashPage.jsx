import React from 'react';
import './SplashPage.css'; // Make sure to create a corresponding CSS file
import TopNavbar from '../../components/TopNavbar/TopNavbar';
import logo from "../../assets/logo.png"
import { Link } from 'react-router-dom';
import LongButton from '../../components/LongButton/LongButton';

function SplashPage() {
  return (
    <div className="splash-container">
      <TopNavbar title={"Snapcode"} leftimage={false}/>
      <div className="content">
        <h1 className='heading'>Welcome to <b>Snapcode</b>!</h1>
        <div className="code-icon">
          <img src={logo} ></img>
        </div>
        <div className="buttons">
          <Link to="/login" style={{width:"100%",textAlign:"center"}}>
          <LongButton text="Log In" isOutline={false}/>
          </Link>
          <Link to="/signup" style={{width:"100%",textAlign:"center"}}>
          <LongButton text="Sign Up" isOutline={true}/>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SplashPage;
