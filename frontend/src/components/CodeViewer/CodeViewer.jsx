import React, { useState } from "react";
import "./CodeViewer.css"; // Import a CSS file for styling (create your own or modify as needed)

const CodeViewer = ({ ocrOutput }) => {
  console.log(ocrOutput.type);
  const [errorLines, setErrorLines] = useState([3, 5]); // Example: Lines with errors
  const [clickedLines, setClickedLines] = useState([]);

  const handleClick = (lineNumber) => {
    setClickedLines((prevClickedLines) => {
      if (prevClickedLines.includes(lineNumber)) {
        return prevClickedLines.filter((line) => line !== lineNumber);
      } else {
        return [...prevClickedLines, lineNumber];
      }
    });
  };

  const isLineError = (lineNumber) => errorLines.includes(lineNumber);

  const isLineClicked = (lineNumber) => clickedLines.includes(lineNumber);

  return (
    <div className="code-viewer">
      {ocrOutput.map((line, index) => (
        <div
          key={index}
          className={`code-line ${index % 2 === 0 ? "even" : "odd"} ${
            isLineError(index + 1) ? "error" : ""
          } ${isLineClicked(index + 1) ? "clicked" : ""}`}
          onClick={() => handleClick(index + 1)}
        >
          <span className="line-number">{index + 1}</span>
          <span className="code">{line}</span>
        </div>
      ))}
    </div>
  );
};

// Example HTML code lines (modify as needed)
const codeLines = [
  "<div>",
  "  <h1>Hello, World!</h1>",
  "  <p>This is a sample HTML code.</p>",
  "  <ul>",
  "    <li>Item 1</li>",
  "    <li>Item 2</li>",
  "  </ul>",
  "</div>",
];

export default CodeViewer;
