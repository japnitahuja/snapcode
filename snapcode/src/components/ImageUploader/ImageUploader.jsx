import React, { useState } from 'react';

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Perform the upload or save logic here
      console.log("Uploading:", selectedFile);
      // You can use FormData or any other method to send the file to the server or save it locally
    } else {
      console.error("No file selected");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ImageUploader;