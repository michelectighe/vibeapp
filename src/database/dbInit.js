import * as SQLite from "expo-sqlite";

let db;

// Function to initialize the database asynchronously
export const initializeDatabase = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync("vibrationResults.db");
  }
  try {
    //    await db.execAsync(`PRAGMA foreign_keys=ON;`); // 🔥 Enforce SQLite execution before table creation
    //  await dropTable();

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS results (
        resultID TEXT PRIMARY KEY,
        userID TEXT,
        timestamp TEXT,
        voiceFrequencyScore TEXT, 
        heartRateScore TEXT,
        motionScore TEXT, 
        overallVibrationScore REAL, 
        chakraScores TEXT,
        environmentScore TEXT,
        voiceStrengthScore TEXT,
        voiceClarityScore TEXT,
        emotionalScore TEXT
      );
    `);

    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS vibeMatchResults (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          timestamp TEXT,
          name1 TEXT,
          name2 TEXT,
          frequency1 REAL,
          frequency2 REAL,
          strength1 REAL,
          strength2 REAL,
          clarity1 REAL,
          clarity2 REAL,
          compatibility REAL       
     );
      `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS sticky_notes (
        id TEXT PRIMARY KEY,
        timestamp TEXT,
        text TEXT,
        x REAL,
        y REAL,
        rotation REAL,
        color TEXT,
        done BOOL
      );
        `);

    ////console.log("Database initialized successfully");
  } catch (error) {
    console.error("❌ SQL Error Creating Table:", error);
  }
};

export const dropTable = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync("vibrationResults.db");
  }
  //  await db.execAsync("DROP TABLE IF EXISTS sticky_notes;");
  await db.execAsync("DROP TABLE IF EXISTS results;");

  //console.log("🗑️ Table dropped. Restart app to recreate.");
};
