// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey:`${process.env.REACT_APP_API_KEY}`,
  authDomain: `${process.env.REACT_APP_authDomain}`,
  databaseURL: `${process.env.REACT_APP_databaseURL}`,
  projectId: `${process.env.REACT_APP_projectId}`,
  storageBucket: `${process.env.REACT_APP_storageBucket}`,
  messagingSenderId: `${process.env.REACT_APP_messagingSenderId}`,
  appId: `${process.env.REACT_APP_appId}`,
  measurementId: `${process.env.REACT_APP_measurementId}`
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database=getDatabase(app)
export const auth=getAuth(app)
