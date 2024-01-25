import React, { useState } from "react";
import "./ExercisePage.css"; // Create a CSS file for styling
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import Tabs from "../../components/Tabs/Tabs";
import CodeTabContent from "../../components/CodeTabContent/CodeTabContent";
import { useLocation } from "react-router-dom";
import CodeViewer from "../../components/CodeViewer/CodeViewer";

const ExercisePage = () => {
  const [activeTab, setActiveTab] = useState("code");
  let ocrOutput = null;
  const { state } = useLocation();
  console.log(state);
  if (state?.ocrOutput) {
    ocrOutput = state.ocrOutput;
  }

  console.log(ocrOutput);
  const renderContent = () => {
    switch (activeTab) {
      case "exercise":
        return <div>Exercise content</div>;
      case "code":
        if (!ocrOutput) {
          return <CodeTabContent />;
        } else {
          return <CodeViewer ocrOutput={ocrOutput} />;
        }
      case "website":
        return <div>Website Page</div>;
      default:
        return null;
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <TopNavbar title="Exercise 1: Heading Tag" />
      <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
      <div className="content-container">{renderContent()}</div>
    </div>
  );
};

export default ExercisePage;
