import * as SQLite from "expo-sqlite";
import { getDb } from "./dbInit";


export const saveStickyNoteToDb = async (sticky) => {
  try {
    console.log("saving sticky:", sticky);
    const db = await getDb();

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
      ],
    );
  } catch (error) {
    console.error("🔥 SQL Error Saving StickyNote:", error);
  }
};

export const getAllStickyNotes = async () => {
  try {
    const db = await getDb();
    const result = await db.getAllAsync("SELECT * FROM sticky_notes");

    return result;
  } catch (e) {
    console.error("error getting all stickyNotes:", e);
  }
};

export const updateStickyNotePositionDb = async (id, { x, y, rotation, done }) => {
  try {
    const db = await getDb();
    //console.log("updating id:", id);
    await db.runAsync("UPDATE sticky_notes SET x = ?, y = ?, rotation = ?, done = ? WHERE id = ?", [
      x,
      y,
      rotation,
      done,
      id,
    ]);
  } catch (e) {
    console.error("Error updating sticky:", e);
  }
};
export const updateStickyDoneDb = async (id, done) => {
  try {
    const db = await getDb();
    //console.log("updating id:", id);
    console.log("setting done:", done);
    await db.runAsync("UPDATE sticky_notes SET done = ? WHERE id = ?", [done, id]);
  } catch (e) {
    console.error("Error updating sticky:", e);
  }
};

export const updateStickyDb = async (id, text, color) => {
  try {
    console.log("UPDATING t=:", id, text, color);
    const db = await getDb();
    //console.log("updating id:", id);

    await db.runAsync("UPDATE sticky_notes SET text = ?, color = ?  WHERE id = ?", [
      text,
      color,
      id,
    ]);
  } catch (e) {
    console.error("Error updating sticky:", e);
  }
};

 



export const deleteStickyNoteByIdDb = async (id) => {
  try {
    //console.log("delete id:", id);
    const db = await getDb();
    await db.runAsync("DELETE FROM sticky_notes WHERE id = ?", [id]);
  } catch (error) {
    console.error("Error deleting note:", error);
  }
};
