import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAyH7QBsQE6_qB6UdLcknSVxTWo2lTU50U",
  authDomain: "tenedores-1ecdd.firebaseapp.com",
  projectId: "tenedores-1ecdd",
  storageBucket: "tenedores-1ecdd.appspot.com",
  messagingSenderId: "788582990681",
  appId: "1:788582990681:web:a31bd91433658768f34248",
};

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);
