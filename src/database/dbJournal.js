import * as SQLite from "expo-sqlite";
import { db } from "@/config/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const getJournalEntryByIdDb = async (journalId) => {
  try {
    const db = await SQLite.openDatabaseAsync("vibrationResults.db");

    const result = await db.getAllAsync(
      `SELECT * FROM journalEntries where id = ? ORDER BY createdAt DESC;`,
      [journalId],
    );
    return result?.[0] || null;
  } catch (error) {
    console.error("❌ Error retrieving journal Entry", error);
    return null;
  }
};

export const getJournalEntryByIdFs = async (journalId) => {
  const user = getAuth().currentUser;
  if (!user) throw new Error("User not authenticated");

  const entryRef = doc(db, `users/${user.uid}/journalEntries/${journalId}`);
  const snapshot = await getDoc(entryRef);

  if (!snapshot.exists()) {
    throw new Error("Journal entry not found");
  }

  return { id: snapshot.id, ...snapshot.data() };
};
/*********************************************** */

export const getJournalEntriesDb = async () => {
  try {
    const db = await SQLite.openDatabaseAsync("vibrationResults.db");

    const result = await db.getAllAsync(`SELECT * FROM journalEntries ORDER BY createdAt DESC;`);
    return result?.[0] || null;
  } catch (error) {
    console.error("❌ Error retrieving journal Entries:", error);
    return null;
  }
};

export const getJournalEntriesFs = async () => {
  const user = getAuth().currentUser;
  if (!user) throw new Error("User not authenticated");

  const snapshot = await getDocs(collection(db, `users/${user.uid}/journalEntries`));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

/*****************************************************************/
export const saveJournalEntryDb = async (journal) => {
  try {
    const db = await SQLite.openDatabaseAsync("vibrationResults.db");
    await db.runAsync(
      `INSERT OR REPLACE into journalEntries (
        id,    
        prompt,
        entry,
        createdAt 
    ) VALUES (?, ?, ?, ?)`,
      [journal.id, journal.prompt, journal.entry, journal.createdAt],
    );
  } catch (error) {
    console.error("🔥 SQL Error Saving JournalEntries:", error);
  }
};

export const saveJournalEntryFs = async (id, prompt, entry, createdAt) => {
  const user = getAuth().currentUser;
  if (!user) throw new Error("User not authenticated");

  const entryRef = doc(db, `users/${user.uid}/journalEntries/${id}`);

  return setDoc(entryRef, {
    prompt,
    entry,
    createdAt: createdAt ? new Date(createdAt) : serverTimestamp(),
  });
};
/************************************************************* */
export const deleteJournalEntryDb = async (id) => {
  try {
    const db = await SQLite.openDatabaseAsync("vibrationResults.db");
    await db.runAsync("DELETE FROM journalEntries WHERE id = ?;", [id]);
    ////console.log(`✅ Deleted result with ID: ${id}`);
  } catch (error) {
    console.error("❌ Error deleting result:", error);
  }
};


export const deleteJournalEntryFs = async (entryId) => {
  const user = getAuth().currentUser;
  if (!user) throw new Error("User not authenticated");

  const entryRef = doc(db, `users/${user.uid}/journalEntries/${entryId}`);
  return deleteDoc(entryRef);
};
