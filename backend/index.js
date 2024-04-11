
const express = require("express");
const app = express();
const port = 8080;
const fs = require("fs").promises;
const aws = require("aws-sdk");
const multer = require("multer");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");


require("dotenv").config();

app.use(
  cors({
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

// aws.config.update({
//   region: process?.env.AWS_REGION,
//   accessKeyId: process?.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process?.env.AWS_SECRET_ACCESS_KEY,
// });

const textract = new aws.Textract();

// Multer middleware for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

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

    // const textOutput = await processOCR(req.file.buffer);
    const textOutput = [
      '<html>',
      '<head>',
      '<title> Website </title>',
      '</head>',
      '<body>',
      '<h1> Introduction </h1>',
      '<p> Hi, my name is Gauri and I am',
      '12 years old . I love cooking and',
      'listening to music. My favourite subject',
      'is english !',
      '<p>',
      '</body>',
      '</html>'
    ]
    // let textOutput = [
    //   "<!",
    //   "DOCTYPE html>",
    //   "<HTML>",
    //   "<HEAD>",
    //   '<meta characte = " wtf - 8"> "',
    //   "<title> Hello World By Rajesh.M </title>",
    //   "</HEAD>",
    //   "<BODY>",
    //   "<hi>Hello World By Rajesh. M </his",
    //   "<p>",
    //   "This code was written by me.",
    //   "How awesome is that?",
    //   "</p>",
    //   "</BODY>",
    //   "</HTHL>",
    // ];
    // textOutput = [
    //   "<title> Hello World By Rajesh.M </title>",
    //   "</HEAD>",
    //   "<BODY>",
    //   "<hi>Hello World By Rajesh. M </his",
    //   "<p>",
    //   "This code was written by me.",
    //   "How awesome is that?",
    //   "</p>",
    //   "</BODY>",
    //   "</HTHL>",
    // ];
    // let textOutput = [
    //   "<html>",
    //   "<p> this is a paragraph </p>",
    //   "<hl> I didn't close this tag",
    //   "<h2> I closed this </ha>",
    //   "</htmle",
    // ];

    // textOutput = [
    //   "<html>",
    //   "<p> this is a paragraph </p>",
    //   "<hl> I didn't close this tag",
    //   "<h2> I closed this </h2>",
    //   "</html>",
    // ];

    res.json(textOutput);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// var admin = require("firebase-admin");

// var serviceAccount = require("./serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// const db = admin.firestore();
// const firebase_auth = admin.auth();
const admin = require("./config/firebaseConfig")
console.log("main",admin)
const firebase_auth = require("./config/firebaseConfig");

// Create a new user
app.post('/verify', async (req, res) => {

    const { idToken } = req.body;
    admin.auth()
  .verifyIdToken(idToken)
  .then((decodedToken) => {
    const uid = decodedToken.uid;
    res.json(uid);
    // ...
  })
  .catch((error) => {
    // Handle error
    res.json(error);
  });
});

app.post('/hello', async (req, res) => {

res.json("hello")
});

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
