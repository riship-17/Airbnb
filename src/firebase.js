import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyA1dOyfFfuZVhDAtMbhkhJ0QplCEwd9ktA",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "airbnb-84da3.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "airbnb-84da3",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "airbnb-84da3.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "549549356180",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:549549356180:web:7398bf23d3614f55ddf081"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
