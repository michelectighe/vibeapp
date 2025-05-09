import { collection, getDocs } from "firebase/firestore";
import { db } from "@config/firebaseConfig";
import { format, getISOWeek, parseISO } from "date-fns";

export const groupScores = (scores, range) => {
  const buckets = {};

  scores.forEach(({ timestamp, score }) => {
    let key;

    if (range === "daily") {
      key = format(timestamp, "yyyy-MM-dd");
    } else if (range === "weekly") {
      const week = getISOWeek(timestamp);
      const year = timestamp.getFullYear();
      key = `${year}-W${week}`;
    } else if (range === "monthly") {
      key = format(timestamp, "yyyy-MM");
    }

    if (!buckets[key]) buckets[key] = [];
    buckets[key].push(score);
  });

  // Aggregate (average)
  return Object.entries(buckets)
    .sort(([a], [b]) => new Date(a) - new Date(b)) // optional: keep it in order
    .map(([key, values]) => {
      const avg = values.reduce((sum, s) => sum + s, 0) / values.length;
      return { label: key, value: Math.round(avg) };
    });
};

export const getVibeHistory = async () => {
  const querySnapshot = await getDocs(collection(db, "vibeScores")); // adjust path if needed
  const scores = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.timestamp && data.score) {
      scores.push({
        timestamp: new Date(data.timestamp.seconds * 1000), // Firestore timestamp
        score: data.score,
      });
    }
  });
  return scores;
};
