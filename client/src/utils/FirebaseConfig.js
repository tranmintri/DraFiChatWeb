import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBDLEYNT-cd7nO_FuN6kaCa_xRcASzUDco",
  authDomain: "chatservice-d1f1c.firebaseapp.com",
  projectId: "chatservice-d1f1c",
  storageBucket: "chatservice-d1f1c.appspot.com",
  messagingSenderId: "323769795362",
  appId: "1:323769795362:web:62fff4e3989ed171dbdb7b",
  measurementId: "G-Z2K23K5Y2D",
};

const app = initializeApp(firebaseConfig);
export const fireBaseAuth = getAuth(app);
