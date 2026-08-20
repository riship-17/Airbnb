import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1dOyfFfuZVhDAtMbhkhJ0QplCEwd9ktA",
  authDomain: "airbnb-84da3.firebaseapp.com",
  projectId: "airbnb-84da3",
  storageBucket: "airbnb-84da3.firebasestorage.app",
  messagingSenderId: "549549356180",
  appId: "1:549549356180:web:7398bf23d3614f55ddf081"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
