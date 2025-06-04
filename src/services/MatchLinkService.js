import { dbFs } from "@config/firebaseConfig";
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
      const matchRef = doc(dbFs, "matchLinks", matchId);
      const snapshot = await getDoc(matchRef);
      exists = snapshot.exists();
    }

    // Declare these values so you can use them
    const senderResultId = resultId;
    const senderUserId = userId;

    // 1. Friendly ID version (used in links)
    await setDoc(doc(dbFs, "matchLinks", matchId), {
      matchId,
      senderUserId,
      senderUserName: nameToStore,
      recipientUserName: null,
      senderResultId,
      recipientUserId: null,
      recipientResultId: null,
      completed: false,
      read: false,
      timestamp: new Date(),
      forComparison: true,
      comparisonResults: {
        overallSummary: null,
        comparisons: null,
        senderChakrasas: null,
        recipientChakras: null,
      },
    });

    // 2. ResultId-based version (used for Firestore rules) - we need this.  don't delete
    await setDoc(doc(dbFs, "matchLinks", senderResultId), {
      matchId,
      senderUserId,
      senderResultId,
      senderUserName: nameToStore,
      timestamp: new Date(),
    });

    return `vibekey://match?id=${matchId}`;
  } catch (error) {
    console.error("❌ Failed to create match link:", error);
    throw error;
  }
};
