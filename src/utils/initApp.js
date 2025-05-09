import { initializeDatabase } from "@database";
import { auth } from "@config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

import { loadTensorflowModel } from "react-native-fast-tflite";

export const initApp = async ({ setModel }) => {
  try {
    //console.log("🌀 Initializing app...");
    initializeDatabase();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        //console.log("user logged in:", currentUser.email);
      } else {
        //console.log("user NOT logged in:");
      }
    });
    const model = await loadTensorflowModel(require("@assets/models/ferplus_model_pd_best.tflite"));
    setModel(model);
    //  console.log("🔍 Model after init:", model);

    return unsubscribe;
  } catch (err) {
    console.error("🚨 initApp failed:", err);
    throw err;
  }
};
