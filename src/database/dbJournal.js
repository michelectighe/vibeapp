import * as SQLite from "expo-sqlite";
import { db } from "@/config/firebaseConfig";
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";


export const getJournalEntriesDb = async () => {
  try {
    const db = await SQLite.openDatabaseAsync("vibrationResults.db");

    const result = await db.getAllAsync(
      `SELECT * FROM journalEntries where userId = ? ORDER BY createdAt DESC;`,
      [userId],
    );
    return result?.[0] || null;
  } catch (error) {
    console.error("❌ Error retrieving journal Entries:", error);
    return null;
  };
};

  export const saveJournalEntryDb =  async ( journal ) => {
    try {
        const db = await SQLite.openDatabaseAsync("vibrationResults.db");
    await db.runAsync(
      `INSERT OR IGNORE into journalEntries (
        id,    
        prompt,
        entry,
        createdAt 
    ) VALUES (?, ?, ?, ?)`,
      [journal.id, journal.prompt, journal.entry, journal.createdAt ],
    );
  } catch (error) {
    console.error("🔥 SQL Error Saving VibeMatchResults:", error);
  }
};

export const deleteJournalEntryDb = async (id) => {
  try {
    const db = await SQLite.openDatabaseAsync("vibrationResults.db");
    await db.runAsync("DELETE FROM journalEntries WHERE id = ?;", [id]);
    ////console.log(`✅ Deleted result with ID: ${id}`);

    // Refresh results if a callback is provided
    if (callback) {
      //   getVibeMatchResults(callback);
    }
  } catch (error) {
    console.error("❌ Error deleting result:", error);
  }
};

//*********************************************************/

export const saveJournalEntryFs = async (prompt, entry) => {
  const user = getAuth().currentUser;
  if (!user) throw new Error("User not authenticated");

  return addDoc(collection(db, `users/${user.uid}/journalEntries`), {
    prompt,
    entry,
    createdAt: serverTimestamp(),
  });
};

export const getJournalEntriesFs = async () => {
  const user = getAuth().currentUser;
  if (!user) throw new Error("User not authenticated");

  const snapshot = await getDocs(collection(db, `users/${user.uid}/journalEntries`));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

import { deleteDoc, doc } from "firebase/firestore";

export const deleteJournalEntryFs = async (entryId) => {
  const user = getAuth().currentUser;
  if (!user) throw new Error("User not authenticated");

  const entryRef = doc(db, `users/${user.uid}/journalEntries/${entryId}`);
  return deleteDoc(entryRef);
};
