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


export default function ShareScreen({ navigation }) {
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
    paddingTop: 0,
    paddingHorizontal: "5%",
  },
 
});
