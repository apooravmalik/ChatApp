// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSsfsMPTdKLeMuOtwqARbgBmB6nhXjXLQ",
  authDomain: "chat-app-5776a.firebaseapp.com",
  projectId: "chat-app-5776a",
  storageBucket: "chat-app-5776a.appspot.com",
  messagingSenderId: "43670875572",
  appId: "1:43670875572:web:0fd3770b48729528ca16e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);