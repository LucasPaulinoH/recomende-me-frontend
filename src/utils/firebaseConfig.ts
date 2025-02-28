import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA006UvCbbVCrWxawQ1tjd_8NSKA-BnbeA",
  authDomain: "lp-portfolio-feb74.firebaseapp.com",
  projectId: "lp-portfolio-feb74",
  storageBucket: "lp-portfolio-feb74.firebasestorage.app",
  messagingSenderId: "504909577678",
  appId: "1:504909577678:web:95a76909027fef62ccbf9f",
};

const app = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(app);
