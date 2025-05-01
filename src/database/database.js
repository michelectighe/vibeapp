// import * as SQLite from "expo-sqlite";

// let db;

// export const dropTable = async () => {
//   if (!db) {
//     db = await SQLite.openDatabaseAsync("vibrationResults.db");
//   }
//   await db.execAsync("DROP TABLE IF EXISTS results;");
//   //console.log("🗑️ Table dropped. Restart app to recreate.");
// };

// // Function to initialize the database asynchronously
// export const initializeDatabase = async () => {
//   if (!db) {
//     db = await SQLite.openDatabaseAsync("vibrationResults.db");
//   }
//   try {
//     //    await db.execAsync(`PRAGMA foreign_keys=ON;`); // 🔥 Enforce SQLite execution before table creation

//     await db.execAsync(`
//       CREATE TABLE IF NOT EXISTS results (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         timestamp TEXT,
//         frequency REAL, 
//         heartRate INTEGER,
//         rmssd REAL,
//         sdnn REAL,
//         motion REAL, 
//         overallVibrationScore INTEGER, 
//         chakraScores TEXT,
//         sound REAL,
//         magnitude REAL,
//         voiceStrength REAL,
//         voiceClarity REAL,
//         emotionalState INTEGER
//       );
//     `);

//     await db.execAsync(`
//         CREATE TABLE IF NOT EXISTS vibeMatchResults (
//           id INTEGER PRIMARY KEY AUTOINCREMENT,
//           timestamp TEXT,
//           name1 TEXT,
//           name2 TEXT,
//           frequency1 REAL,
//           frequency2 REAL,
//           strength1 REAL,
//           strength2 REAL,
//           clarity1 REAL,
//           clarity2 REAL,
//           compatibility REAL       
//      );
//       `);

//     //console.log("Database initialized successfully");
//   } catch (error) {
//     console.error("❌ SQL Error Creating Table:", error);
//   }
// };

// export const saveVibeMatch = async (vibeMatchResult) => {
//   try {
//     const db = await SQLite.openDatabaseAsync("vibrationResults.db");

//     await db.runAsync(
//       `INSERT INTO vibeMatchResults (
//                 timestamp,
//                 name1 ,
//                 name2 ,
//                 frequency1 ,
//                 frequency2 ,
//                 strength1 ,
//                 strength2 ,
//                 clarity1 ,
//                 clarity2 ,
//                 compatibility       
            
//             ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
//       [
//         vibeMatchResult.timestamp,
//         vibeMatchResult.person1 ?? "",
//         vibeMatchResult.person2 ?? "",
//         vibeMatchResult.frequency1 ?? 0,
//         vibeMatchResult.frequency2 ?? 0,
//         vibeMatchResult.strength1 ?? 0,
//         vibeMatchResult.strength2 ?? 0,
//         vibeMatchResult.clarity1 ?? 0,
//         vibeMatchResult.clarity2 ?? 0,
//         vibeMatchResult.compatibilityScore ?? 0,
//       ]
//     );
//   } catch (error) {
//     console.error("🔥 SQL Error Saving VibeMatchResults:", error);
//   }
// };

// export const saveResult = async (result) => {
//   try {
//     const db = await SQLite.openDatabaseAsync("vibrationResults.db");

//     await db.runAsync(
//       `INSERT INTO results (
//                 timestamp,
//                 frequency, 
//                 heartRate,
//                 rmssd, 
//                 sdnn,
//                 motion, 
//                 overallVibrationScore, 
//                 chakraScores,
//                 sound,
//                 magnitude,
//                 voiceStrength,
//                 voiceClarity,
//                 emotionalState
//             ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
//       [
//         result.timestamp.toISOString(),
//         result.frequency ?? 0,
//         result.saveHeartRate ?? 0,
//         result.saveRMSSD ?? "0",
//         result.saveSDNN ?? "0",
//         result.motion ?? 0,
//         result.overallVibrationScore ?? 0,
//         JSON.stringify(result.chakraScores), // ✅ Store as JSON string
//         result.sound ?? 0,
//         result.magnitude ?? 0,
//         result.voiceStrength ?? "0",
//         result.voiceClarity ?? "0",
//         result.emotionalState ?? 0,
//       ]
//     );
//   } catch (error) {
//     console.error("🔥 SQL Error Saving Result:", error);
//   }
// };

