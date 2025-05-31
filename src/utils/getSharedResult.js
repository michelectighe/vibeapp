import { getLocalMatchMeta , getMatchResultByID} from "@/database";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { dbFs } from "@config/firebaseConfig";
export const getSharedResult =  async (matchId) => { 

try {
    const localRef = await getLocalMatchMeta(matchId);
    if (localRef) {
        if (localRef.theirResultID && localRef.theirUserID) {
        // see if there is a loal match record
            const sharedResult = await getMatchResultByID(
            matchId,
            localRef.theirUserID,
            localRef.theirResultID,); // if there is, get the local results (if they exist)
        
            if (sharedResult) {
              const sharedName = localRef?.theirName || "Someone";
              //console.log("[Cache Hit]: Found local match");
              return sharedResult, sharedName;
            } 
        };
    };
    // else get it from firebase.
    const matchRef = doc(dbFs, "matchLinks", matchId);
    const matchSnap = await getDoc(matchRef);
    if (!matchSnap.exists()) {
      console.warn("Invalid match ID");
   //   setLoadingShared(false);
      return;
    }
    const matchData = matchSnap.data();
    const sharedResultRef = doc(
      dbFs,
      "users",
      matchData.sharedByUserId,
      "results",
      matchData.sharedByResultId,
    );
    const sharedResultSnap = await getDoc(sharedResultRef);

    if (sharedResultSnap.exists()) {
      // Add the viewer's UID and timestamp to the match link
      const viewerId = user?.uid || "anonymous";
      await updateDoc(doc(dbFs, "matchLinks", matchId), {
        viewers: arrayUnion({
          viewerId,
          timestamp: new Date().toISOString(),
        }),
      });
      const sharedResult = sharedResultSnap.data();
      const sharedName = matchData.sharedByUserName;
        return (sharedResult, sharedName);
    }
    else return(null);
  
  console.log("[Firestore Fetch]: Match not found locally, fetched from server");
} catch (error) {
  console.error("Error loading shared result:", error);
}
};  