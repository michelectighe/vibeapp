import { collection, getDocs, query, orderBy, setDoc, deleteDoc, doc } from "firebase/firestore";
import { dbFs } from "@/config/firebaseConfig";
import { getDb } from "./dbInit";


export const saveResults = async (result, userId) => {
  try {
    const db = await getDb();
    await saveResultDb(result);
    await setDoc(doc(dbFs, "users", userId, "results", result.resultId), result);
    return true;
  } catch (error) {
    console.error("Error saving results:", error);
    return false;
  }
};

export const saveResultDb = async (result) => {
  try {
    const db = await getDb();
    //   console.log("saving result:", result);
    await db.runAsync(
      `INSERT OR REPLACE INTO  results (
                resultId,
                userId,
                timestamp,
                voiceFrequencyScore, 
                heartRateScore,
                motionScore, 
                overallVibrationScore, 
                hawkinsScore,
                chakraScores,
                environmentScore,
                voiceStrengthScore,
                voiceClarityScore,
                emotionScore,
                journalId
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        result.resultId,
        result.userId,
        result.timestamp,
        JSON.stringify(result.voiceFrequencyScore),
        JSON.stringify(result.heartRateScore),
        JSON.stringify(result.motionScore),
        result.overallVibrationScore ?? 0,
        result.hawkinsScore ?? 0,
        JSON.stringify(result.chakraScores), // ✅ Store as JSON string
        JSON.stringify(result.environmentScore),
        JSON.stringify(result.voiceStrengthScore),
        JSON.stringify(result.voiceClarityScore),
        JSON.stringify(result.emotionScore),
        result.journalId ?? 0,
      ],
    );

    //   const allResults = await db.getAllAsync(`SELECT * FROM results`);
    //   console.log("✅ All saved results:", JSON.stringify(allResults, null, 2));
  } catch (error) {
    console.error("🔥 SQL Error Saving Result:", error);
  }
};

// Function to  get all results
// utils/db.js (or wherever you put it)
export const getResultsForUser = async (userId) => {
  try {
    const db = await getDb();
    const results = await db.getAllAsync(
      `SELECT * FROM results WHERE userId = ? ORDER BY timestamp DESC;`,
      [userId],
    );

    return Array.isArray(results) ? results : [results];
  } catch (error) {
    console.error("❌ Error retrieving results locally:", error);
  }
  // if no local, try firebase
  try {
    const resultsRef = collection(dbFs, "users", userId, "results");
    const q = query(resultsRef, orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);
    const results = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return Array.isArray(results) ? results : [results];
  } catch (e) {
    console.error("Error Retrieving results from FS", e);
    return [];
  }
};

export const getResultByID = async (userId, resultId) => {
  try {
    const db = await getDb();

    const result = await db.getAllAsync(
      `SELECT * FROM results WHERE userId = ?  AND resultId = ? ORDER BY timestamp DESC LIMIT 1;`,
      [userId, resultId],
    );
    return result?.[0] || null;
  } catch (error) {
    console.error("❌ Error retrieving results:", error);
    return null;
  }
};

export const updateJournalResultDb = async ({ journalId, resultId }) => {
  try {
    const db = await getDb();
    console.log("📦 typeof journalId:", typeof journalId);
    console.log("🧪 journalId raw value:", JSON.stringify(journalId));
    console.log("🧪 resultId raw value:", JSON.stringify(resultId));
    await db.runAsync("UPDATE results SET journalId = ? WHERE resultId = ?;", [
      journalId,
      resultId,
    ]);
    //   await db.runAsync("UPDATE results SET journalId = ? WHERE resultId = ?", [journalId, resultId]);

    const updated = await db.getFirstAsync("SELECT journalId FROM results WHERE resultId = ?", [
      resultId,
    ]);
    console.log("🔁 After update:", updated);
  } catch (e) {
    console.error("error updating journal entry in results:", e);
  }
};

export const deleteResult = async (userId, resultId) => {
  try {
    const db = await getDb();

    await db.runAsync("DELETE FROM results WHERE resultId = ? AND userId = ?;", [resultId, userId]);
    await db.runAsync("DELETE FROM matchesReceived WHERE myResultId = ? ;", [resultId]);
  } catch (e) {
    console.error("Error deleting result from SQLite:", e);
    return false;
  }

  try {
    const ref = doc(dbFs, "users", userId, "results", resultId);
    await deleteDoc(ref);

    deleteMatchesReceivedByUser(userId);
    deleteSharedLinksByUser(userId);
    console.log("✅ Deleted Firestore record:", ref.path);
    return true;
  } catch (e) {
    console.error(" Error deleting result from Firestore", e);
    return false;
  }
};

const deleteSharedLinksByUser = async (userId) => {
  try {
    const q = query(collection(dbFs, "matcheLinks"), where("sharedByUserId", "==", userId));
    const querySnapshot = await getDocs(q);

    const deletePromises = querySnapshot.docs.map((docSnap) =>
      deleteDoc(doc(dbFs, "matcheLinks", docSnap.id)),
    );

    await Promise.all(deletePromises);
    console.log(`✅ Deleted ${querySnapshot.size} shared match links for user ${userId}`);
  } catch (error) {
    console.error("❌ Error deleting shared links:", error);
  }
};

const deleteMatchesReceivedByUser = async (userId) => {
  try {
    const q = query(
      collection(dbFs, "users", userId, "matchesReceived"),
      where("myUserId", "==", userId),
    );
    const querySnapshot = await getDocs(q);

    const deletePromises = querySnapshot.docs.map((docSnap) =>
      deleteDoc(doc(dbFs, "users", userId, "matchesReceived", docSnap.id)),
    );

    await Promise.all(deletePromises);
    console.log(`✅ Deleted ${querySnapshot.size} matchesReceived for user ${userId}`);
  } catch (error) {
    console.error("❌ Error deleting shared links:", error);
  }
};