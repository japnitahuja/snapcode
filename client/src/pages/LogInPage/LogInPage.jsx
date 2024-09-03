import React from 'react';
import './LogInPage.css'; // Make sure to create a corresponding CSS file
import TopNavbar from '../../components/TopNavbar/TopNavbar';
import LogInForm from '../../components/LogInForm/LogInForm';


function LogInPage() {
  return (
    <div className="login-container">
      <TopNavbar title={"Snapcode"} leftimage={false}/>
      <LogInForm/>
    </div>
  );
}

export default LogInPage;
