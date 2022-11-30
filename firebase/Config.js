// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCeJ9O6NsWSvsE3UYw7GgTCwoCe6L_reM",

  authDomain: "photoapp-aba2d.firebaseapp.com",

  projectId: "photoapp-aba2d",

  storageBucket: "photoapp-aba2d.appspot.com",

  messagingSenderId: "239903644168",

  appId: "1:239903644168:web:f33fcc5d24096500864fbd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const logout = () => {
  signOut(auth);
};
export const storage = getStorage(app);
