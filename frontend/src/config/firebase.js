import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = JSON.parse(process.env.REACT_APP_firebaseConfig)

console.log(firebaseConfig)
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

// db.settings({ timestampsInSnapshots: true });

export { auth, db , createUserWithEmailAndPassword, signInWithEmailAndPassword};