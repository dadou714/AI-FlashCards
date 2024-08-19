// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirebase } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMnck1MNqkJswbdm0_MjAf0Z-TJo0iBp4",
  authDomain: "ai-flashcard-c307a.firebaseapp.com",
  projectId: "ai-flashcard-c307a",
  storageBucket: "ai-flashcard-c307a.appspot.com",
  messagingSenderId: "175969756223",
  appId: "1:175969756223:web:83ea87150cbb01d7c6048a",
  measurementId: "G-QCCB18V40D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirebase(app);

export { db };
