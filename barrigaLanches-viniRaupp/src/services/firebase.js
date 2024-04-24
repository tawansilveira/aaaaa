// firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getAuth} from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyASRJpSdmHtdh1jujkRV9bdpTNoTBM3Ne4",
  authDomain: "barriga-cheia-69252.firebaseapp.com",
  projectId: "barriga-cheia-69252",
  storageBucket: "barriga-cheia-69252.appspot.com",
  messagingSenderId: "848763490856",
  appId: "1:848763490856:web:50246ff7ba104f66825b1d",
  measurementId: "G-NX4R7M83NB"
};

// Inicialize o Firebase
const app = firebase.initializeApp(firebaseConfig);

export const firestore = app.firestore();

// login
export const auth = getAuth(app)


