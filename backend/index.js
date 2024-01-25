const express = require("express");
const app = express();
const port = 8080;
const fs = require("fs").promises;
const aws = require("aws-sdk");
const multer = require("multer");
const cors = require("cors");

require("dotenv").config();

app.use(
  cors({
    credentials: true,
  })
);

aws.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const textract = new aws.Textract();

// Multer middleware for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

const main = async () => {
  try {
    const buf = await fs.readFile("./handwritten-html.jpg");
    console.log(buf);
    const res = await textract
      .detectDocumentText({ Document: { Bytes: buf } })
      .promise();
    // console.log(res);

    text = "";

    for (const item of res.Blocks) {
      if (item.BlockType === "LINE") {
        console.log(item.Text);
        text += " " + item.Text;
      }
    }

    console.log("Concatenated Text:", text);
  } catch (err) {
    console.log(err);
  }
};

// OCR processing logic
const processOCR = async (buffer) => {
  console.log(buffer);
  let text = [];
  const res = await textract
    .detectDocumentText({ Document: { Bytes: buffer } })
    .promise();

  for (const item of res.Blocks) {
    if (item.BlockType === "LINE") {
      console.log(item.Text);
      text.push(item.Text);
    }
  }

  console.log("Concatenated Text:", text);
  return text;
};

// POST endpoint for handling OCR requests
app.post("/outputocr", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    const textOutput = await processOCR(req.file.buffer);
    res.json(textOutput);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
