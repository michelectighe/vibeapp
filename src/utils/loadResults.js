// utils/loadResults.js
import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getResultsForUser } from "@/database";

const db = getFirestore();
const auth = getAuth();

export const loadResults = async (userId) => {
  try {
    if (!userId) {
      console.warn("User not logged in");
      return [];
    }
    // first try getting local results
    const localResultsRef = getResultsForUser(userId);
    if (localResultsRef.length > 0) {
      //console.log("Got local Results");
      return localResultsRef;
    } else {
      //console.log("no local results. checking firebase");
      const resultsRef = collection(db, "users", userId, "results");
      const q = query(resultsRef, orderBy("timestamp", "desc"));
      const snapshot = await getDocs(q);

      const results = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      //console.log('INSIDE LOAD RESULTS:', results)
      return results;
    }
  } catch (error) {
    console.error("Error loading results from Firestore:", error);
    return [];
  }
};
