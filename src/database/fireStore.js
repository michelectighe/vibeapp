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



// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
    
//     match /users/{userId}/results/{resultId} {
//       allow read: if request.auth != null &&
//                     (request.auth.uid == userId || isMatchLinkValid(userId, resultId));
//       allow create, update, delete: if request.auth != null && request.auth.uid == userId;
//     }

//     match /users/{userId} {
//       allow read, write: if request.auth != null && request.auth.uid == userId;
//     }

//     match /matchLinks/{matchId} {
//       allow read: if true;
//       allow create, update, delete: if request.auth != null;
//       allow update: if true;

//     }

//     function isMatchLinkValid(sharedByUserId, sharedByResultId) {
//       // Search for any matchLinks doc that matches both the user and result ID
//       // You are storing matchLinks with matchId as the doc ID
//       // So we have to assume resultId is inside the data, not the key

//       // 🔥 NOTE: Firestore security rules can't search documents by fields —
//       // so we MUST use resultId as the document ID in /matchLinks/{resultId}
//       return exists(/databases/$(database)/documents/matchLinks/$(sharedByResultId)) &&
//              get(/databases/$(database)/documents/matchLinks/$(sharedByResultId)).data.sharedByUserId == sharedByUserId &&
//              get(/databases/$(database)/documents/matchLinks/$(sharedByResultId)).data.sharedByResultId == sharedByResultId;
//     }
//   }
// }
