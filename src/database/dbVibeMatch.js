import * as SQLite from "expo-sqlite";


export const saveVibeMatchReceived = async (myResult, sharedResult, matchId, sharedName) => {
  try {
    const db = await SQLite.openDatabaseAsync("vibrationResults.db");
    await db.runAsync(
      ` INSERT OR IGNORE INTO matchResultsReceived ( (
                matchID,
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
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        matchId,
        sharedResult.resultID,
        sharedResult.userID,
        sharedResult.timestamp,
        JSON.stringify(sharedResult.voiceFrequencyScore),
        JSON.stringify(sharedResult.heartRateScore),
        JSON.stringify(sharedResult.motionScore),
        sharedResult.overallVibrationScore ?? 0,
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
        matchID,
        myResult.userID,
        sharedResult.userID,
        myResult.resultID,
        sharedResult.resultID,
        sharedName,
      ],
    );
  } catch (error) {
    console.error("🔥 SQL Error Saving VibeMatchResults:", error);
  }
};

export const deleteVibeMatchResult = async (id, callback) => {
  try {
    const db = await SQLite.openDatabaseAsync("vibrationResults.db");
    await db.runAsync("DELETE FROM vibeMatchResults WHERE id = ?;", [id]);
    ////console.log(`✅ Deleted result with ID: ${id}`);

    // Refresh results if a callback is provided
    if (callback) {
      getVibeMatchResults(callback);
    }
  } catch (error) {
    console.error("❌ Error deleting result:", error);
  }
};

export const getLocalMatchRef = async (matchId) => {
  const db = await SQLite.openDatabaseAsync("vibrationResults.db");
  try {
    const match = await db.getAllAsync(
      `SELECT * FROM matchesReceived WHERE matchID = ? ORDER BY timestamp DESC LIMIT 1;`,
      [matchId],
    );
    return match?.[0] || null;
  } catch (error) {
    console.error("❌ Error retrieving match results:", error);
    return null;
  }
};