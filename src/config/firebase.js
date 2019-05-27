import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcthxG7JoExGODLQ18bfik1nqHhdAWwlM",
  authDomain: "hi-line-climbing-tracker.firebaseapp.com",
  databaseURL: "https://hi-line-climbing-tracker.firebaseio.com",
  projectId: "hi-line-climbing-tracker",
  storageBucket: "hi-line-climbing-tracker.appspot.com",
  messagingSenderId: "331037036554"
};

firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;
