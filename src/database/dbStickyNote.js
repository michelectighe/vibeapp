import * as SQLite from "expo-sqlite";

let db;

export const saveStickyNoteToDB = async (sticky) => {
  try {
    const db = await SQLite.openDatabaseAsync("vibrationResults.db");
    await db.runAsync(
      `INSERT INTO sticky_notes (
        id,
        timestamp,
        text ,
        x ,
        y ,
        rotation ,
        color, 
        done
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        sticky.id,
        sticky.timestamp,
        sticky.text,
        sticky.x,
        sticky.y,
        sticky.rotation,
        sticky.color,
        sticky.done,
      ]
    );
  } catch (error) {
    console.error("🔥 SQL Error Saving StickyNote:", error);
  }
};

export const updateStickyNotePosition = async (
  id,
  { x, y, rotation, done }
) => {
  const db = await SQLite.openDatabaseAsync("vibrationResults.db");
  console.log("updating id:", id);
  await db.runAsync(
    `UPDATE sticky_notes SET x = ?, y = ?, rotation = ?, done = ? WHERE id = ?`,
    [x, y, rotation, done, id]
  );
};

export const deleteStickyNoteById = async (id) => {
  try {
    console.log("delete id:", id);
    const db = await SQLite.openDatabaseAsync("vibrationResults.db");
    await db.runAsync(`DELETE FROM sticky_notes WHERE id = ?`, [id]);
  } catch (error) {
    console.error("Error deleting note:", error);
  }
};
