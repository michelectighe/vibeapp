import { collection, getDocs } from "firebase/firestore";
import { db } from "@config/firebaseConfig";
import { format, getISOWeek, startOfWeek } from "date-fns";
import { getAuth } from "firebase/auth";
import { getVibrationInfo } from "@/utils/vibrationInfo";
export const groupScores = (scores, range) => {
  const buckets = {};
  scores.forEach(({ timestamp, score }) => {
    let key;
    if (range === "daily") {
      // Group by date, label with weekday
      key = format(timestamp, "EEE"); // Mon, Tue, etc.
    } else if (range === "weekly") {
      const year = timestamp.getFullYear();
      const week = getISOWeek(timestamp);
      key = `${year}-W${week}`; // e.g., "2025-W19"
    } else if (range === "monthly") {
      key = format(timestamp, "MMM"); // Jan, Feb, etc.
    }

    if (!buckets[key]) buckets[key] = [];
    buckets[key].push([score]);
  });
  const weekdayOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const finalBuckets = Object.entries(buckets)
    .sort(([a], [b]) => {
      if (range === "daily") {
        return weekdayOrder.indexOf(a) - weekdayOrder.indexOf(b);
      }
      return a.localeCompare(b); // fallback for weekly/monthly
    })
    .map(([label, values]) => ({
      label,
      value: Math.max(...values),
      barColor: getVibrationInfo(Math.max(Math.max(...values))).color,
    }));
  console.log("FinalBucket:", finalBuckets);
  return finalBuckets;
};

export const getVibeHistory = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) {
    console.warn("User not logged in, cannot fetch results.");
    return [];
  }
  const resultsRef = collection(db, "users", user.uid, "results");
  const querySnapshot = await getDocs(resultsRef);

  const scores = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.timestamp?.seconds && data.overallVibrationScore != null) {
      scores.push({
        timestamp: new Date(data.timestamp.seconds * 1000),
        score: data.overallVibrationScore,
      });
    }
  });
  return scores;
};
