import React, { useState } from "react";
import "./ExerciseDashboard.css"; // Create a CSS file for styling
import Tabs from "../../components/Tabs/Tabs";
import CodeTabContent from "../../components/CodeTabContent/CodeTabContent";
import { useLocation } from "react-router-dom";
import CodeViewer from "../../components/CodeViewer/CodeViewer";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import WebsiteView from "../../components/WebsiteView/WebsiteView";

const ExerciseDashboard = () => {
  const [activeTab, setActiveTab] = useState("code");
  const [HTMLCode, setHTMLCode] = useState(false);
  const [showTabs, setShowTabs] = useState(true);
  const [topNavbarTitle, setTopNavbarTitle] = useState(
    "Exercise 1: Heading Tag"
  );
  const [topNavbarBackLink, setTopNavbarBackLink] = useState("");

  let ocrOutput = [
    "<html>",
    "<p> this is a paragraph </p>",
    "<hl> I didn't close this tag",
    "<h2> I closed this </ha>",
    "</htmle",
  ];
  ocrOutput = [
    "<html>",
    "<p> this is a paragraph </p>",
    "<h3>",
    "I didnt close",
    "<h2> I closed this </h2>",
    "</html>",
  ];
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
          return (
            <CodeViewer
              ocrOutput={ocrOutput}
              setShowTabs={setShowTabs}
              setTopNavbarTitle={setTopNavbarTitle}
              setHTMLCode={setHTMLCode}
            />
          );
        }
      case "website":
        return <WebsiteView HTMLCode={HTMLCode} />;
      default:
        return null;
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <TopNavbar title={topNavbarTitle} />
      {showTabs ? (
        <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
      ) : null}
      <div className="content-container">{renderContent()}</div>
    </div>
  );
};

export default ExerciseDashboard;