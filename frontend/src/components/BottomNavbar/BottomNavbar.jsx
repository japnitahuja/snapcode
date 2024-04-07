import React, { useState } from "react";
import "./BottomNavbar.css"; 
import add_grey from "../../assets/add_grey.png"
import add_purple from "../../assets/add_purple.png"
import home_grey from "../../assets/home_grey.png"
import home_purple from "../../assets/home_purple.png"
import account_grey from "../../assets/account_grey.png"
import account_purple from "../../assets/account_purple.png"

const BottomNavbar = ({handleChange}) => {
  const [selected,setSelected] = useState(0);

  const handleClick = (number,value) => {
    setSelected(number);
    handleChange(value);
  }

  return (
    <div className="lower-nav">
      <button className={`nav-item ${selected===0?'selected':''}`} onClick={()=>handleClick(0,"home")}>
        <img className="nav-item-icon" src={selected==0?home_purple:home_grey}/>
        <div className="nav-item-text">Home</div>
      </button>
      <button className={`nav-item ${selected===1?'selected':''}`} onClick={()=>handleClick(1,"code")}>
        <img className="nav-item-icon" src={selected==1?add_purple:add_grey}/>
        <div className="nav-item-text">Code</div>
      </button>
      <button className={`nav-item ${selected===2?'selected':''}`} onClick={()=>handleClick(2,"account")}>
        <img className="nav-item-icon" src={selected==2?account_purple:account_grey}/>
        <div className="nav-item-text">Account</div>
      </button>
    </div>
  );
};

export default BottomNavbar;
