import * as SQLite from "expo-sqlite";


export const saveResult = async (result) => {
  try {
    const db = await SQLite.openDatabaseAsync("vibrationResults.db");
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
                chakraScores,
                environmentScore,
                voiceStrengthScore,
                voiceClarityScore,
                emotionalScore,
                journalId
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        result.resultId,
        result.userId,
        result.timestamp,
        JSON.stringify(result.voiceFrequencyScore),
        JSON.stringify(result.heartRateScore),
        JSON.stringify(result.motionScore),
        result.overallVibrationScore ?? 0,
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

// Function to  all results
// utils/db.js (or wherever you put it)
export const getResultsForUser = async (userId) => {
  try {
    const db = await SQLite.openDatabaseAsync("vibrationResults.db");

    const results = await db.getAllAsync(
      `SELECT * FROM results WHERE userId = ? ORDER BY timestamp DESC;`,
      [userId],
    );

    return Array.isArray(results) ? results : [results];
  } catch (error) {
    console.error("❌ Error retrieving results:", error);
    return [];
  }
};

export const getResultByID = async (userId, resultId) => {
  try {
    const db = await SQLite.openDatabaseAsync("vibrationResults.db");

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

// utils/db.js (or wherever you put it)
export const getLatestResults = async (userId) => {
  try {
    const db = await SQLite.openDatabaseAsync("vibrationResults.db");
    const result = await db.getAllAsync(
      `SELECT * FROM results WHERE userId = ? ORDER BY timestamp DESC LIMIT 1;`,
      [userId],
    );
    return result?.[0] || null;
  } catch (error) {
    console.error("❌ Error retrieving results:", error);
    return null;
  }
};

export const updateJournalResult = async (id, resultId) => {
  try {
    const db = await SQLite.openDatabaseAsync("vibrationResults.db");
    await db.runAsync("Update results set journalId = ? where resultId = ?;", [id, resultId]);
  } catch (e) {
    console.error("error updating journal entry in results:", e);
  }
};

export const deleteResult = async (userId, resultId, callback) => {
  try {
    const db = await SQLite.openDatabaseAsync("vibrationResults.db");

    await db.runAsync("DELETE FROM results WHERE resultId = ? AND userId = ?;", [resultId, userId]);
    console.log(`✅ Deleted result with resultId: ${resultId} AND userId: ${userId}`);

    if (callback) {
      const updatedResults = await getResultsForUser(userId);
      callback(updatedResults); // ✅ pass them into the callback
    }
  } catch (error) {
    console.error("❌ Error deleting result:", error);
  }
};


