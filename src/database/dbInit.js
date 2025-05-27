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
        resultId TEXT PRIMARY KEY,
        userId TEXT,
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
      CREATE TABLE IF NOT EXISTS MatchResultsReceived (
        matchId TEXT PRIMARY KEY,
        ResultID TEXT,
        userId TEXT,
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
  CREATE TABLE IF NOT EXISTS matchesReceived (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    MatchID TEXT,
    myUserID TEXT,
    theirUserID TEXT,
    myResultID TEXT,
    theirResultID TEXT,
    theirName TEXT,
    timeStamp TEXT,
    UNIQUE (MatchID, myResultID, theirResultID)
  );
`);

    await db.execAsync(`
  CREATE TABLE IF NOT EXISTS matchesSent (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    MatchID TEXT,
    myUserID TEXT,
    theirUserID TEXT,
    myResultID TEXT,
    theirResultID TEXT,
    theirName TEXT,
    timeStamp TEXT,
    UNIQUE (MatchID, myResultID, theirResultID)
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

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS journalEntries (
      id TEXT PRIMARY KEY,
      prompt TEXT,
      entry TEXT,
      createdAt TEXT
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
  //await db.execAsync("DROP TABLE IF EXISTS matchesSent;");
  //await db.execAsync("DROP TABLE IF EXISTS matchesReceived;");
  //console.log("🗑️ Table dropped. Restart app to recreate.");
};
