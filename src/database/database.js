import * as SQLite from "expo-sqlite";

let db;

export const dropTable = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync("vibrationResults.db");
  }
  await db.execAsync("DROP TABLE IF EXISTS results;");
  ////console.log("🗑️ Table dropped. Restart app to recreate.");
};
