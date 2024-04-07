import React from "react";
import "./TopNavbar.css"; // Create a CSS file for styling
import backarrow from "../../assets/backarrow.png";

const TopNavbar = ({ title, leftimage, rightimage }) => {
  return (
    <div className="navbar">
      <div className="left-content">
        {leftimage == false ? null : (
          <img
            src={backarrow}
            alt="Back Arrow"
            className="arrow"
            style={{ height: "20px", width: "11px" }}
          />
        )}
      </div>
      <div className="title">{title}</div>
      <div className="right-content"></div>
    </div>
  );
};

export default TopNavbar;
