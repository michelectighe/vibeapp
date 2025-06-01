import * as SQLite from "expo-sqlite";

let dbInstance;
export const getDb = async () => {
  if (dbInstance) return dbInstance;
  dbInstance = await SQLite.openDatabaseAsync("vibrationResults.db");
  return dbInstance;
};

// Function to initialize the database asynchronously
export const initializeDatabase = async () => {
  const db = await getDb();

  try {
    await db.execAsync(`PRAGMA foreign_keys=ON;`); // 🔥 Enforce SQLite execution before table creation

    //   await db.execAsync("DROP TABLE IF EXISTS matchResultsReceived;");
    //  await db.execAsync("DROP TABLE IF EXISTS matchResultsSent;");
   //   await db.execAsync("DROP TABLE IF EXISTS matchedReceived;");

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS results (
        resultId TEXT PRIMARY KEY,
        userId TEXT,
        timestamp TEXT,
        voiceFrequencyScore TEXT,
        heartRateScore TEXT,
        motionScore TEXT,
        overallVibrationScore REAL,
        hawkinsScore REAL,
        chakraScores TEXT,
        environmentScore TEXT,
        voiceStrengthScore TEXT,
        voiceClarityScore TEXT,
        emotionScore TEXT,
        journalId TEXT
      );
    `);
    const columns = await db.getAllAsync("PRAGMA table_info(results);");
    // console.log("🔍 results table columns:", columns);

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
        hawkinsScore REAL,
        chakraScores TEXT,
        environmentScore TEXT,
        voiceStrengthScore TEXT,
        voiceClarityScore TEXT,
        emotionScore TEXT
      );
    `);

    await db.execAsync(`
   CREATE TABLE IF NOT EXISTS matchesReceived (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    MatchId TEXT,
    myUserId TEXT,
    theirUserId TEXT,
    myResultId TEXT,
    theirResultId TEXT,
    theirName TEXT,
    timeStamp TEXT,
    UNIQUE (MatchID, myResultID, theirResultID)
  );
`);

    await db.execAsync(`
  CREATE TABLE IF NOT EXISTS matchesSent (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    MatchID TEXT,
    myUserId TEXT,
    theirUserId TEXT,
    myResultId TEXT,
    theirResultId TEXT,
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
      id TEXT,
      prompt TEXT,
      entry TEXT,
      gratitude TEXT,
      kindness TEXT,
      createdAt TEXT PRIMARY KEY
    );
     `);

    ////console.log("Database initialized successfully");
  } catch (error) {
    console.error("❌ SQL Error Creating Table:", error);
  }
};

export const dropTable = async () => {
  db = await getDb();

  await db.execAsync("DROP TABLE IF EXISTS results;");
  //await db.execAsync("DROP TABLE IF EXISTS matchesSent;");
  //await db.execAsync("DROP TABLE IF EXISTS MatchResultsReceived;");
  //console.log("🗑️ Table dropped. Restart app to recreate.");
};
