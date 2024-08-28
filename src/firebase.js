import firebase from firebase/app;
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDS3YZp9t8i67nbjbjLEI7Lncx9cPNYi8Y",
    authDomain: "tripfy-4223e.firebaseapp.com",
    projectId: "tripfy-4223e",
    storageBucket: "tripfy-4223e.appspot.com",
    messagingSenderId: "340697005008",
    appId: "1:340697005008:web:0eb5dae05035a85440d7d5"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

export default{
    firebase,

};