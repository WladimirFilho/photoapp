// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcf1Gm17_JjZvfEamuQtQF_vurXDfLFdA",
  authDomain: "photoapp-1ae7c.firebaseapp.com",
  projectId: "photoapp-1ae7c",
  storageBucket: "photoapp-1ae7c.appspot.com",
  messagingSenderId: "454433531465",
  appId: "1:454433531465:web:dd2b6f60d780a48506c198",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const logout = () => {
  signOut(auth);
};
