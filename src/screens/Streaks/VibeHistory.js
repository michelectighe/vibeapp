import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  Share,
} from "react-native";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { loadResults, SCREEN_HEIGHT } from "@utils";
import { GradientBackground, ResultSelector } from "@components";
import { createMatchLink } from "@services";
import { getAuth } from "firebase/auth";
import { Colors, Fonts } from "@constants";

export default function VibeHistoryScreen({ navigation }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const fetchResults = async () => {
      const data = await loadResults();
      setResults(data);
      setLoading(false);
    };
    fetchResults();
  }, []);

  const onShare = async (item) => {
    try {
      const link = await createMatchLink(item.id, auth.currentUser.uid); // use item.id if already saved
      await Share.share({
        message: `Compare your vibe with mine! Tap this link to begin: ${link}`,
      });
    } catch (err) {
      console.error("Share error:", err);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp?.toDate) return "";

    return timestamp.toDate().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <Text style={styles.score}>
          {item.overallVibrationScore.toFixed(0)}
        </Text>
        <Ionicons
          name="share-outline"
          size={20}
          color="#333"
          onPress={() => onShare(item)}
          style={styles.shareIcon}
        />
      </View>
      <Text style={styles.date}>{formatDate(item.timestamp)}</Text>
    </View>
  );

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        style={{ marginTop: SCREEN_HEIGHT * 0.2 }}
      />
    );
  }

  return (
    <GradientBackground
      colors={[
        Colors.VibeGradient1,
        Colors.VibeGradient2,
        Colors.VibeGradient1,
      ]}
    >
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <ResultSelector
            results={results}
            onSelect={(item) => console.log("Selected:", item)}
            onShare={onShare}
          />
        </View>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: "transparent",
  },
  innerContainer: {
    marginTop: 100,
    padding: 20,
    paddingLeft: "10%",
    paddingRight: "10%",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: "center",
  },
  date: {
    fontSize: 14,
    color: "#888",
    position: "absolute",
    bottom: 0,
  },
  score: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 2,
    marginBottom: 6,
  },
  details: {
    fontSize: 14,
    marginTop: 2,
    color: "#555",
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },

  shareIcon: {
    padding: 6,
  },
});
