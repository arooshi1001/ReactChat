// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-6f135.firebaseapp.com",
  projectId: "reactchat-6f135",
  storageBucket: "reactchat-6f135.appspot.com",
  messagingSenderId: "468608200690",
  appId: "1:468608200690:web:250848d6646fba1777c56b",
  measurementId: "G-8FC0KHZLGE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Pass the initialized app to getAuth, getFirestore, and getStorage
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
