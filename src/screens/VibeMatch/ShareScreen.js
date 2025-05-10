import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Share, Text, ScrollView } from "react-native";
import { getAuth } from "firebase/auth";
import { useAuth } from "@context";
import { loadResults, SCREEN_HEIGHT } from "@utils";
import { GradientBackground, ResultSelector, SectionLayout } from "@components";
import { createMatchLink } from "@services";
import { Colors } from "@constants";
import { useAmbientControlForScreen } from "@hooks";
import { SubscriptionModal } from "@components";
import { globalStyles } from "@styles";
import { styles } from "./ShareScreen.styles";

export const ShareScreen = ({ navigation }) => {
  useAmbientControlForScreen(true);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSubModal, setShowSubModal] = useState(false);
  const auth = getAuth();
  const { user, authLoading, isPremium } = useAuth(); // 🔑 assuming `isPremium` is part of auth context

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigation.navigate("Tabs", {
        screen: "Settings",
        params: {
          screen: "SignInScreen",
          params: {
            returnTo: {
              name: "VibeMatch",
              params: { screen: "ShareScreen" },
            },
          },
        },
      });
      // } else if (!isPremium) {
      //   console.log("not premium - show modal");
      //   setShowSubModal(true);
      //   setLoading(false);
    } else {
      fetchResults();
    }
  }, [authLoading, user, isPremium]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchResults = async () => {
    const data = await loadResults();
    setResults(data);
    setLoading(false);
  };

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
    return <ActivityIndicator size="large" style={{ marginTop: SCREEN_HEIGHT * 0.2 }} />;
  }

  return (
    <>
      <GradientBackground colors={[Colors.gradient1, Colors.gradient2, Colors.gradient1]}>
        <SectionLayout
          topFlex={1}
          middleFlex={0}
          bottomFlex={0}
          safe={false}
          topContent={
            <>
              <View style={styles.titleWrapper}>
                <Text style={styles.title}>Vibe Match</Text>
                <Text style={styles.subTitle}>Let&apos;s see if your vibes are in sync.</Text>
              </View>
              <View style={styles.selectorContainer}>
                <ResultSelector
                  results={results}
                  onSelect={(item) => console.log("Selected:", item)}
                  onShare={onShare}
                />
              </View>
            </>
          }
        />
      </GradientBackground>

      <SubscriptionModal
        visible={showSubModal}
        onClose={(shouldUpgrade) => {
          setShowSubModal(false);
          if (!shouldUpgrade) {
            navigation.replace("Tabs", { screen: "Home" });
          }
        }}
        onUpgrade={() => {
          navigation.navigate("Tabs", {
            screen: "Settings",
            params: {
              screen: "SubscriptionScreen",
              params: { returnTo: "ShareScreen" },
            },
          });
        }}
      />
    </>
  );
};
