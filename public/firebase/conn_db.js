//MUST BE INSITLIZED AFTER DICLIRATION OF FIREBASE SDK URL

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyC8Og9B-DOdJTBd5GFXinFXepkgBkYkuq4',
  authDomain: 'reddit-india-chirag.firebaseapp.com',
  projectId: 'reddit-india-chirag',
  storageBucket: "reddit-india-chirag.appspot.com"
});

var database = firebase.firestore();
