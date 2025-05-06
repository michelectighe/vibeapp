import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Share, Text } from "react-native";
import { getAuth } from "firebase/auth";
import { useAuth } from "@context";
import { loadResults, SCREEN_HEIGHT } from "@utils";
import { GradientBackground, ResultSelector, SectionLayout } from "@components";
import { createMatchLink } from "@services";
import { Colors } from "@constants";
import { useAmbientControlForScreen } from "@hooks";
import { SubscriptionModal } from "@components/SubscriptionModal"; // ✅ import
import { styles } from "./ShareScreen.styles";
import { globalStyles } from "@styles";
import { useNavigation } from "@react-navigation/native";

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
      navigation.replace("Tabs", {
        screen: "Settings",
        params: {
          screen: "SignInScreen",
        },
      })
    } else if (!isPremium) {
      setShowSubModal(true);
    } else {
      fetchResults();
    }
  }, [authLoading, user, isPremium]);

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

  if (loading || authLoading) {
    return (
      <ActivityIndicator
        size="large"
        style={{ marginTop: SCREEN_HEIGHT * 0.2 }}
      />
    );
  }

  return (
    <>
      <GradientBackground
        colors={[Colors.gradient1, Colors.gradient2, Colors.gradient1]}
      >
        <SectionLayout
          topFlex={1}
          middleFlex={3}
          bottomFlex={0}
          topContent={
            <View style={globalStyles.titleWrapper}>
              <Text style={globalStyles.title}>Vibe Match</Text>
              <Text style={globalStyles.subTitle}>
                Let's see if your vibe is in sync.
              </Text>
            </View>
          }
          middleContent={
            <View>
              <ResultSelector
                results={results}
                onSelect={(item) => console.log("Selected:", item)}
                onShare={onShare}
              />
            </View>
          }
        />
      </GradientBackground>

      <SubscriptionModal
        visible={showSubModal}
        onClose={(shouldUpgrade) => {
          setShowSubModal(false);
          if (!shouldUpgrade) {
            navigation.replace("Home"); // 👈 send them away if not upgrading
          } else {
            navigation.navigate("Subscription"); // 👈 or your upgrade screen
          }
        }}
      />
    </>
  );
};
