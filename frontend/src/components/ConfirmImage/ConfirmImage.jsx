import React from "react";
import "./ComfirmImage.css"; // Import your stylesheet for additional styling
import { useLocation, useNavigate } from "react-router-dom";

const ComfirmImage = () => {
  const { state } = useLocation();
  const { imageData, imageBuffer, file } = state;
  const navigate = useNavigate();
  console.log(imageBuffer);
  console.log(imageData);
  console.log(file);

  const getOCROutput = async () => {
    // Convert the image file to a FormData object
    const formData = new FormData();
    formData.append("image", file);

    try {
      // Send the fetch request
      const response = await fetch("http://localhost:8080/outputocr", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Assuming the backend responds with text, you can read it as follows
        const jsonData = await response.json();
        console.log("OCR Output:", jsonData);
        // jsonData.map((each) => console.log(each));
        navigate("/", { state: { ocrOutput: jsonData } });
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  return (
    <div className="container">
      <img src={imageData} alt="Your Image" className="main-image" />

      <div className="button-container">
        <p className="question-text">Satisfied with the photo?</p>
        <div className="button-wrapper">
          <button className="accept-button" onClick={getOCROutput}>
            Accept
          </button>
          <button className="redo-button">Redo</button>
        </div>
      </div>
    </div>
  );
};

export default ComfirmImage;
