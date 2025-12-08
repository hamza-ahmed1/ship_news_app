// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// get auth
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwDY4oTwUsVR3kPtYGnxA6ZQVySZASSYU",
  authDomain: "shipyard-app-a311c.firebaseapp.com",
  projectId: "shipyard-app-a311c",
  storageBucket: "shipyard-app-a311c.firebasestorage.app",
  messagingSenderId: "46875179004",
  appId: "1:46875179004:web:709c878c4a1a1d87636479",
  measurementId: "G-ZNVKRLQEYS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// export auth module
export const auth = getAuth(app);

export default app;