import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBAjoGO8qV6KNLLL2Az0NFqhl1QNkYGgAQ",
  authDomain: "kampuzsales-3cb39.firebaseapp.com",
  projectId: "kampuzsales-3cb39",
  storageBucket: "kampuzsales-3cb39.appspot.com",
  messagingSenderId: "1007566040071",
  appId: "1:1007566040071:web:2377c012635c1d58810ea2"
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const auth = firebase.auth();
const storage = firebase.storage();
const firestore = firebase.firestore();

export { auth, storage, firestore, firebase };