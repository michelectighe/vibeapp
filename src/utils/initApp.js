import { initializeDatabase, dropTable, truncateResults } from "@database";
import { auth } from "@config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export const initApp = async () => {
  return new Promise((resolve, reject) => {
    try {
      initializeDatabase();

      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          console.log("✅ user logged in:", currentUser.email);
        } else {
          console.log("🚫 user NOT logged in");
        }

        // ✅ Resolve as soon as auth is checked (regardless of login status)
        unsubscribe(); // avoid future calls
        resolve();
      });
    } catch (err) {
      console.error("🚨 initApp failed:", err);
      reject(err);
    }
  });
};

