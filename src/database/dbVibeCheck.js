import * as SQLite from "expo-sqlite";


export const saveResult = async (result) => {
  try {
    const db = await SQLite.openDatabaseAsync("vibrationResults.db");
    console.log("saving result:", result);
    await db.runAsync(
      `INSERT INTO results (
                resultID,
                userID,
                timestamp,
                voiceFrequencyScore, 
                heartRateScore,
                motionScore, 
                overallVibrationScore, 
                chakraScores,
                environmentScore,
                voiceStrengthScore,
                voiceClarityScore,
                emotionalScore
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        result.resultID,
        result.userID,
        result.timestamp,
        JSON.stringify(result.voiceFrequencyScore),
        JSON.stringify(result.heartRateScore),
        result.motionScore ?? 0,
        result.overallVibrationScore ?? 0,
        JSON.stringify(result.chakraScores), // ✅ Store as JSON string
        result.environmentScore,
        JSON.stringify(result.voiceStrengthScore),
        JSON.stringify(result.voiceClarityScore),
        JSON.stringify(result.emotionScore),
      ],
    );
    const allResults = await db.getAllAsync(`SELECT * FROM results`);
    console.log("✅ All saved results:", JSON.stringify(allResults, null, 2));
  } catch (error) {
    console.error("🔥 SQL Error Saving Result:", error);
  }
};

// Function to  all results
// utils/db.js (or wherever you put it)
export const getResults = async (userID) => {
  try {
    const db = await SQLite.openDatabaseAsync("vibrationResults.db");

    const result = await db.getAllAsync(
      `SELECT * FROM results WHERE userID = '${userID}' ORDER BY timestamp DESC;`,
    );

    return result?.[0] || null;
  } catch (error) {
    console.error("❌ Error retrieving results:", error);
    return null;
  }
};

export const getResultByID = async (userID, resultID) => {
  try {
    const db = await SQLite.openDatabaseAsync("vibrationResults.db");

    const result = await db.getAllAsync(
      `SELECT * FROM results WHERE userID = ?  AND resultID = ? ORDER BY timestamp DESC LIMIT 1;`,
      [userID, resultID],
    );
    return result?.[0] || null;
  } catch (error) {
    console.error("❌ Error retrieving results:", error);
    return null;
  }
};

// utils/db.js (or wherever you put it)
export const getLatestResults = async (userID) => {
  try {
    const db = await SQLite.openDatabaseAsync("vibrationResults.db");
    const result = await db.getAllAsync(
      `SELECT * FROM results WHERE userID = ? ORDER BY timestamp DESC LIMIT 1;`,
      [userID],
    );
    return result?.[0] || null;
  } catch (error) {
    console.error("❌ Error retrieving results:", error);
    return null;
  }
};

export const truncateResults = async () => {
  try {
    const db = await SQLite.openDatabaseAsync("vibrationResults.db"); // Open DB

    await db.execAsync("DELETE FROM results;"); // ✅ Deletes all rows
    await db.execAsync("VACUUM;"); // ✅ Reclaims space after deletion

    ////console.log("✅ Table truncated successfully!");
  } catch (error) {
    console.error("❌ Error truncating table:", error);
  }
};

export const deleteResult = async (id, callback) => {
  try {
    const db = await SQLite.openDatabaseAsync("vibrationResults.db");
    await db.runAsync("DELETE FROM results WHERE resultID = ?;", [id]);
    ////console.log(`✅ Deleted result with ID: ${id}`);

    // Refresh results if a callback is provided
    if (callback) {
      getResults(callback);
    }
  } catch (error) {
    console.error("❌ Error deleting result:", error);
  }
};
