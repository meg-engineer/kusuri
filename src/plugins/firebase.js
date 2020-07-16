import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyDOObeTvPP8HjMwYfMNAo73aw5m7dDcM2I",
  authDomain: "kusuri-chat.firebaseapp.com",
  databaseURL: "https://kusuri-chat.firebaseio.com",
  projectId: "kusuri-chat",
  storageBucket: "kusuri-chat.appspot.com",
  messagingSenderId: "845510575602",
  appId: "1:845510575602:web:e3bbf93490a66ad6a3576b",
  measurementId: "G-3VYXDZVM5T"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
