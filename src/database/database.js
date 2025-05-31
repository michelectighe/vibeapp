import { getDb } from "./dbInit";

export const truncateLocalTable = async (tableName) => {
  try {

    const  db = await getDb();
    await db.execAsync(`DELETE FROM ${tableName}`); // ✅ Deletes all rows
    await db.execAsync("VACUUM;"); // ✅ Reclaims space after deletion
  } catch (error) {
    console.error("❌ Error truncating table:", error);
  }
};



