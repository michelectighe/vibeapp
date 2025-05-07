import * as SQLite from "expo-sqlite";


export const saveVibeMatch = async (vibeMatchResult) => {
  try {
    const db = await SQLite.openDatabaseAsync("vibrationResults.db");

    await db.runAsync(
      `INSERT INTO vibeMatchResults (
                timestamp,
                name1 ,
                name2 ,
                frequency1 ,
                frequency2 ,
                strength1 ,
                strength2 ,
                clarity1 ,
                clarity2 ,
                compatibility       
            
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        vibeMatchResult.timestamp,
        vibeMatchResult.person1 ?? "",
        vibeMatchResult.person2 ?? "",
        vibeMatchResult.frequency1 ?? 0,
        vibeMatchResult.frequency2 ?? 0,
        vibeMatchResult.strength1 ?? 0,
        vibeMatchResult.strength2 ?? 0,
        vibeMatchResult.clarity1 ?? 0,
        vibeMatchResult.clarity2 ?? 0,
        vibeMatchResult.compatibilityScore ?? 0,
      ],
    );
  } catch (error) {
    console.error("🔥 SQL Error Saving VibeMatchResults:", error);
  }
};

// Function to  all results
export const getVibeMatchResults = async () => {
  try {
    const db = await SQLite.openDatabaseAsync("vibrationResults.db"); // Open DB

    // Fetch all results
    const result = await db.getAllAsync("SELECT * FROM vibeMatchResults ORDER BY timestamp DESC;");

    if (result && Array.isArray(result)) {
      //console.log("✅ Retrieved VibeMatchResults:", result);
      return result; // ✅ Now it returns the results
    } else {
      //console.log("⚠️ No results found in DB.");
      return []; // Return empty array instead of undefined
    }
  } catch (error) {
    console.error("❌ Error retrieving vibeMatchResults:", error);
    return []; // Return empty array in case of error
  }
};

export const deleteVibeMatchResult = async (id, callback) => {
  try {
    const db = await SQLite.openDatabaseAsync("vibrationResults.db");
    await db.runAsync("DELETE FROM vibeMatchResults WHERE id = ?;", [id]);
    //console.log(`✅ Deleted result with ID: ${id}`);

    // Refresh results if a callback is provided
    if (callback) {
      getVibeMatchResults(callback);
    }
  } catch (error) {
    console.error("❌ Error deleting result:", error);
  }
};
