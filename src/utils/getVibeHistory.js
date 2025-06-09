import { collection, getDocs } from "firebase/firestore";
import { dbFs } from "@config/firebaseConfig";
import { format, startOfWeek } from "date-fns";
import { getAuth } from "firebase/auth";
import { getVibrationInfo } from "@/utils/vibrationInfo";
import { chakraData } from "@/data";

export const groupScores = (scores, range) => {
  const buckets = {};
  scores.forEach((entry) => {
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
    buckets[key].push(entry);
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



export const getVibeHistory = async (myResults) => {
  const scores = [];

  myResults.forEach((data) => {
    const timestamp = new Date(data.timestamp); // ✅ This works for ISO strings
    const hawkins = JSON.parse(data.hawkinsScore || "{}");
    const chakraRaw = JSON.parse(data.chakraScores || "{}");

    if (!isNaN(timestamp.getTime()) && hawkins.score != null) {
      const chakraArray = chakraData.map((chakra) => ({
        ...chakra,
        score: chakraRaw?.[chakra.id] ?? 0,
      }));

      scores.push({
        timestamp,
        score: hawkins.score,
        chakraScores: chakraArray,
      });
    }
  });

  return scores;
};
