import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import {API_KEY, APP_ID} from '@env';

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "kampuzsales-db.firebaseapp.com",
  projectId: "kampuzsales-db",
  storageBucket: "kampuzsales-db.appspot.com",
  messagingSenderId: "100237797089",
  appId: APP_ID
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const auth = firebase.auth();
const storage = firebase.storage();
const firestore = firebase.firestore();

export { auth, storage, firestore, firebase };