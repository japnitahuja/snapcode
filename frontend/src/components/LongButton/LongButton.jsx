import React from "react";
import "./LongButton.css"; 


const LongButton = ({ text, onClick, isOutline}) => {
  return (
    <button className={isOutline == true? "outline": "solid"} onClick={onClick}>{text}</button>
  );
};

export default LongButton;
