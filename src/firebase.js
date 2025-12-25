import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyCYLxbX9JqxlKxMCK9Xd0WGSSg4R_GkZ14",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "cineinsight-4.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "cineinsight-4",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "cineinsight-4.appspot.com",
  messagingSenderId:
    process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "493744769021",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:493744769021:web:4ee73e57e12957fb85fb94",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-C6Z8CLN8KT",
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

export default app;
