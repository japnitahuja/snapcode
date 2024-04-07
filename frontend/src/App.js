import React from "react";
import "./App.css";
import Camera from "react-html5-camera-photo";
import ConfirmImage from "./components/ConfirmImage/ConfirmImage";
import { Routes, Route } from "react-router-dom";
import CodeViewer from "./components/CodeViewer/CodeViewer";
import MainDashboard from "./pages/MainDashboard/MainDashboard";
import SplashPage from "./pages/SplashPage/SplashPage";
import './styles/global.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SplashPage/>}/>
        <Route path="/dashboard" element={<MainDashboard />} />
        <Route path="/confirmImage" element={<ConfirmImage />} />
        <Route path="/codeViewer" element={<CodeViewer />} />
      </Routes>
    </div>
  );
}

export default App;
