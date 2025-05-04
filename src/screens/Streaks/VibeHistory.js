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
import { useAmbientControlForScreen } from "@hooks";
import { styles } from "./VibeHistory.styles";
import { globalStyles } from "@styles";

export const VibeHistoryScreen = ({ navigation }) => {
  useAmbientControlForScreen(true);
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
      colors={[Colors.gradient1, Colors.gradient2, Colors.gradient1]}
    >
      <View style={globalStyles.container}>
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
};
