
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBkYk9Eg8-rfhtmgnA4o3rI84boWKTHASY",
  authDomain: "supervisor-dashboard.firebaseapp.com",
  databaseURL: "https://supervisor-dashboard.firebaseio.com",
  projectId: "supervisor-dashboard",
  storageBucket: "supervisor-dashboard.appspot.com",
  messagingSenderId: "54168347235",
  appId: "1:54168347235:web:ccb45001725c2d53"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
