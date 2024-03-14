export const ocrOutputToHTML = (text) => {
  console.log(text);
  text = text.replace(/ +/g, " "); // Convert multiple spaces to single space

  let tagStack = [];
  let codeLines = [];

  let i = 0;
  let current = "";
  let tagStarted = false;

  // Skip any leading space
  while (i < text.length && text[i].trim() === "") {
    i++;
  }

  text += " ";

  while (i < text.length) {
    // Until first < or >
    while (i < text.length && text[i] !== "<" && text[i] !== ">") {
      if (tagStarted && text[i] === " ") {
        text = text.slice(0, i) + ">" + text.slice(i);
        console.log("in this case", current);
        break;
      }
      current += text[i];
      i++;
    }

    if (tagStarted && text[i] == "<") {
      text = text.slice(0, i) + ">" + text.slice(i);
      console.log("in this case 2", current);
      continue;
    } else if (!tagStarted && text[i] === "<") {
      if (current != " " && current != "") {
        codeLines.push([current, "text"]);
      }
      current = "<";
      tagStarted = true;
      i++;
    } else if (text[i] === ">") {
      // Case of text>
      // Todo: Ensure / exists; it might be missing or another extra character
      if (current[0] !== "<") {
        current = current.split(" ");
        if (current.length > 1) {
          // Case of text|space|>
          while (
            current[current.length - 1] ===
            Array(current[current.length - 1].length + 1).join(" ")
          ) {
            current.pop();
          }
          for (let j = 0; j < current.length - 1; j++) {
            codeLines.push([current[j], "text"]);
          }
          current = "<" + current[current.length - 1];
        }
      }
      current += ">";
      tagStarted = false;
      current = current.replace(/ /g, "");

      tagStack.push(current);

      if (isValidTag(current)) {
        codeLines.push([current.toLowerCase(), "valid tag"]);
      } else {
        codeLines.push([current.toLowerCase(), "invalid tag"]);
      }
      current = "";
      i++;
    }
  }

  console.log(codeLines);
  return codeLines;
};

const getTagName = (tag) => {
  try {
    return tag.match(/<\s*\/?\s*([a-zA-Z0-9_\-!"]+)\s*>/)[1].toLowerCase();
  } catch {
    return "";
  }
};

export const isValidTag = (tag) => {
  const tagName = getTagName(tag);
  const validTags = ["html", "p", "h1", "h2", "h3", "head", "body", "title"];
  return validTags.includes(tagName.toLowerCase());
};

export const validateClosingTags = (HTMLCode) => {
  const openTags = [];
  const result = [];

  for (const [line, contentType] of HTMLCode) {
    if (!line || line.trim() === "") {
      continue;
    } else if (line.startsWith("<") && line.endsWith(">")) {
      const tagName = getTagName(line);
      if (tagName !== "") {
        if (line.startsWith("</")) {
          // Closing tag
          if (openTags.length && openTags[openTags.length - 1] === tagName) {
            openTags.pop();
            result.push([line, contentType]);
          } else {
            // Add missing closing tags until the corresponding open tag is found
            let openTagNames = openTags.map((openTags) => openTags[0]);
            if (openTagNames.includes(tagName)) {
              while (
                openTags.length &&
                openTags[openTags.length - 1][0] !== tagName
              ) {
                let poppedOpenTag = openTags.pop();
                // result.push([`</${poppedOpenTag[0]}>`, "missing tag"]);
                result[poppedOpenTag[1]][1] = "unclosed open tag";
              }
              openTags.pop(); // Pop the corresponding open tag
              result.push([line, contentType]);
            } else {
              result.push([line, "extra closing tag"]);
            }
          }
        } else if (line.endsWith("/>")) {
          // Self-closing tag
          result.push([line, contentType]);
        } else if (
          openTags.length &&
          openTags[openTags.length - 1] === tagName
        ) {
          // Both opening tags
          openTags.pop();
          result.push([line, "missing / closing tag"]);
        } else {
          // Opening tag
          if (contentType !== "invalid tag") {
            openTags.push([tagName, result.length]);
          }
          result.push([line, contentType]);
        }
      } else {
        result.push([line, "invalid tag"]);
      }
    } else {
      result.push([line, contentType]); // Not a valid HTML tag, add as is
    }
  }

  // Add missing closing tags
  while (openTags.length) {
    let poppedOpenTag = openTags.pop();
    // result.push([`</${poppedOpenTag[0]}>`, "missing tag"]);
    result[poppedOpenTag[1]][1] = "unclosed open tag";
  }

  return result;
};
