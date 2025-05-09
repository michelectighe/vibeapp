// utils/saveResults.js
import { saveResult as saveToLocalDB } from "@database";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore();
const auth = getAuth();

export const saveResults = async (result) => {
  try {
    // Save to local DB
    console.log("insideSaveResults:", result);
    saveToLocalDB(result);
    console.log("results saved locally");
    // Save to Firestore
    const user = auth.currentUser;
    if (!user) {
      console.warn("User not logged in, skipping Firestore save.");
      return;
    }
 //   console.log("user:", user);
    const resultsRef = collection(db, "users", user.uid, "results");
    await addDoc(resultsRef, {
      ...result,
      timestamp: serverTimestamp(),
    });

    //console.log("Results saved to Firestore and local DB");
  } catch (error) {
    console.error("Error saving results:", error);
  }
};
