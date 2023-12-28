// Import the functions you need from the SDKs you need
import { getApp,getApps,initializeApp } from "firebase/app";
import {initializeAuth,getReactNativePersistence, getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVaO72DMOEde6kLMXG5GDvLuGRGZ_8Wfc",
  authDomain: "fir-auth-5c1b2.firebaseapp.com",
  databaseURL: "https://fir-auth-5c1b2-default-rtdb.firebaseio.com",
  projectId: "fir-auth-5c1b2",
  storageBucket: "fir-auth-5c1b2.appspot.com",
  messagingSenderId: "180486277327",
  appId: "1:180486277327:web:d671f202840533626d4fba"
};

// Initialize Firebase
const app = getApps.length>0?getApp():initializeApp(firebaseConfig);
// const auth = getAuth(app)
const auth = getAuth(app)
const db=getFirestore(app)

export {auth,db,app}