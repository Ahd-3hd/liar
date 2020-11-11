import firebase from "firebase";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyBoyGk2v0nBHAwQcWzgYiLoL0eQtTWw_YM",
  authDomain: "liar-35d32.firebaseapp.com",
  databaseURL: "https://liar-35d32.firebaseio.com",
  projectId: "liar-35d32",
  storageBucket: "liar-35d32.appspot.com",
  messagingSenderId: "340932256556",
  appId: "1:340932256556:web:bc7e29e2b83c2616168289",
  measurementId: "G-PTM5PFSNGF",
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  // firebase.analytics();
}
export default firebase;
