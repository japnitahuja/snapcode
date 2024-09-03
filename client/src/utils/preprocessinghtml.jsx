import { Parser } from "htmlparser2";
import { levenshteinEditDistance } from "levenshtein-edit-distance";

export const stringToHTML = (text) => {
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
        let currentTagName = getTagName(current.toLowerCase());
        let closestValidTag = replaceInvalidTag(
          currentTagName,
          getAllValidTags(),
          1
        );
        if (closestValidTag == currentTagName) {
          codeLines.push([current, "invalid tag"]);
        } else {
          if (current[0] == "<" && current[1] == "/") {
            codeLines.push([
              "</" + closestValidTag.toLowerCase() + ">",
              "valid tag",
            ]);
          } else if (current[0] == "<") {
            codeLines.push([
              "<" + closestValidTag.toLowerCase() + ">",
              "valid tag",
            ]);
          } else {
            codeLines.push([current, "invalid tag"]);
          }
        }
      }
      current = "";
      i++;
    }
  }

  console.log(codeLines);
  return codeLines;
};

function replaceInvalidTag(invalidTag, validTags, threshold = 1) {
  let minDistance = Infinity;
  let closestValidTags = [invalidTag];

  for (let validTag of validTags) {
    const distance = levenshteinEditDistance(invalidTag, validTag);
    if (distance < minDistance) {
      minDistance = distance;
      closestValidTags = [validTag];
    } else if (distance == minDistance) {
      closestValidTags.push(validTag);
    }
  }

  if (minDistance <= threshold) {
    if (closestValidTags.length > 1) {
      console.log("Multiple valid tags found, not changing.");
      return invalidTag;
    } else {
      console.log(
        `Replacing "${invalidTag}" with "${closestValidTags[0]}" (Edit distance: ${minDistance})`
      );
      return closestValidTags[0];
    }
  } else {
    console.log(`No close match found for "${invalidTag}"`);
    return invalidTag;
  }
}

const getTagName = (tag) => {
  try {
    return tag.match(/<\s*\/?\s*([a-zA-Z0-9_\-!"]+)\s*>/)[1].toLowerCase();
  } catch {
    return "";
  }
};

const getAllValidTags = () => {
  return ["html", "p", "h1", "h2", "h3", "head", "body", "title","h4","h5","h6","b"];
};

export const isValidTag = (tag) => {
  const tagName = getTagName(tag);
  const validTags = getAllValidTags();
  return validTags.includes(tagName.toLowerCase());
};

// Need to add a condition to wrap in html tags only and only consider that portion of code
// need to check for doctype declaration -> maybe can use the parser selectively
// use side by side? compare and see if its same move on if not fill in the gaps like
// tags which dont have opening tags cause this can help in self closing tags and all
// parser can help in comments, doctype declaration, self closing tags

export const validateHTML = (HTMLCode) => {
  const openTags = [];
  const result = [];

  for (const [line, contentType] of HTMLCode) {
    if (!line || line.trim() === "") {
      continue;
    } else if (
      line.startsWith("<") &&
      line.endsWith(">") &&
      contentType == "valid tag"
    ) {
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
      result.push([line, contentType]); // Not a valid HTML tag and text add as is
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

export const htmlParser = (HTMLString) => {
  console.log("HTML PARSER");
  HTMLString = "<p>hellpo";
  const parser = new Parser({
    onerror(error) {
      console.log(error);
    },
    onopentag(name, attributes) {
      /*
       * This fires when a new tag is opened.
       *
       * If you don't need an aggregated `attributes` object,
       * have a look at the `onopentagname` and `onattribute` events.
       */
      console.log("open tag", name, attributes);
    },
    ontext(text) {
      /*
       * Fires whenever a section of text was processed.
       *
       * Note that this can fire at any point within text and you might
       * have to stitch together multiple pieces.
       */
      console.log("text", text);
    },
    onclosetag(tagname) {
      /*
       * Fires when a tag is closed.
       *
       * You can rely on this event only firing when you have received an
       * equivalent opening tag before. Closing tags without corresponding
       * opening tags will be ignored.
       */
      console.log("close tag", tagname);
    },
    onend() {
      console.log("end");
    },
  });
  parser.write(HTMLString);
  parser.end();
};
