import React, { useRef, useCallback, useEffect, useState, useContext } from "react";
import * as Animatable from "react-native-animatable";
import { Animated, View, Text, ScrollView } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { MyResultsContext } from "@/context/MyResultsContext";
import { getAuth } from "firebase/auth";
import { useUserProfile } from "@context";
import { Colors } from "@constants";
import {
  GradientBackground,
  HomeHeaderCard,
  HomeFooterCard,
  SectionWithCards,
  SectionVibeCheck,
  SectionVibeMatch,
  SectionTools,
  SectionAwareness,
  Badge,
  CardMotivationalMirror,
} from "@components";
import { useAmbientControlForScreen } from "@hooks";
import { styles } from "./VibeKeyHome.styles";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { globalStyles } from "@styles";
import { getTodayGoodNews, parseMetric } from "@/utils";
import {  BannerMessage } from "@/components";

import { useAnalysis } from "@/context";

export const VibeKeyHome = () => {
  const { resetAnalysis } = useAnalysis();
  // Now use this for badges, notifications, etc!
  const auth = getAuth();
  const user = auth.currentUser;
  const { myResults } = useContext(MyResultsContext);
  useAmbientControlForScreen(true);
  // console.log("me:", user.uid);
  const tabBarHeight = useBottomTabBarHeight();
  const positionY = useRef(new Animated.Value(-100)).current;
  const navigation = useNavigation();
  const { profile, loading } = useUserProfile();
  const [sections, setSections] = useState([]);
  const [goodNewsCardData, setGoodNewsCard] = useState(null); // not defaulted to cardsGoodNews[0]
  const [goodNewsLoaded, setGoodNewsLoaded] = useState(false);

  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowBanner(false), 14000);
    return () => clearTimeout(timer);
  }, []);

  useFocusEffect(
    useCallback(() => {
      positionY.setValue(-30);
      Animated.timing(positionY, {
        toValue: 45,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, []), // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <GradientBackground colors={[Colors.gradient1, Colors.gradient2, Colors.gradient3]}>
          {/* <BannerMessage
            message="✨ Welcome back! Ready for your next vibe check?"
            visible={showBanner}
          /> */}
          {/* <HomeHeaderCard
            name={profile?.displayName || "friend"}
          /> */}
          <ScrollView
            style={[styles.scrollView, { bottom: tabBarHeight + 12 }]}
            contentContainerStyle={[styles.scrollContent]}
            showsVerticalScrollIndicator={false}
          >
             <HomeHeaderCard
            name={profile?.displayName || "friend"}
          /> 
            <SectionVibeCheck latestResult={myResults[0]} />
            <SectionTools />
            <SectionVibeMatch />
            <CardMotivationalMirror />
            <SectionAwareness />
          </ScrollView>

          {/* <HomeFooterCard
            name={profile?.displayName || "friend"}
            newMatchesCount={newMatchesCount}
          /> */}
        </GradientBackground>
      )}
    </>
  );
};
