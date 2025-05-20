import { initializeDatabase, dropTable } from "@database";
import { auth } from "@config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
// visionCameraPlugins.js
//import { registerPlugin } from 'react-native-worklets-core';
import { FaceDetector } from "react-native-vision-camera-face-detector";

export const initApp = async () => {
  try {
    initializeDatabase();
    // Register plugin with the Vision Camera plugin system
    //registerPlugin('detectFaces', FaceDetector);

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        ////console.log("user logged in:", currentUser.email);
      } else {
        ////console.log("user NOT logged in:");
      }
    });

    return unsubscribe;
  } catch (err) {
    console.error("🚨 initApp failed:", err);
    throw err;
  }
};
