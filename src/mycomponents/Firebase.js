// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApmTmEA0jI0xiunUVa4GSQHCvuSNFfiOQ",
  authDomain: "todolist-c3cc2.firebaseapp.com",
  projectId: "todolist-c3cc2",
  storageBucket: "todolist-c3cc2.appspot.com",
  messagingSenderId: "706964885538",
  appId: "1:706964885538:web:5f2a3a07d6fc6e2cef3a7b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);