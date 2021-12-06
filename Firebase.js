// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAXFjbAC1UEKqEoqV7zfcMh8lIDjkEThFc",
  authDomain: "keystonehabits-512fb.firebaseapp.com",
  databaseURL: "https://keystonehabits-512fb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "keystonehabits-512fb",
  storageBucket: "keystonehabits-512fb.appspot.com",
  messagingSenderId: "219017446992",
  appId: "1:219017446992:web:5a1b3f5c953cf883d93355",
  measurementId: "G-QTQFNLTD55"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };


// Initialize Firebase

