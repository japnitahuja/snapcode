import React, {useEffect, useState} from 'react';
import './CodeTabContent.css';
import cameraIcon from '../../assets/camera.png';
import logo from "../../assets/logo.png"
import camera from "../camera"

const CodeTabContent = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [capturedImage, setCapturedImage] = useState(null);

    useEffect(() => {
            console.log('Selected file:', selectedFile);
      }, [selectedFile]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
      setSelectedFile(file);
      };
    
      const handleUpload = () => {
        // Open the file input dialog when the button is clicked
        const fileInput = document.getElementById('upload-input');
        fileInput.click();
      };
    

      

  const handleCaptureButtonClick = async () => {

    camera.startCamera();
    camera.takeSnapshot();
   
  };
   

  return (
    <div className="code-tab-content">
      <img src={logo} alt="Big Logo" className="big-logo" />
      <p className='text'>Ready to start?</p>
      <div className="button-container">
        <button className="purple-button" onClick={handleCaptureButtonClick}>
          <img src={cameraIcon} alt="Camera" className="camera-icon" />
        </button>
        <input
          type="file"
          id="upload-input"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      <button className="outline-purple-button" onClick={handleUpload}>Upload Image</button>
      
        
      </div>
    </div>
  );
};

export default CodeTabContent;
