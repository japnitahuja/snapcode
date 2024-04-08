import React from "react";
import "./App.css";
import Camera from "react-html5-camera-photo";
import ConfirmImage from "./components/ConfirmImage/ConfirmImage";
import { Routes, Route } from "react-router-dom";
import CodeViewer from "./components/CodeViewer/CodeViewer";
import SplashPage from "./pages/SplashPage/SplashPage";
import './styles/global.css';
import LogInPage from "./pages/LogInPage/LogInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import { useAuthContext } from "./contexts/authContext";
import ExerciseDashboard from "./pages/ExerciseDashboard/ExerciseDashboard";
import HomeDashboard from "./pages/HomeDashboard/HomeDashboard";


function App() {
  const {
    isLoggedIn,
    isAuthContextLoading,
  } = useAuthContext();

  if(isAuthContextLoading){
    return <div>Loading...</div>
  }


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SplashPage/>}/>
        <Route path="/login" element={<LogInPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/dashboard" element={<HomeDashboard/>}/>
        <Route path="/exerciseDashboard/:exId" element={<ExerciseDashboard />} />
        <Route path="/confirmImage" element={<ConfirmImage />} />
        <Route path="/codeViewer" element={<CodeViewer />} />
      </Routes>
    </div>
  );
}

export default App;
