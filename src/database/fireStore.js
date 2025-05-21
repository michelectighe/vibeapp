import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@config/firebaseConfig"; // ✅ Your Firestore instance

export const deleteFirestoreRecord = async (collectionName, resultId, userId) => {
  try {
    await deleteDoc(doc(db, "users", userId, collectionName, resultId));

    console.log(`✅ Deleted Firestore document ${resultId} from ${collectionName}`);
  } catch (error) {
    console.error("❌ Error deleting Firestore document:", error);
  }
};
