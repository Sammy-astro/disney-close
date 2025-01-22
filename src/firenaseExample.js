import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage"; 


const firebaseConfig = {
  apiKey: "Your own api key",
  authDomain: "disney-clone-a3b31.firebaseapp.com",
  projectId: "disney-clone-a3b31",
  storageBucket: "disney-clone-a3b31.appspot.com",
  messagingSenderId: "821143270712",
  appId: "Your own appID",
  measurementId: "G-XQ8WF98MDJ",
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
