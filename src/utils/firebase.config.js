// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import {firebaseui} from 'firebaseui';
// import { getAnalytics } from "firebase/analytics"; // TODO: initialize
import { 
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
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
  measurementId: "G-ZNF1L5FHZY",
};

export const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can 
  // provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/',
  // We will display Google and Facebook as auth providers.
  // signInOptions: [
  //   firebase.auth.EmailAuthProvider.PROVIDER_ID,
  //   firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  // ]
};

// This must run before any other firebase functions
// window.firebase.initializeApp(firebaseConfig);
// // This sets up firebaseui
// const ui = new firebaseui.auth.AuthUI(window.firebase.auth());

// // This adds firebaseui to the page
// // It does everything else on its own
// export const startFirebaseUI = function (elementId) {
//   ui.start(elementId, uiConfig)
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);  // TODO: initialize
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
