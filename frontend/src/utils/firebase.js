import {getAuth, GoogleAuthProvider} from "firebase/auth"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVTu13rPD4RcFGgrGvyuNSEJ5F7p5iWp8",
  authDomain: "lsmmern.firebaseapp.com",
  projectId: "lsmmern",
  storageBucket: "lsmmern.firebasestorage.app",
  messagingSenderId: "498883273820",
  appId: "1:498883273820:web:e076e0615a770832f2b299"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export {auth,provider}