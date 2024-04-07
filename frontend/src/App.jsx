import React from "react";
import "./App.css";
import Camera from "react-html5-camera-photo";
import ConfirmImage from "./components/ConfirmImage/ConfirmImage";
import { Routes, Route } from "react-router-dom";
import CodeViewer from "./components/CodeViewer/CodeViewer";
import MainDashboard from "./pages/MainDashboard/MainDashboard";
import SplashPage from "./pages/SplashPage/SplashPage";
import './styles/global.css';
import LogInPage from "./pages/LogInPage/LogInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import { useAuthContext } from "./contexts/authContext";


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
        <Route path="/dashboard" element={<MainDashboard />} />
        <Route path="/confirmImage" element={<ConfirmImage />} />
        <Route path="/codeViewer" element={<CodeViewer />} />
      </Routes>
    </div>
  );
}

export default App;
