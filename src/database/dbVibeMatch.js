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
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const getMatchResultById = async (matchId, senderUserId, resultId) => {
  try {
    // console.log("getting match result: ", matchId);
    // console.log("for userid:", userId);
    // console.log("for resultid:", resultId);
    const db = await getDb();

    const result = await db.getAllAsync(
      `SELECT * FROM matchResultsReceived WHERE matchId = ? AND userId = ?  AND resultId = ? ORDER BY timestamp DESC LIMIT 1;`,
      [matchId, senderUserId, resultId],
    );
    return result?.[0] || null;
  } catch (error) {
    console.error("❌ Error retrieving results:", error);
    return null;
  }
};
export const saveVibeMatchReceived = async (senderResult, matchData) => {
  try {
    console.log("saving vibematchreceived", senderResult);
    const db = await getDb();
    await db.runAsync(
      ` INSERT OR IGNORE INTO matchResultsReceived ( 
                matchId,
                resultId,
                userId,
                timestamp,
                voiceFrequencyScore, 
                bpmScore,
                hrvScore,
                motionScore, 
                overallVibrationScore, 
                hawkinsScore,
                chakraScores,
                environmentScore,
                voiceStrengthScore,
                voiceClarityScore,
                emotionScore
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        matchData.matchId,
        senderResult.resultId,
        senderResult.userId,
        senderResult.timestamp,
        JSON.stringify(senderResult.voiceFrequencyScore),
        JSON.stringify(senderResult.bpmScore),
        JSON.stringify(senderResult.hrvScore),
        JSON.stringify(senderResult.motionScore),
        senderResult.overallVibrationScore ?? 0,
        JSON.stringify(senderResult.hawkinsScore),
        JSON.stringify(senderResult.chakraScores), // ✅ Store as JSON string
        JSON.stringify(senderResult.environmentScore),
        JSON.stringify(senderResult.voiceStrengthScore),
        JSON.stringify(senderResult.voiceClarityScore),
        JSON.stringify(senderResult.emotionScore),
      ],
    );
    await db.runAsync(
      `
  INSERT OR IGNORE INTO matchesReceived (
    matchId, recipientUserId, senderUserId, recipientResultId, senderResultId, senderUserName, recipientUserName, timestamp
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        matchData.matchId,
        matchData.recipientUserId,
        matchData.senderUserId,
        matchData.recipientResultId,
        matchData.senderResultId,
        matchData.senderUserName,
        matchData.recipientUserName,
        matchData.timestamp,
      ],
    );

    // 2. ResultId-based version (used for Firestore rules)

    await setDoc(
      doc(dbFs, "users", matchData.recipientUserId, "matchesReceived", matchData.matchId),
      matchData,
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
    console.log("getlocalMatchData:", matchId);
    const match = await db.getAllAsync(
      `SELECT * FROM matchesReceived WHERE matchId = ? ORDER BY timestamp DESC LIMIT 1;`,
      [matchId],
    );

    console.log("aftergetloalmatchdata:", match.id);
    return match || null;
  } catch (error) {
    console.error("❌ Error retrieving match results:", error);
    return null;
  }
};

export const getAllMatchesForUserFs = async () => {
  const user = getAuth().currentUser;
  if (!user) throw new Error("User not authenticated");

  const uid = user.uid;

  const sentQuery = query(collection(dbFs, "matchLinks"), where("senderUserId", "==", uid));
  const receivedQuery = query(collection(dbFs, "users", uid, "matchesReceived"));

  const [sentSnap, receivedSnap] = await Promise.all([getDocs(sentQuery), getDocs(receivedQuery)]);

  const sentMatches = sentSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const receivedMatches = receivedSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  console.log("SENT QUERY:", sentMatches);
  console.log("RECEIVED QUERY:", receivedMatches);
  // Optional: filter out duplicates if you expect any overlap
  const allMatches = [...sentMatches, ...receivedMatches];

  return allMatches;
};

export const getsenderResult = async (userId, matchId) => {
  try {
    const localRef = await getLocalMatchMeta(matchId);
    console.log("what is LOCALREF:", localRef);
    if (localRef.length > 0) {
      console.log("got their match record:", localRef);
      if (localRef && localRef) {
        // see if there is a loal match record
        const senderResult = await getMatchResultById(
          matchId,
          localRef.senderUserId,
          localRef.senderResultId,
          userId,
        ); // if there is, get the local results (if they exist)

        if (senderResult) {
          const senderUserName = localRef?.senderUserName || "Someone";
          //console.log("[Cache Hit]: Found local match");
          return senderResult, senderUserName;
        }
      }
    }
    // else get it from firebase.
    console.log("NO LOCAL MATCH RECORD");
    const matchRef = doc(dbFs, "matchLinks", matchId);
    const matchSnap = await getDoc(matchRef);
    if (!matchSnap.exists()) {
      console.warn("Invalid match ID");
      //   setLoadingShared(false);
      return;
    }
    const matchData = matchSnap.data();
    //   console.log('MATCH DATA FROM FS:', matchData)
    const senderResultRef = doc(
      dbFs,
      "users",
      matchData.senderUserId,
      "results",
      matchData.senderResultId,
    );
    const senderResultSnap = await getDoc(senderResultRef);

    if (senderResultSnap.exists()) {
      // Add the viewer's UID and timestamp to the match link
      const viewerId = userId || "anonymous";
      await updateDoc(doc(dbFs, "matchLinks", matchId), {
        viewers: arrayUnion({
          viewerId,
          timestamp: new Date().toISOString(),
        }),
      });
      const senderResult = senderResultSnap.data();
      //          console.log("SHARED RESULT:", senderResult);
      const senderUserName = matchData.senderUserName;
      return [{ senderResult }, { senderUserName }];
    } else return null;

    console.log("[Firestore Fetch]: Match not found locally, fetched from server");
  } catch (error) {
    console.error("Error loading shared result:", error);
  }
};

export const saveCompletedMatchLink = async ({
  matchId,
  recipientUserId,
  recipientUserName,
  recipientResultId,
  comparisonResults,
}) => {
  try {
    console.log(
      "saving to fs:",
      matchId,
      recipientUserId,
      recipientUserName,
      recipientResultId,
      comparisonResults,
    );
    // ✅ Destructure inside the function
    const { overallSummary, comparisons, senderChakrasas, recipientChakras } = comparisonResults;
    
    const matchRef = doc(dbFs, "matchLinks", matchId);
    await updateDoc(matchRef, {
      recipientUserId,
      recipientUserName,
      recipientResultId,
      completed: true,
      read: false,
      timestamp: new Date(),
      comparisonResults: {
        overallSummary,
        comparisons,
        senderChakrasas,
        recipientChakras,
      },
    });

    console.log("✅ Match link updated with comparison results");
  } catch (error) {
    console.error("❌ Error updating match link:", error);
  }
};

// export const getComparisonData = (matchId) => {

//   const { senderUserName, recipientUserName, comparisonResults } = matchLinkDoc.data();

// }

// export const getCompletedMatches = () => {

// }