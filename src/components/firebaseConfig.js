import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA76cGufZG1hoAJ41SNaJ9jG26lPugoPdo",
  authDomain: "recipe-list-76d36.firebaseapp.com",
  projectId: "recipe-list-76d36",
  storageBucket: "recipe-list-76d36.appspot.com",
  messagingSenderId: "678943840028",
  appId: "1:678943840028:web:6d2f0d3179a7cebe994cd9",
  measurementId: "G-YERVM66H46"
}
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const database = getFirestore(app);
const storage = getStorage(app);

export {
  app,
  auth,
  googleProvider,
  database,
  storage
}
