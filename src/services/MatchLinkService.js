import { db } from "@config/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { generateShortId } from "@utils/generateShortId";

/**
 * Create a match link for a user's result stored in `users/{uid}/results/{resultId}`
 * @param {string} resultId - The ID of the result to share
 * @param {string} userId - The UID of the user sharing
 * @returns {Promise<string>} - Deep link with a unique matchId
 */
export const createMatchLink = async (resultId, userId, displayName, shareAnonymously = false) => {
  try {
    const nameToStore = shareAnonymously ? null : displayName;
    let matchId;
    let exists = true;

    while (exists) {
      matchId = generateShortId();
      const matchRef = doc(db, "matchLinks", matchId);
      const snapshot = await getDoc(matchRef);
      exists = snapshot.exists();
    }

    // Declare these values so you can use them
    const sharedByResultId = resultId;
    const sharedByUserId = userId;

    // 1. Friendly ID version (used in links)
    await setDoc(doc(db, "matchLinks", matchId), {
      matchId,
      sharedByUserId,
      sharedByResultId,
      sharedByUserName: nameToStore,
      timestamp: new Date(),
    });

    // 2. ResultId-based version (used for Firestore rules)
    await setDoc(doc(db, "matchLinks", sharedByResultId), {
      matchId,
      sharedByUserId,
      sharedByResultId,
      sharedByUserName: nameToStore,
      timestamp: new Date(),
    });

    return `vibekey://match?id=${matchId}`;
  } catch (error) {
    console.error("❌ Failed to create match link:", error);
    throw error;
  }
};
