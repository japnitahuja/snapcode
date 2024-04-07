import React from 'react';
import './SignUpPage.css'; // Make sure to create a corresponding CSS file
import TopNavbar from '../../components/TopNavbar/TopNavbar';
import SignUpForm from '../../components/SignUpForm/SignUpForm';


function SignUpPage() {
  return (
    <div className="signup-container">
      <TopNavbar title={"Snapcode"} leftimage={false}/>
      <SignUpForm/>
    </div>
  );
}

export default SignUpPage;
