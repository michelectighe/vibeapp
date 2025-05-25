// utils/loadResults.js
import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getResultsForUser } from "@/database";

const db = getFirestore();
const auth = getAuth();

export const loadResults = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.warn("User not logged in");
      return [];
    }
    // first try getting local results
    const localResultsRef = getResultsForUser(user.uid);
    if (localResultsRef) {
      console.log("Got local Results");
      return localResultsRef;
    } else {
      const resultsRef = collection(db, "users", user.uid, "results");
      const q = query(resultsRef, orderBy("timestamp", "desc"));
      const snapshot = await getDocs(q);

      const results = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return results;
    }
  } catch (error) {
    console.error("Error loading results from Firestore:", error);
    return [];
  }
};
