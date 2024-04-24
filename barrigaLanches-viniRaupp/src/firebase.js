// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

  apiKey: "AIzaSyASRJpSdmHtdh1jujkRV9bdpTNoTBM3Ne4",

  authDomain: "barriga-cheia-69252.firebaseapp.com",

  projectId: "barriga-cheia-69252",

  storageBucket: "barriga-cheia-69252.appspot.com",

  messagingSenderId: "848763490856",

  appId: "1:848763490856:web:50246ff7ba104f66825b1d",

  measurementId: "G-NX4R7M83NB"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);