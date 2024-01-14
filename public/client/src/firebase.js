import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth} from "firebase/auth"
import {getFirestore} from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCYLxbX9JqxlKxMCK9Xd0WGSSg4R_GkZ14",
  authDomain: "cineinsight-4.firebaseapp.com",
  projectId: "cineinsight-4",
  storageBucket: "cineinsight-4.appspot.com",
  messagingSenderId: "493744769021",
  appId: "1:493744769021:web:4ee73e57e12957fb85fb94",
  measurementId: "G-C6Z8CLN8KT"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

export default app;
