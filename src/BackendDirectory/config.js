import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBr6FGXTfOz7HqbhfIVw4gcY_RJKIjNUac",
  authDomain: "kampuzsales.firebaseapp.com",
  projectId: "kampuzsales",
  storageBucket: "kampuzsales.appspot.com",
  messagingSenderId: "130055712803",
  appId: "1:130055712803:web:93f3a3ab9f6e7aa794c196",
  measurementId: "G-7S9KPCTD7D"
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const auth = firebase.auth();
const storage = firebase.storage();
const firestore = firebase.firestore();

export { auth, storage, firestore, firebase };