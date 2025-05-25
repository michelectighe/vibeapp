// utils/saveResults.js
import { saveResult as saveToLocalDB } from "@database";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore();
const auth = getAuth();

export const saveResults = async (result) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.warn("User not logged in, skipping Firestore save.");
      return;
    }
 //   console.log('SAVING RESULTS:', result.resultID)
    await saveToLocalDB(result);
    await setDoc(doc(db, "users", user.uid, "results", result.resultID), result);
  } catch (error) {
    console.error("Error saving results:", error);
  }
};

