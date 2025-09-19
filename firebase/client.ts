// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwt_JLbp8C1WoTj_dxmWnfmKN15KDSXQ8",
  authDomain: "mockmate-81e05.firebaseapp.com",
  projectId: "mockmate-81e05",
  storageBucket: "mockmate-81e05.firebasestorage.app",
  messagingSenderId: "144005628661",
  appId: "1:144005628661:web:f5f8ecfd48c51d6507fbbc",
  measurementId: "G-4WC48CSH1R"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) :getApp();

export const auth = getAuth(app)
export const db = getFirestore(app)
