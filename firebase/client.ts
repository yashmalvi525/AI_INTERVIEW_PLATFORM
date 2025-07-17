// Import the functions you need from the SDKs you need
import { initializeApp, getApp ,getApps} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAMfa8L1psXcNL5S17CTyxHmz3InfWD1AE",
  authDomain: "prepwise-cdbbe.firebaseapp.com",
  projectId: "prepwise-cdbbe",
  storageBucket: "prepwise-cdbbe.firebasestorage.app",
  messagingSenderId: "918592423305",
  appId: "1:918592423305:web:9988f4d06d33f1489c4d58",
  measurementId: "G-FHQVJQRLFM"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);