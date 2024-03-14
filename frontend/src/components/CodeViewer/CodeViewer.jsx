import React, { useState, useEffect } from "react";
import "./CodeViewer.css"; // Import a CSS file for styling (create your own or modify as needed)
import {
  isValidTag,
  ocrOutputToHTML,
  validateClosingTags,
} from "../../utils/preprocessinghtml.jsx";
import editIcon from "../../assets/grey-edit.png";
import deleteIcon from "../../assets/red-delete.png";
import redErrorIcon from "../../assets/red-error.png";

const CodeViewer = ({ ocrOutput, setShowTabs }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userCode, setUserCode] = useState(ocrOutput);
  const [processedHTML, setProcessedHTML] = useState([]);
  const [numberOfInvalidTags, setNumberOfInvalidTags] = useState(-1);
  const [errorCorrectionStage, setErrorCorrectionStage] =
    useState("Invalid Tags");
  const [invalidTagsPopupOpen, setInvalidTagsPopupOpen] = useState(false);
  const [selectedLineNumber, setSelectedLineNumber] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [isInputValid, setIsInputValid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditingCodeLine, setIsEditingCodeLine] = useState(true);

  useEffect(() => {
    console.log("Input", userCode.join(""));
    let processedHTMLOutput = ocrOutputToHTML(userCode.join(""));
    let countInvalidTags = 0;
    processedHTMLOutput.forEach((line) => {
      if (line[1] == "invalid tag") {
        countInvalidTags += 1;
      }
    });
    console.log(countInvalidTags);
    setNumberOfInvalidTags(countInvalidTags);
    setProcessedHTML(processedHTMLOutput);
    setIsLoading(false);
  }, [ocrOutput]);

  useEffect(() => {
    console.log("Number of invalid tags changed to: ", numberOfInvalidTags);
    if (numberOfInvalidTags == 0) {
      setErrorCorrectionStage("Closing Tags");
      console.log(processedHTML);
      console.log(validateClosingTags(processedHTML));

      setProcessedHTML(validateClosingTags(processedHTML));
    }
  }, [numberOfInvalidTags]);

  useEffect(() => {
    setShowTabs(false);
  }, [isEditingCodeLine]);

  const handleInputChange = (e) => {
    const newInputValue = e.target.value;
    setInputValue(newInputValue);
    setIsInputValid(isValidTag(newInputValue));
  };

  const handleSubmit = () => {
    const updatedProcessedHTML = [...processedHTML];
    updatedProcessedHTML[selectedLineNumber][0] = inputValue;
    updatedProcessedHTML[selectedLineNumber][1] = "valid tag";
    setProcessedHTML(updatedProcessedHTML);
    setNumberOfInvalidTags((prevcount) => prevcount - 1);
    closePopup();
  };

  const handleClick = (lineNumber) => {
    const tagType = processedHTML[lineNumber][1];
    if (tagType === "invalid tag") {
      setSelectedLineNumber(lineNumber);
      setInputValue(processedHTML[lineNumber][0]);
      setIsInputValid(isValidTag(processedHTML[lineNumber][0]));
      setInvalidTagsPopupOpen(true);
    } else {
      setSelectedLineNumber(lineNumber);
      setMenuOpen(true);
    }
  };

  const closePopup = () => {
    setInvalidTagsPopupOpen(false);
    setSelectedLineNumber(null);
  };

  const closeMenuPopup = () => {
    setMenuOpen(false);
    setSelectedLineNumber(null);
  };

  const handleDeleteLine = () => {
    // Implement logic to delete the selected line
    // Update the state accordingly
  };

  const handleAddLine = () => {
    // Implement logic to add a line after the selected line
    // Update the state accordingly
  };

  const handleEditLine = () => {
    // Implement logic to add a line after the selected line
    // Update the state accordingly
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isEditingCodeLine) {
    return <div className="overlay">Editing code line</div>;
  }

  return (
    <div className="code-viewer">
      <h1>{errorCorrectionStage}</h1>
      {processedHTML.map((line, index) => (
        <div
          key={index}
          className={`code-line ${index % 2 === 0 ? "even" : "odd"} ${
            selectedLineNumber == index ? "error" : ""
          } `}
          onClick={() => handleClick(index)}
        >
          <span className="line-number">
            {line[1] === "invalid tag" ||
            line[1] === "unclosed open tag" ||
            line[1] === "extra closing tag" ? (
              <img src={redErrorIcon} style={{ width: "16px" }} />
            ) : (
              index + 1
            )}
          </span>
          <span className="code">{line[0]}</span>
        </div>
      ))}

      {invalidTagsPopupOpen && selectedLineNumber !== null && (
        <div className="overlay">
          <div className="popup">
            <div className="popup-header">
              <span onClick={closePopup} className="close-btn">
                &times;
              </span>
            </div>
            <div className="popup-body">
              <p>
                Line {selectedLineNumber + 1}:{" "}
                {processedHTML[selectedLineNumber][0]}
              </p>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                className={isInputValid ? "valid" : ""}
              />
              {isInputValid && <span className="check-mark">&#10003;</span>}
              <button
                onClick={handleSubmit}
                disabled={!isInputValid}
                className={isInputValid ? "submit-btn active" : "submit-btn"}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {menuOpen && selectedLineNumber !== null && (
        <div className="menu-overlay">
          <div className="menu-popup">
            <div className="menu-popup-header">
              <span onClick={closeMenuPopup} className="menu-close-btn">
                &times;
              </span>
            </div>
            <div className="menu-popup-body">
              <p className="menu-codeline">
                Line {selectedLineNumber + 1}:{" "}
                {processedHTML[selectedLineNumber][0]}
              </p>
              {processedHTML[selectedLineNumber][1] === "invalid tag" ||
              processedHTML[selectedLineNumber][1] === "unclosed open tag" ||
              processedHTML[selectedLineNumber][1] === "extra closing tag" ? (
                <div className="error-row">
                  <img className="menu-icon" src={redErrorIcon} />
                  <div className="menu-text">{`Error ${processedHTML[selectedLineNumber][1]}`}</div>
                </div>
              ) : null}

              <div className="menu-row">
                <img className="menu-icon" src={editIcon} />
                <div className="menu-text">Edit Code Line</div>
              </div>
              <div className="menu-grey-line"></div>
              <div className="menu-row">
                <img className="menu-icon" src={editIcon} />
                <div className="menu-text">Add Line After</div>
              </div>
              <div className="menu-grey-line"></div>
              <div className="menu-row">
                <img className="menu-icon" src={deleteIcon} />
                <div className="menu-text">Delete Line</div>
              </div>
            </div>
          </div>
        </div>
      )}
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
