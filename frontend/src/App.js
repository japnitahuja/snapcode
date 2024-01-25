import React from "react";
import "./App.css";
import ExercisePage from "./pages/ExercisePage/ExercisePage";
import Camera from "react-html5-camera-photo";
import ConfirmImage from "./components/ConfirmImage/ConfirmImage";
import { Routes, Route } from "react-router-dom";
import CodeViewer from "./components/CodeViewer/CodeViewer";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ExercisePage />} />
        <Route path="/confirmImage" element={<ConfirmImage />} />
        <Route path="/codeViewer" element={<CodeViewer />} />
      </Routes>
    </div>
  );
}

export default App;
