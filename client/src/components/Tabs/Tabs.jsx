import React from "react";
import "./Tabs.css";

const Tabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="tabs-container">
      <div
        className={`tab ${activeTab === "exercise" ? "active" : ""}`}
        onClick={() => onTabChange("exercise")}
      >
        Exercise
      </div>
      <div
        className={`tab ${activeTab === "code" ? "active" : ""}`}
        onClick={() => onTabChange("code")}
      >
        Code
      </div>
      <div
        className={`tab ${activeTab === "output" ? "active" : ""}`}
        onClick={() => onTabChange("output")}
      >
        Output
      </div>
    </div>
  );
};

export default Tabs;
