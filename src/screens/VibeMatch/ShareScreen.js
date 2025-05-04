import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Share } from "react-native";
import { getAuth } from "firebase/auth";
import { loadResults, SCREEN_HEIGHT } from "@utils";
import { GradientBackground, ResultSelector } from "@components";
import { createMatchLink } from "@services";
import { Colors } from "@constants";
import { useAmbientControlForScreen } from "@hooks";
import { styles } from "./ShareScreen.styles";
import { globalStyles } from "@styles";

export const ShareScreen = ({ navigation }) => {
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
      const link = await createMatchLink(item.id, auth.currentUser.uid);
      await Share.share({
        message: `Compare your vibe with mine! Tap this link to begin: ${link}`,
      });
    } catch (err) {
      console.error("Share error:", err);
    }
  };

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
