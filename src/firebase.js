// src/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCMbN4xAa0che7ug-uTwOew7IRjH2eit_s",
  authDomain: "portofolio-anam.firebaseapp.com",
  projectId: "portofolio-anam",
  storageBucket: "portofolio-anam.firebasestorage.app",
  messagingSenderId: "548415094425",
  appId: "1:548415094425:web:d41e4be9d22fe231cdc208"
};

// Init Firebase
const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
export const loginWithGoogle = () => signInWithPopup(auth, googleProvider);
export const loginWithGithub = () => signInWithPopup(auth, githubProvider);
export const logout = () => signOut(auth);

// Firestore
export const db = getFirestore(app);
