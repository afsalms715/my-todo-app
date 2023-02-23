// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase"

const firebaseConfig = {
  apiKey:process.env.REACT_APP_apiKey,
  authDomain: "my-todo-app-c0a2c.firebaseapp.com",
  projectId: "my-todo-app-c0a2c",
  storageBucket: "my-todo-app-c0a2c.appspot.com",
  messagingSenderId: "77361045821",
  appId: "1:77361045821:web:c279a59a2df2191796e554",
  measurementId: "G-CLVDQBXMS4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebase=getFirestore(app)
