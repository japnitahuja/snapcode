import React, { useState } from "react";
import "./HomeDashboard.css"; // Create a CSS file for styling
import Tabs from "../../components/Tabs/Tabs";
import CodeTabContent from "../../components/CodeTabContent/CodeTabContent";
import { useLocation } from "react-router-dom";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import BottomNavbar from "../../components/BottomNavbar/BottomNavbar";
import ExerciseList from "../../components/ExerciseList/ExerciseList";

const HomeDashboard = () => {
  const [bottomNavSelected,setBottomNavSelected] = useState("home");

  const renderContent = () => {
    switch (bottomNavSelected) {
      case "home":
        return <ExerciseList/>;
      case "code":
        return <div>code</div>
      case "account":
        return <div>account</div>
      default:
        return null;
  }
  }

  return (
    <div>
      <TopNavbar title={bottomNavSelected == "home" ? "Dashboard":"Account"}/>
      <div className="content-container">{renderContent()}</div>
      <BottomNavbar handleChange={setBottomNavSelected}/>
    </div>
  );
};

export default HomeDashboard;
