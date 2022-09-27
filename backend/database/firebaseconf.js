// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQoZdowtiZ2_WEsgNzFSZipmkgiAtpCIQ",
  authDomain: "projet03-af720.firebaseapp.com",
  projectId: "projet03-af720",
  storageBucket: "projet03-af720.appspot.com",
  messagingSenderId: "269673150954",
  appId: "1:269673150954:web:dca3149ea12cf25a5d9a93"
};

// Initialize Firebase
exports.fapp = initializeApp(firebaseConfig);
