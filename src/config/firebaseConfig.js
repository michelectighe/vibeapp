// 🔥 Import Firebase modules
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// 🔥 Your Firebase configuration (Replace with your actual config!)
const firebaseConfig = {
  apiKey: "AIzaSyBbK_3L_6VAmZv3RjG0BPsl4aZQ6tU0dns",
  authDomain: "vibrationappauth.firebaseapp.com",
  projectId: "vibrationappauth",
  storageBucket: "vibrationappauth.firebasestorage.app",
  messagingSenderId: "104401126316",
  appId: "1:104401126316:web:ef40e511a436cc25fb3009",
};

// 🔥 Initialize Firebase
const app = initializeApp(firebaseConfig);
//const auth = getAuth(app);
const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export { db, auth };
