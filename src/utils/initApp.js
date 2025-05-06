import Purchases from "react-native-purchases";
import { Platform } from "react-native";
import { initializeDatabase } from "@database";
import { auth } from "@config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { loadTensorflowModel } from "react-native-fast-tflite";
import * as Font from "expo-font";


export const initApp = async ({ setModel }) => {
  try {
    //console.log("🌀 Initializing app...");

    await Font.loadAsync({
      AppFontRegular: require("@assets/fonts/Nunito-Regular.ttf"),
      AppFontBold: require("@assets/fonts/Nunito-Bold.ttf"),
      AppFontItalic: require("@assets/fonts/Nunito-Bold.ttf"),
      AppItalic: require("@assets/fonts/Raleway-Italic-VariableFont_wght.ttf"),
      AppTitleFont: require("@assets/fonts/Quicksand-regular.ttf"),
      TypeWriterText: require("@assets/fonts/HomemadeApple-Regular.ttf"),
      JournalText: require("@assets/fonts/HomemadeApple-Regular.ttf"),
    });
    //   console.log("✅ Fonts loaded");
    initializeDatabase();
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        //console.log("user logged in:", currentUser.email);
      } else {
        //console.log("user NOT logged in:");
      }
    });

    const model = await loadTensorflowModel(
      require("@assets/models/ferplus_model_pd_best.tflite")
    );
    setModel(model);
    //  console.log("🔍 Model after init:", model);

    return unsubscribe;
  } catch (err) {
    console.error("🚨 initApp failed:", err);
    throw err;
  }
};
