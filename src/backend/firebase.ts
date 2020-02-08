import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBP8Eo61hqQ5w_iHpCZMNBeTXwPXbhDoeY",
  authDomain: "abstrakt-6eb75.firebaseapp.com",
  databaseURL: "https://abstrakt-6eb75.firebaseio.com",
  projectId: "abstrakt-6eb75",
  storageBucket: "abstrakt-6eb75.appspot.com",
  messagingSenderId: "133869053674",
  appId: "1:133869053674:web:920e97064ef99e147c9993",
  measurementId: "G-3R5QHNZBS9"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};

export default firebaseApp;
export { providers, firebaseAppAuth };
