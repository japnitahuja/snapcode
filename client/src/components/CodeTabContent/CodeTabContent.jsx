import React, { useState } from "react";
import "./CodeTabContent.css";
import cameraIcon from "../../assets/camera.png";
import logo from "../../assets/logo.png";
import camera from "../camera";
import { useNavigate } from "react-router-dom";

const CodeTabContent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    console.log("Selected file:", file);
    if (file) {
      // Read the file content as a buffer
      const reader = new FileReader();

      reader.onloadend = () => {
        const buffer = reader.result; // This is the buffer containing the file content
        console.log("File Content as Buffer:", buffer);
        // Convert ArrayBuffer to Data URL
        const dataUrl = `data:${file.type};base64,${arrayBufferToBase64(
          buffer
        )}`;
        setImageSrc(dataUrl);
        navigate("/confirmImage", {
          state: {
            imageData: dataUrl,
            imageBuffer: buffer,
            file: file,
          },
        });
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;

    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }

    return btoa(binary);
  };

  const handleUpload = () => {
    // Open the file input dialog when the button is clicked
    const fileInput = document.getElementById("upload-input");
    fileInput.click();
    console.log("Selected file:", selectedFile);
  };

  const handleCaptureButtonClick = async () => {
    camera.startCamera();
    camera.takeSnapshot();
  };

  return (
    <div className="code-tab-content">
      <img src={logo} alt="Big Logo" className="big-logo" />
      <p className="text">Ready to start?</p>

      <button className="purple-button" onClick={handleCaptureButtonClick}>
        <img src={cameraIcon} alt="Camera" className="camera-icon" />
      </button>
      <input
        type="file"
        id="upload-input"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <button className="outline-purple-button" onClick={handleUpload}>
        Upload Image
      </button>
      {imageSrc && (
        <div>
          <p>Selected Image:</p>
          <img
            src={imageSrc}
            alt="Selected"
            style={{ maxWidth: "100%", maxHeight: "300px" }}
          />
        </div>
      )}
    </div>
  );
};

export default CodeTabContent;
