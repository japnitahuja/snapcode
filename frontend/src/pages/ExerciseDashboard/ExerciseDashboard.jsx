import React, { useEffect, useState } from "react";
import "./ExerciseDashboard.css"; // Create a CSS file for styling
import Tabs from "../../components/Tabs/Tabs";
import CodeTabContent from "../../components/CodeTabContent/CodeTabContent";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import CodeViewer from "../../components/CodeViewer/CodeViewer";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import WebsiteView from "../../components/WebsiteView/WebsiteView";
import { exercises } from "../../data/exercises";
import ExerciseInformation from "../../components/ExerciseInformation/ExerciseInformation";

const ExerciseDashboard = () => {
  const { state } = useLocation();
  const {exId} = useParams();
  const [activeTab, setActiveTab] = useState("code");
  const [HTMLCode, setHTMLCode] = useState(false);
  const [showTabs, setShowTabs] = useState(true);
  const [topNavbarTitle, setTopNavbarTitle] = useState(
    exercises[exId].title
  );
  const [ocrOutput,setOCROutput] = useState(state?.ocrOutput);
  const [topNavbarBackLink, setTopNavbarBackLink] = useState("");
  const navigate = useNavigate();

  // let ocrOutput = [
  //   "<html>",
  //   "<p> this is a paragraph </p>",
  //   "<hl> I didn't close this tag",
  //   "<h2> I closed this </ha>",
  //   "</htmle",
  // ];
  // ocrOutput = [
  //   "<html>",
  //   "<p> this is a paragraph </p>",
  //   "<h3>",
  //   "I didnt close",
  //   "<h2> I closed this </h2>",
  //   "</html>",
  // ];
  let ocrOutput2 = ['<html>', '<head>', '<title> Document </title>', '</head>', '<body>', '<hl> About me </hl>', '<h3> Introduction </h3>', '<p>My name is <b> Priya<lb> and I am', '14 years old. I live in Delhi. </p>', '<h2> My Likes and Dislikes </h2>', '<hu> Likes </h4>', '<p> I like reading comic books and watching', 'movies. </p>', "<p> I don't like cats and the colour", '<h4> My Dislikes </hu>', 'green. c/p>', '</body>', '</html>']
  //ocrOutput2 = ['<html>', '<head>', '<title> MyWebsite </title>', '</head>', '<body>', '<hl>E </hl>', '<h2> FP</h2>', '<h3> TOZ </h3>', '<h4> LPED </h4>', '<h5> P EC F O / h5>', '<h6>EDFC Z P</hb>', '</body>', '</html>']
  
  // console.log(state);
  // if (state?.ocrOutput) {
  //   setOCROutput(state.ocrOutput);
  // }


  console.log(ocrOutput);
  const renderContent = () => {
    switch (activeTab) {
      case "exercise":
        return <ExerciseInformation exId={exId}/>
      case "code":
        if (!ocrOutput || ocrOutput == undefined || ocrOutput==null) {
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
      case "output":
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
      <TopNavbar title={topNavbarTitle} leftOnClick={()=>{navigate("/dashboard")}}/>
      {showTabs ? (
        <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
      ) : null}
      <div className="content-container">{renderContent()}</div>
    </div>
  );
};

export default ExerciseDashboard;
