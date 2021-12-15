import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import firebaseConfig from "./FirebaseConfig"

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.database();
const auth = firebase.auth();

export { db, auth };
