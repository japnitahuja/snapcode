import React, { useState, useEffect, useRef } from "react";
import "./CodeViewer.css"; // Import a CSS file for styling (create your own or modify as needed)
import {
  htmlParser,
  isValidTag,
  stringToHTML,
  validateHTML,
} from "../../utils/preprocessinghtml.jsx";
import editIcon from "../../assets/grey-edit.png";
import deleteIcon from "../../assets/red-delete.png";
import redErrorIcon from "../../assets/red-error.png";
import greyPlus from "../../assets/plus2.png";

const CodeViewer = ({
  ocrOutput,
  setShowTabs,
  setTopNavbarTitle,
  setHTMLCode,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const [userCodeString, setUserCodeString] = useState(ocrOutput.join(""));
  const [processedHTML, setProcessedHTML] = useState([]);
  const [numberOfErrors, setNumberOfErrors] = useState(-1);
  const [htmlTagError, setHtmlTagError] = useState(false);

  const [selectedLineIndex, setSelectedLineIndex] = useState(null);

  const [inputPopupOpen, setInputPopupOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [purposeOfPopUp, setPurposeOfPopUp] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const stringToHtmlValidation = (userCode) => {
    let processedHTMLOutput = validateHTML(stringToHTML(userCode));
    let countErrors = 0;
    processedHTMLOutput.forEach((line, index) => {
      if (index == 0) {
        if (line[0] !== "<html>") {
          console.log("html tag missing");
          setHtmlTagError(true);
          countErrors += 1;
        } else {
          console.log("html tag present");
          setHtmlTagError(false);
        }
      }

      if (lineHasError(line)) {
        countErrors += 1;
      }
    });
    return {
      processedHTMLOutput,
      countErrors,
    };
  };

  useEffect(() => {
    console.log("user Code String", userCodeString);
    let { processedHTMLOutput, countErrors } =
      stringToHtmlValidation(userCodeString);

    setNumberOfErrors(countErrors);
    console.log("setting processed html to:", processedHTMLOutput);
    setProcessedHTML(processedHTMLOutput);
    setIsLoading(false);
  }, [userCodeString]);

  useEffect(() => {
    console.log("Number of invalid tags changed to: ", numberOfErrors);
    if (numberOfErrors == 0) {
      //removing the enclosing html tags then set the html code
      let htmlString = userCodeString;
      htmlString = htmlString.replace(/^<html>/i, "");
      htmlString = htmlString.replace(/<\/html>$/i, "");
      setHTMLCode(htmlString);
    } else {
      setHTMLCode(false);
    }
  }, [numberOfErrors]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleLineClick = (lineNumber) => {
    setSelectedLineIndex(lineNumber);
    openMenu();
  };

  const openMenu = () => {
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setSelectedLineIndex(null);
    scrollToTop();
  };

  const handleInputChange = (e) => {
    const newInputValue = e.target.value;
    setInputValue(newInputValue);
  };

  const handleInputSubmit = () => {
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
    closeInputPopup();
  };

  const openInputPopup = (purpose) => {
    if (selectedLineIndex !== null) {
      setSelectedLineIndex(selectedLineIndex);
      setPurposeOfPopUp(purpose);
      if (purpose == "Editing") {
        setInputValue(processedHTML[selectedLineIndex][0]);
      }
      setInputPopupOpen(true);
    }
  };

  const closeInputPopup = () => {
    setInputPopupOpen(false);
    setSelectedLineIndex(null);
    setInputValue("");
    setPurposeOfPopUp(false);
    scrollToTop();
  };

  const handleDeleteLine = () => {
    closeMenu();
    openInputPopup("Deleting");
  };

  const handleAddLine = () => {
    closeMenu();
    openInputPopup("Adding");
  };

  const handleEditLine = () => {
    closeMenu();
    openInputPopup("Editing");
  };

  const lineHasError = (line) => {
    return (
      line[1] === "invalid tag" ||
      line[1] === "unclosed open tag" ||
      line[1] === "extra closing tag"
    );
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="code-viewer">
      {htmlTagError ? (
        <div className="error-row" style={{ padding: "5px", fontSize: "1rem" }}>
          <img className="menu-icon" src={redErrorIcon} />
          <div className="menu-text">{`Entire code should be enclosed in html tags`}</div>
        </div>
      ) : null}

      {processedHTML.map((line, index) => (
        <div
          key={index}
          className={`code-line ${index % 2 === 0 ? "even" : "odd"} ${
            selectedLineIndex == index
              ? lineHasError(line)
                ? "red-colour-row"
                : "blue-colour-row"
              : ""
          } `}
          onClick={() => handleLineClick(index)}
        >
          <span className="line-number">
            {lineHasError(line) ? (
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
              <h3>
                {purposeOfPopUp == "Adding"
                  ? `Adding After Line ${selectedLineIndex + 1}`
                  : `${purposeOfPopUp} Line ${selectedLineIndex + 1}`}
              </h3>
              <span onClick={closeInputPopup} className="close-btn">
                &times;
              </span>
            </div>
            <div className="popup-body">
              <p>
                Line {selectedLineIndex + 1}:{" "}
                {purposeOfPopUp == "Adding" || purposeOfPopUp == "Deleting"
                  ? processedHTML[selectedLineIndex][0]
                  : inputValue}
              </p>
              <p>
                {purposeOfPopUp == "Adding"
                  ? `Line ${selectedLineIndex + 2}: ${inputValue}`
                  : null}
              </p>
              {purposeOfPopUp != "Deleting" ? (
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                />
              ) : null}

              <button onClick={handleInputSubmit} className="submit-btn">
                {purposeOfPopUp == "Deleting" ? "Delete" : "Submit"}
              </button>
              {purposeOfPopUp == "Deleting" ? (
                <button onClick={closeInputPopup} className="submit-btn-border">
                  Cancel
                </button>
              ) : null}
            </div>
          </div>
        </div>
      )}
      {menuOpen && selectedLineIndex !== null && (
        <div className="menu-overlay">
          <div ref={menuRef} className="menu-popup">
            <div className="menu-popup-header">
              <span onClick={closeMenu} className="menu-close-btn">
                &times;
              </span>
            </div>
            <div className="menu-popup-body">
              {lineHasError(processedHTML[selectedLineIndex]) ? (
                <div className="error-row">
                  <img className="menu-icon" src={redErrorIcon} />
                  <div className="menu-text">{`Error ${processedHTML[selectedLineIndex][1]}`}</div>
                </div>
              ) : null}

              <p className="menu-codeline">
                Line {selectedLineIndex + 1}:{" "}
                {processedHTML[selectedLineIndex][0]}
              </p>

              <div className="menu-row" onClick={handleEditLine}>
                <img className="menu-icon" src={editIcon} />
                <div className="menu-text">Edit Code Line</div>
              </div>
              <div className="menu-grey-line"></div>
              <div className="menu-row" onClick={handleAddLine}>
                <img className="menu-icon" src={greyPlus} />
                <div className="menu-text">Add Line Before</div>
              </div>
              <div className="menu-grey-line"></div>
              <div className="menu-row" onClick={handleAddLine}>
                <img className="menu-icon" src={greyPlus} />
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

export default CodeViewer;
