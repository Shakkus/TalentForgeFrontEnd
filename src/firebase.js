// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDr-YsjfQ5aEIdCUrUGhDRyRSSvcntUzQ8",
  authDomain: "talentforgeauth.firebaseapp.com",
  projectId: "talentforgeauth",
  storageBucket: "talentforgeauth.appspot.com",
  messagingSenderId: "998769381596",
  appId: "1:998769381596:web:d049730469ea8e8e646419"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

