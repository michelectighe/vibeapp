import { db } from "@config/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { generateShortId } from "@utils/generateShortId";

/**
 * Create a match link for a user's result stored in `users/{uid}/results/{resultId}`
 * @param {string} resultId - The ID of the result to share
 * @param {string} userId - The UID of the user sharing
 * @returns {Promise<string>} - Deep link with a unique matchId
 */
export const createMatchLink = async (resultId, userId) => {
  try {
    let matchId;
    let exists = true;

    while (exists) {
      matchId = generateShortId();
      const matchRef = doc(db, "matchLinks", matchId);
      const snapshot = await getDoc(matchRef);
      exists = snapshot.exists();
    }

    const matchRef = doc(db, "matchLinks", matchId);
    await setDoc(matchRef, {
      matchId,
      sharedByResultId: resultId,
      sharedByUserId: userId,
      timestamp: new Date(),
      viewers: [],
    });

    return `vibekey://match?id=${matchId}`;
  } catch (error) {
    console.error("❌ Failed to create match link:", error);
    throw error;
  }
};
