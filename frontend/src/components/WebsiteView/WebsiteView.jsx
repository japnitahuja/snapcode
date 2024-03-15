import React, { useState } from "react";
import "./WebsiteView.css";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import redErrorIcon from "../../assets/red-error.png";

const WebsiteView = ({ HTMLCode }) => {
  //maybe just run through html parser to double check for errors so that code doesnt break
  if (HTMLCode == false) {
    return (
      <div className="error-row" style={{ padding: "5px", fontSize: "1rem" }}>
        <img className="menu-icon" src={redErrorIcon} />
        <div className="menu-text">{`Fix all errors in code tab first.`}</div>
      </div>
    );
  }
  console.log(DOMPurify.sanitize(HTMLCode, { USE_PROFILES: { html: true } }));
  return (
    <div>
      {parse(DOMPurify.sanitize(HTMLCode, { USE_PROFILES: { html: true } }))}
    </div>
  );
};

export default WebsiteView;
