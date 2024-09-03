import React from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

const Camera = ({ onTakePhoto }) => {
  const handleTakePhoto = (dataUri) => {
    // Do stuff with the photo...
    console.log('takePhoto');
    if (onTakePhoto) {
      onTakePhoto(dataUri);
    }
  };

  return (
    <Camera
      onTakePhoto={(dataUri) => handleTakePhoto(dataUri)}
    />
  );
};

export default Camera;