// // Function to  all results
// export const getResults = async (callback) => {
//   try {
//     const db = await SQLite.openDatabaseAsync("vibrationResults.db"); // Open DB here

//     // Fetch all results
//     const result = await db.getAllAsync(
//       "SELECT * FROM results ORDER BY timestamp DESC;"
//     );

//     if (result && Array.isArray(result)) {
//       if (callback) {
//         callback(result); // Pass the results properly
//       }
//     } else {
//       //console.log("⚠️ No results found in DB.");
//     }
//   } catch (error) {
//     console.error("❌ Error retrieving results:", error);
//   }
// };

// export const getlatestResults = async (callback) => {
//   try {
//     const db = await SQLite.openDatabaseAsync("vibrationResults.db"); // Open DB here

//     // Fetch all results
//     const result = await db.getAllAsync(
//       "SELECT TOP(1) * FROM results ORDER BY timestamp DESC;"
//     );

//     if (result && Array.isArray(result)) {
//       if (callback) {
//         callback(result); // Pass the results properly
//       }
//     } else {
//       //console.log("⚠️ No results found in DB.");
//     }
//   } catch (error) {
//     console.error("❌ Error retrieving results:", error);
//   }
// };

// // Function to  all results
// export const getVibeGraphResults = async () => {
//   try {
//     const db = await SQLite.openDatabaseAsync("vibrationResults.db"); // Open DB

//     // Fetch all results
//     const result = await db.getAllAsync(
//       "SELECT timestamp, overallVibrationScore FROM results ORDER BY timestamp ASC;"
//     );

//     if (result && Array.isArray(result)) {
//       return result; // ✅ Now it returns the results
//     } else {
//       //console.log("⚠️ No results found in DB.");
//       return []; // Return empty array instead of undefined
//     }
//   } catch (error) {
//     console.error("❌ Error retrieving vibeMatchResults:", error);
//     return []; // Return empty array in case of error
//   }
// };

// // Function to  all results
// export const getVibeMatchResults = async () => {
//   try {
//     const db = await SQLite.openDatabaseAsync("vibrationResults.db"); // Open DB

//     // Fetch all results
//     const result = await db.getAllAsync(
//       "SELECT * FROM vibeMatchResults ORDER BY timestamp DESC;"
//     );

//     if (result && Array.isArray(result)) {
//       //console.log("✅ Retrieved VibeMatchResults:", result);
//       return result; // ✅ Now it returns the results
//     } else {
//       //console.log("⚠️ No results found in DB.");
//       return []; // Return empty array instead of undefined
//     }
//   } catch (error) {
//     console.error("❌ Error retrieving vibeMatchResults:", error);
//     return []; // Return empty array in case of error
//   }
// };

// export const truncateResults = async () => {
//   try {
//     const db = await SQLite.openDatabaseAsync("vibrationResults.db"); // Open DB

//     await db.execAsync("DELETE FROM results;"); // ✅ Deletes all rows
//     await db.execAsync("VACUUM;"); // ✅ Reclaims space after deletion

//     //console.log("✅ Table truncated successfully!");
//   } catch (error) {
//     console.error("❌ Error truncating table:", error);
//   }
// };

// export const deleteResult = async (id, callback) => {
//   try {
//     const db = await SQLite.openDatabaseAsync("vibrationResults.db");
//     await db.runAsync("DELETE FROM results WHERE id = ?;", [id]);
//     //console.log(`✅ Deleted result with ID: ${id}`);

//     // Refresh results if a callback is provided
//     if (callback) {
//       getResults(callback);
//     }
//   } catch (error) {
//     console.error("❌ Error deleting result:", error);
//   }
// };

// export const deleteVibeMatchResult = async (id, callback) => {
//   try {
//     const db = await SQLite.openDatabaseAsync("vibrationResults.db");
//     await db.runAsync("DELETE FROM vibeMatchResults WHERE id = ?;", [id]);
//     //console.log(`✅ Deleted result with ID: ${id}`);

//     // Refresh results if a callback is provided
//     if (callback) {
//       getVibeMatchResults(callback);
//     }
//   } catch (error) {
//     console.error("❌ Error deleting result:", error);
//   }
// };
