import { collection, getDocs } from "firebase/firestore";
import { db } from "@config/firebaseConfig";
import { format, startOfWeek } from "date-fns";
import { getAuth } from "firebase/auth";
import { getVibrationInfo } from "@/utils/vibrationInfo";
import { chakraData } from "@/constants";

export const groupScores = (scores, range) => {
  const buckets = {};

  scores.forEach(( entry ) => {
    let key;
    if (range === "daily") {
      key = format(entry.timestamp, "EEE"); // e.g., "Mon"
    } else if (range === "weekly") {
      //  key = `${year}-W${week}`; // e.g., "2025-W19"
      const start = startOfWeek(entry.timestamp, { weekStartsOn: 1 }); // Monday
      const end = new Date(start);
      end.setDate(end.getDate() + 6); // Sunday of the same week
      key = `${format(start, "MMM d")}–${format(end, "d")}`; // e.g., "May 6–12"
    } else if (range === "monthly") {
      key = format(entry.timestamp, "MMM"); // e.g., "May"
    }

    if (!buckets[key]) buckets[key] = [];
    buckets[key].push( entry );
  });

  const weekdayOrder = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const finalBuckets = Object.entries(buckets)
    .sort(([a], [b]) => {
      if (range === "daily") {
        return weekdayOrder.indexOf(a) - weekdayOrder.indexOf(b);
      }
      return a.localeCompare(b);
    })
    .map(([label, entries]) => {
      const scoresOnly = entries.map((e) => e.score);
      const value =
        range === "daily"
          ? Math.max(...scoresOnly)
          : Math.round(scoresOnly.reduce((sum, val) => sum + val, 0) / scoresOnly.length);

      return {
        label,
        value,
        barColor: getVibrationInfo(value).color,
        date: entries[0].timestamp, // use first timestamp for that group
        //chakraScores: entries[0].chakraScores ?? [],
        chakraScores: entries[0].chakraScores ?? [], // ✅ pass it through
      };
    });

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
      // Convert chakraScores object into an array
      const chakraArray = chakraData.map((chakra) => ({
        ...chakra,
        score: data.chakraScores?.[chakra.id] ?? 0,
      }));
      console.log("chakraArray:", chakraArray);
      scores.push({
        timestamp: new Date(data.timestamp.seconds * 1000),
        score: data.overallVibrationScore,
        chakraScores: chakraArray,
        // include any other fields if needed
      });
    }
  });

  return scores;
};
