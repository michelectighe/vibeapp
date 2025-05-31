import * as SQLite from "expo-sqlite";
import { getDb } from "./dbInit";
import { dbFs } from "@/config/firebaseConfig";

import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const getMatchResultByID = async (matchId, userId, resultId) => {
  try {
    // console.log("getting match result: ", matchId);
    // console.log("for userid:", userId);
    // console.log("for resultid:", resultId);
    const db = await getDb();

    const result = await db.getAllAsync(
      `SELECT * FROM matchResultsReceived WHERE matchId = ? AND userId = ?  AND resultId = ? ORDER BY timestamp DESC LIMIT 1;`,
      [matchId, userId, resultId],
    );
    return result?.[0] || null;
  } catch (error) {
    console.error("❌ Error retrieving results:", error);
    return null;
  }
};
export const saveVibeMatchReceived = async (myResult, sharedResult, matchId, sharedName) => {
  try {
    const db = await getDb();
    await db.runAsync(
      ` INSERT OR IGNORE INTO matchResultsReceived ( 
                matchId,
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
                emotionScore
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        matchId,
        sharedResult.resultId,
        sharedResult.userId,
        sharedResult.timestamp,
        JSON.stringify(sharedResult.voiceFrequencyScore),
        JSON.stringify(sharedResult.heartRateScore),
        JSON.stringify(sharedResult.motionScore),
        sharedResult.overallVibrationScore ?? 0,
        sharedResult.hawkinsScore ?? 0,
        JSON.stringify(sharedResult.chakraScores), // ✅ Store as JSON string
        JSON.stringify(sharedResult.environmentScore),
        JSON.stringify(sharedResult.voiceStrengthScore),
        JSON.stringify(sharedResult.voiceClarityScore),
        JSON.stringify(sharedResult.emotionScore),
      ],
    );
    await db.runAsync(
      `
  INSERT OR IGNORE INTO matchesReceived (
    MatchID, myUserID, theirUserID, myResultID, theirResultID, theirName
  ) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        matchId,
        myResult.userId,
        sharedResult.userId,
        myResult.resultId,
        sharedResult.resultId,
        sharedName,
      ],
    );
  } catch (error) {
    console.error("🔥 SQL Error Saving VibeMatchResults:", error);
  }
};

export const deleteVibeMatchResult = async (id) => {
  try {
    const db = await getDb();
    await db.runAsync("DELETE FROM vibeMatchResults WHERE id = ?;", [id]);
  } catch (error) {
    console.error("❌ Error deleting result:", error);
  }
};

export const getLocalMatchMeta = async (matchId) => {
  const db = await getDb();
  try {
    const match = await db.getAllAsync(
      `SELECT * FROM matchesReceived WHERE matchId = ? ORDER BY timestamp DESC LIMIT 1;`,
      [matchId],
    );
    return match?.[0] || null;
  } catch (error) {
    console.error("❌ Error retrieving match results:", error);
    return null;
  }
};

export const getAllMatchesForUserFs = async () => {
  const user = getAuth().currentUser;
  if (!user) throw new Error("User not authenticated");

  const uid = user.uid;

  const sentQuery = query(collection(dbFs, "matches"), where("myUserID", "==", uid));
  const receivedQuery = query(collection(dbFs, "matches"), where("theirUserID", "==", uid));

  const [sentSnap, receivedSnap] = await Promise.all([getDocs(sentQuery), getDocs(receivedQuery)]);

  const sentMatches = sentSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const receivedMatches = receivedSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  // Optional: filter out duplicates if you expect any overlap
  const allMatches = [...sentMatches, ...receivedMatches];

  return allMatches;
};
