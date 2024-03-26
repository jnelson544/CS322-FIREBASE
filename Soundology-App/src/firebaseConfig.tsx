import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCl2dVwxxZfKc6DGzAnuaRJ283evKCrMS8",
    authDomain: "csci322-project.firebaseapp.com",
    projectId: "csci322-project",
    storageBucket: "csci322-project.appspot.com",
    messagingSenderId: "653140309797",
    appId: "1:653140309797:web:052aa45c67c0b166344ccc",
    measurementId: "G-CY5GQJVLRV"
  };

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore };