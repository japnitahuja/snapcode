//authentication
var admin = require("firebase-admin");

var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

console.log(admin);

const db = admin.firestore();
const firebase_auth = admin.auth();

module.exports = admin;