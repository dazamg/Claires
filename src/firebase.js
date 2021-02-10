// import * as firebase from 'firebase'
import firebase from "firebase/app";
import "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBJuvIxC06FoVVL-GfbrfejnnWsExPtyKg",
    authDomain: "ga-project4.firebaseapp.com",
    projectId: "ga-project4",
    storageBucket: "ga-project4.appspot.com",
    messagingSenderId: "635767073301",
    appId: "1:635767073301:web:6ddec164b0af0513bdfc1c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //export
  export const auth = firebase.auth();
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();