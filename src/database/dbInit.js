// db/initializeDatabase.js
import * as SQLite from "expo-sqlite";

let dbInstance;
export const getDb = async () => {
  if (dbInstance) return dbInstance;
  dbInstance = await SQLite.openDatabaseAsync("vibrationResults.db");
  return dbInstance;
};

export const initializeDatabase = async () => {
  const db = await getDb();
//  await dropAllTables();
  try {
    await db.execAsync(`PRAGMA foreign_keys=ON;`);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS results (
        resultId TEXT PRIMARY KEY,
        userId TEXT,
        timestamp DATETIME,
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
        -- FOREIGN KEY (journalId) REFERENCES journalEntries(id)
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS matchResultsReceived (
        matchId TEXT PRIMARY KEY,
        resultId TEXT,
        userId TEXT,
        timestamp DATETIME,
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
        matchId TEXT,
        myUserId TEXT,
        theirUserId TEXT,
        myResultId TEXT,
        theirResultId TEXT,
        theirName TEXT,
        timestamp DATETIME,
        UNIQUE (matchId, myResultId, theirResultId)
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS matchesSent (
        matchId TEXT,
        myUserId TEXT,
        theirUserId TEXT,
        myResultId TEXT,
        theirResultId TEXT,
        theirName TEXT,
        timestamp DATETIME,
        UNIQUE (matchId, myResultId, theirResultId)
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS sticky_notes (
        id TEXT PRIMARY KEY,
        timestamp DATETIME,
        text TEXT,
        x REAL,
        y REAL,
        rotation REAL,
        color TEXT,
        done BOOLEAN
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS journalEntries (
        id TEXT PRIMARY KEY,
        prompt TEXT,
        entry TEXT,
        gratitude TEXT,
        kindness TEXT,
        createdAt DATETIME
      );
    `);

    console.log("✅ Database initialized cleanly");
  } catch (error) {
    console.error("❌ SQL Error Creating Table:", error);
  }
};

export const dropAllTables = async () => {
  const db = await getDb();
  const tables = [
    "results",
    "matchResultsReceived",
    "matchesReceived",
    "matchesSent",
    "sticky_notes",
    "journalEntries",
  ];
  for (const table of tables) {
    await db.execAsync(`DROP TABLE IF EXISTS ${table};`);
  }
  console.log("🧹 All tables dropped.");
};
