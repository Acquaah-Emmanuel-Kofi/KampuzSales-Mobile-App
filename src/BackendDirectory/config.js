import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDWkJqc2hdi0ftkKBwb1yGFWh7mTnu-ZY0",
  authDomain: "kampuzsales-mobile-app-90a08.firebaseapp.com",
  projectId: "kampuzsales-mobile-app-90a08",
  storageBucket: "kampuzsales-mobile-app-90a08.appspot.com",
  messagingSenderId: "771399834179",
  appId: "1:771399834179:web:b1879c8cd65a4d7ff392f6",
  measurementId: "G-7BVM730DGF"
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const auth = firebase.auth();
const storage = firebase.storage();
const firestore = firebase.firestore();

export { auth, storage, firestore, firebase };