import React, { useState, useEffect } from "react";
import "./CodeViewer.css"; // Import a CSS file for styling (create your own or modify as needed)
import {
  isValidTag,
  stringToHTML,
  validateClosingTags,
} from "../../utils/preprocessinghtml.jsx";
import editIcon from "../../assets/grey-edit.png";
import deleteIcon from "../../assets/red-delete.png";
import redErrorIcon from "../../assets/red-error.png";

const CodeViewer = ({ ocrOutput, setShowTabs, setTopNavbarTitle }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userCodeString, setUserCodeString] = useState(ocrOutput.join(""));
  const [processedHTML, setProcessedHTML] = useState([]);
  const [numberOfInvalidTags, setNumberOfInvalidTags] = useState(-1);
  const [errorCorrectionStage, setErrorCorrectionStage] =
    useState("Invalid Tags");
  const [selectedLineIndex, setSelectedLineIndex] = useState(null);
  const [inputPopupOpen, setInputPopupOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isInputValid, setIsInputValid] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [purposeOfPopUp, setPurposeOfPopUp] = useState(false);

  const stringToHtmlValidation = (userCode) => {
    let processedHTMLOutput = validateClosingTags(stringToHTML(userCode));
    let countInvalidTags = 0;
    processedHTMLOutput.forEach((line) => {
      if (line[1] == "invalid tag") {
        countInvalidTags += 1;
      }
    });
    return {
      processedHTMLOutput,
      countInvalidTags,
    };
  };

  useEffect(() => {
    console.log("user Code String", userCodeString);
    let { processedHTMLOutput, countInvalidTags } =
      stringToHtmlValidation(userCodeString);

    console.log("Invalid tags", countInvalidTags);
    setNumberOfInvalidTags(countInvalidTags);
    console.log("setting processed html to:", processedHTMLOutput);
    setProcessedHTML(processedHTMLOutput);
    setIsLoading(false);
  }, [userCodeString]);

  useEffect(() => {
    console.log("Number of invalid tags changed to: ", numberOfInvalidTags);
    if (numberOfInvalidTags == 0) {
      setErrorCorrectionStage("Closing Tags");
      console.log(processedHTML);
      console.log(validateClosingTags(processedHTML));

      setProcessedHTML(validateClosingTags(processedHTML));
    }
  }, [numberOfInvalidTags]);

  const handleInputChange = (e) => {
    const newInputValue = e.target.value;
    setInputValue(newInputValue);
  };

  const handleSubmit = () => {
    console.log(purposeOfPopUp);
    let updatedProcessedHTML = [...processedHTML];
    if (purposeOfPopUp == "Editing") {
      updatedProcessedHTML[selectedLineIndex][0] = inputValue;
    } else if (purposeOfPopUp == "Adding") {
      updatedProcessedHTML.splice(
        selectedLineIndex + 1,
        0,
        ...[[inputValue, "new text"]]
      );
      console.log(updatedProcessedHTML);
    } else if (purposeOfPopUp == "Deleting") {
      updatedProcessedHTML.splice(selectedLineIndex, 1, ...[]);
      console.log(updatedProcessedHTML);
    } else {
      console.log("Invalid purpose of pop up:", purposeOfPopUp);
      return;
    }

    let updatedUserCodeString = "";
    updatedProcessedHTML.forEach((line, index) => {
      updatedUserCodeString += line[0];
    });
    setUserCodeString(updatedUserCodeString);
    closePopup();
  };

  const handleClick = (lineNumber) => {
    setSelectedLineIndex(lineNumber);
    setMenuOpen(true);
  };

  const openPopup = (purpose) => {
    if (selectedLineIndex !== null) {
      setSelectedLineIndex(selectedLineIndex);
      setIsInputValid(isValidTag(processedHTML[selectedLineIndex][0]));
      setPurposeOfPopUp(purpose);
      if (purpose == "Editing") {
        setInputValue(processedHTML[selectedLineIndex][0]);
      }
      setInputPopupOpen(true);
    }
  };

  const closePopup = () => {
    setInputPopupOpen(false);
    setSelectedLineIndex(null);
    setIsInputValid(false);
    setInputValue("");
    setPurposeOfPopUp(false);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setSelectedLineIndex(null);
  };

  const handleDeleteLine = () => {
    closeMenu();
    openPopup("Deleting");
  };

  const handleAddLine = () => {
    console.log("add line");
    closeMenu();
    openPopup("Adding");
  };

  const handleEditLine = () => {
    console.log("edit line");
    closeMenu();
    openPopup("Editing");
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="code-viewer">
      {/* <h1>{errorCorrectionStage}</h1> */}
      {processedHTML.map((line, index) => (
        <div
          key={index}
          className={`code-line ${index % 2 === 0 ? "even" : "odd"} ${
            selectedLineIndex == index ? "error" : ""
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

      {inputPopupOpen && selectedLineIndex !== null && (
        <div className="overlay">
          <div className="popup">
            <div className="popup-header">
              <span onClick={closePopup} className="close-btn">
                &times;
              </span>
            </div>
            <div className="popup-body">
              <h3>{purposeOfPopUp}</h3>
              <p>
                Line {selectedLineIndex + 1}:{" "}
                {processedHTML[selectedLineIndex][0]}
              </p>
              {purposeOfPopUp != "Deleting" ? (
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  className={isInputValid ? "valid" : ""}
                />
              ) : null}

              <button onClick={handleSubmit} className="submit-btn">
                {purposeOfPopUp == "Deleting" ? "Delete" : "Submit"}
              </button>
              {purposeOfPopUp == "Deleting" ? (
                <button onClick={closePopup} className="submit-btn-border">
                  Cancel
                </button>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {menuOpen && selectedLineIndex !== null && (
        <div className="menu-overlay">
          <div className="menu-popup">
            <div className="menu-popup-header">
              <span onClick={closeMenu} className="menu-close-btn">
                &times;
              </span>
            </div>
            <div className="menu-popup-body">
              <p className="menu-codeline">
                Line {selectedLineIndex + 1}:{" "}
                {processedHTML[selectedLineIndex][0]}
              </p>
              {processedHTML[selectedLineIndex][1] === "invalid tag" ||
              processedHTML[selectedLineIndex][1] === "unclosed open tag" ||
              processedHTML[selectedLineIndex][1] === "extra closing tag" ? (
                <div className="error-row">
                  <img className="menu-icon" src={redErrorIcon} />
                  <div className="menu-text">{`Error ${processedHTML[selectedLineIndex][1]}`}</div>
                </div>
              ) : null}

              <div className="menu-row" onClick={handleEditLine}>
                <img className="menu-icon" src={editIcon} />
                <div className="menu-text">Edit Code Line</div>
              </div>
              <div className="menu-grey-line"></div>
              <div className="menu-row" onClick={handleAddLine}>
                <img className="menu-icon" src={editIcon} />
                <div className="menu-text">Add Line After</div>
              </div>
              <div className="menu-grey-line"></div>
              <div className="menu-row" onClick={handleDeleteLine}>
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
