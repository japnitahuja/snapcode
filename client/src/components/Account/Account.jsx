import React, { useState } from "react";
import "./Account.css"; 
import LongButton from "../LongButton/LongButton";
import { auth } from '../../config/firebase';
import { useAuthContext } from "../../contexts/authContext";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Account = ({handleChange}) => {
  const [selected,setSelected] = useState(0);
  const {setTriggerUpdateAuthContext,user} = useAuthContext();
  const navigate=useNavigate();

  console.log(user);

  const logout = async () => {
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
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="account-page">
    <div className="account-info">
      <h2>Welcome {user.email}!</h2>
    </div>
    <LongButton text="Logout" isOutline={true} onClick={logout}/>
  </div>
  );
};

export default Account;
