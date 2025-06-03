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

export const getMatchResultById = async (matchId, theirUserId, resultId) => {
  try {
    // console.log("getting match result: ", matchId);
    // console.log("for userid:", userId);
    // console.log("for resultid:", resultId);
    const db = await getDb();

    const result = await db.getAllAsync(
      `SELECT * FROM matchResultsReceived WHERE matchId = ? AND userId = ?  AND resultId = ? ORDER BY timestamp DESC LIMIT 1;`,
      [matchId, theirUserId, resultId],
    );
    return result?.[0] || null;
  } catch (error) {
    console.error("❌ Error retrieving results:", error);
    return null;
  }
};
export const saveVibeMatchReceived = async (sharedResult, matchData) => {
  try {
    console.log("saving vibematchreceived", sharedResult);
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
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        matchData.matchId,
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
    matchId, myUserId, theirUserId, myResultId, theirResultId, theirName, timestamp
  ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        matchData.matchId,
        matchData.myUserId,
        matchData.theirUserId,
        matchData.myResultId,
        matchData.theirResultId,
        matchData.theirName,
      ],
    );

    // 2. ResultId-based version (used for Firestore rules)

    await setDoc(
      doc(dbFs, "users", matchData.myUserId, "matchesReceived", matchData.matchId),
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

  const sentQuery = query(collection(dbFs, "matchLinks"), where("sharedByUserId", "==", uid));
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

export const getSharedResult = async (userId, matchId) => {
  try {
    const localRef = await getLocalMatchMeta(matchId);
    console.log("what is LOCALREF:", localRef);
    if (localRef.length > 0) {
      console.log("got their match record:", localRef);
      if (localRef && localRef) {
        // see if there is a loal match record
        const sharedResult = await getMatchResultById(
          matchId,
          localRef.theirUserId,
          localRef.theirResultId,
          userId,
        ); // if there is, get the local results (if they exist)

        if (sharedResult) {
          const sharedName = localRef?.theirName || "Someone";
          //console.log("[Cache Hit]: Found local match");
          return sharedResult, sharedName;
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
    const sharedResultRef = doc(
      dbFs,
      "users",
      matchData.sharedByUserId,
      "results",
      matchData.sharedByResultId,
    );
    const sharedResultSnap = await getDoc(sharedResultRef);

    if (sharedResultSnap.exists()) {
      // Add the viewer's UID and timestamp to the match link
      const viewerId = userId || "anonymous";
      await updateDoc(doc(dbFs, "matchLinks", matchId), {
        viewers: arrayUnion({
          viewerId,
          timestamp: new Date().toISOString(),
        }),
      });
      const sharedResult = sharedResultSnap.data();
      //          console.log("SHARED RESULT:", sharedResult);
      const sharedName = matchData.sharedByUserName;
      return [{ sharedResult }, { sharedName }];
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
    const { overallSummary, comparisons, sharedChakras, recipientChakras } = comparisonResults;
    
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
        sharedChakras,
        recipientChakras
      },
    });

    console.log("✅ Match link updated with comparison results");
  } catch (error) {
    console.error("❌ Error updating match link:", error);
  }
};

// export const getComparisonData = (matchId) => {

//   const { sharedByUserName, recipientUserName, comparisonResults } = matchLinkDoc.data();

// }

// export const getCompletedMatches = () => {

// }