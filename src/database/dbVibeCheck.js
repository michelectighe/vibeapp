import * as SQLite from "expo-sqlite";


export const saveResult = async (result) => {
  try {
    const db = await SQLite.openDatabaseAsync("vibrationResults.db");

    await db.runAsync(
      `INSERT INTO results (
                timestamp,
                userID,
                frequency, 
                heartRate,
                rmssd, 
                sdnn,
                motion, 
                overallVibrationScore, 
                chakraScores,
                sound,
                magnitude,
                voiceStrength,
                voiceClarity,
                emotionalState
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        result.timestamp.toISOString(),
        result.userID ?? 0,
        result.frequency ?? 0,
        result.saveHeartRate ?? 0,
        result.saveRMSSD ?? "0",
        result.saveSDNN ?? "0",
        result.motion ?? 0,
        result.overallVibrationScore ?? 0,
        JSON.stringify(result.chakraScores), // ✅ Store as JSON string
        result.sound ?? 0,
        result.magnitude ?? 0,
        result.voiceStrength ?? "0",
        result.voiceClarity ?? "0",
        result.emotionalState ?? 0,
      ],
    );
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

// utils/db.js (or wherever you put it)
export const getLatestResults = async (userID) => {
  try {
    const db = await SQLite.openDatabaseAsync("vibrationResults.db");

    const result = await db.getAllAsync(
      `SELECT * FROM results WHERE userID = '${userID}' ORDER BY timestamp DESC LIMIT 1;`,
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
    await db.runAsync("DELETE FROM results WHERE id = ?;", [id]);
    ////console.log(`✅ Deleted result with ID: ${id}`);

    // Refresh results if a callback is provided
    if (callback) {
      getResults(callback);
    }
  } catch (error) {
    console.error("❌ Error deleting result:", error);
  }
};
