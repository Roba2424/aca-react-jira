// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBeCf5BOR-o7sp4geduHPttCOUvHvmePNc",
  authDomain: "aca-jira.firebaseapp.com",
  projectId: "aca-jira",
  storageBucket: "aca-jira.appspot.com",
  messagingSenderId: "662582221920",
  appId: "1:662582221920:web:572f2568d5ddd9d74db705",
  measurementId: "G-NXGKQEF876",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export { auth };
