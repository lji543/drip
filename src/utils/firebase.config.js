// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics"; // TODO: initialize
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5moaa9_HKvczFSN1OrJS1GbirUrdhZxA",
  authDomain: "drip-f74f5.firebaseapp.com",
  projectId: "drip-f74f5",
  storageBucket: "drip-f74f5.appspot.com",
  messagingSenderId: "887975250701",
  appId: "1:887975250701:web:51f27157fd52c2eda6fe44",
  measurementId: "G-ZNF1L5FHZY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);  // TODO: initialize
export const db = getFirestore(app);