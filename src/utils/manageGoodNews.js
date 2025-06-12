//utils/manageGoodNews.js
import { doc, getDoc, setDoc } from "firebase/firestore";
import { dbFs } from "@/config/firebaseConfig";
import { goodNewsBackup } from "@/data/goodNewsBackup";

import { collection, getDocs } from "firebase/firestore";

export const getTodayGoodNews = async () => {
  const today = new Date().toISOString().split("T")[0];
  const docRef = doc(dbFs, "goodNews", today); 
  //console.log('what is doc ref:', docRef)
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
  //  console.log('today good new:', docSnap.data())
    return docSnap.data();
  } else {
    // Random fallback logic
    const snapshot = await getDocs(collection(dbFs, "goodNews"));
    const backups = snapshot.docs.filter((d) => d.id.startsWith("random"));
    const random = backups[Math.floor(Math.random() * backups.length)];
    ////console.log("today good new:", random.data());
    return random?.data() || null;
  }
};




export const uploadDataToFireStore = async () => {
  try {
    for (const item of goodNewsBackup) {
      const docRef = doc(dbFs, "goodNews", item.id);
      await setDoc(docRef, item);
      //console.log(`Uploaded: ${item.title}`);
    }
    console.log("All stories uploaded!");
    return true;
  } catch (err) {
    console.error("Upload error:", err);
    return false;
  }
};