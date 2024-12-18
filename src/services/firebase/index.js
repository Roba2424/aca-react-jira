// Import the functions you need from the SDKs you need
import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "aca-jira.firebaseapp.com",
  projectId: "aca-jira",
  storageBucket: "aca-jira.appspot.com",
  messagingSenderId: "662582221920",
  appId: "1:662582221920:web:572f2568d5ddd9d74db705",
  measurementId: "G-NXGKQEF876",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { auth, db, storage };
