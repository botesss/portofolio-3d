// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAnGGVAClHzExVj5iuQnRj7v7EuWs7Z-vQ",
  authDomain: "portofolio-botess0.firebaseapp.com",
  projectId: "portofolio-botess0",
  storageBucket: "portofolio-botess0.firebasestorage.app",
  messagingSenderId: "843691732237",
  appId: "1:843691732237:web:571371ad9cba2522bd9444",
  measurementId: "G-M4S7B7HXC8"
};

// Init Firebase
const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const loginWithGoogle = () => signInWithPopup(auth, provider);
export const logout = () => signOut(auth);

// Firestore
export const db = getFirestore(app);
