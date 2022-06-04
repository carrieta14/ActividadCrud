import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAHFp8PZqgvEqJwuj2ams4QjLTmCE-_ACs",
    authDomain: "crud2-f8a8a.firebaseapp.com",
    projectId: "crud2-f8a8a",
    storageBucket: "crud2-f8a8a.appspot.com",
    messagingSenderId: "862709953056",
    appId: "1:862709953056:web:1ef66e9e02221bb8628245"
  };

  firebase.initializeApp(firebaseConfig);

  export {firebase};