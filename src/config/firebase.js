import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAAjhij2YspP8j-mfPOUQDMnDUqtdm6fMM",
  authDomain: "conver-sa-ac0b3.firebaseapp.com",
  projectId: "conver-sa-ac0b3",
  storageBucket: "conver-sa-ac0b3.appspot.com",
  messagingSenderId: "736510300324",
  appId: "1:736510300324:web:34567b00d758557febd631",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const gitProvider = new GithubAuthProvider();

export { app, auth, googleProvider, gitProvider };
