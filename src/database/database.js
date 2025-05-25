import * as SQLite from "expo-sqlite";

export const truncateLocalTable = async (tableName) => {
  try {
    const db = await SQLite.openDatabaseAsync("vibrationResults.db"); // Open DB

    await db.execAsync(`DELETE FROM ${tableName}`); // ✅ Deletes all rows
    await db.execAsync("VACUUM;"); // ✅ Reclaims space after deletion
  } catch (error) {
    console.error("❌ Error truncating table:", error);
  }
};
