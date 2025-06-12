import React, { useRef, useCallback, useContext } from "react";
import { Animated, Text, ScrollView } from "react-native";
import {  useFocusEffect } from "@react-navigation/native";
import { MyResultsContext } from "@/context/MyResultsContext";
import { useUserProfile } from "@context";
import { Colors } from "@constants";
import {
  GradientBackground,
  HomeHeaderCard,
  SectionVibeCheck,
  SectionVibeMatch,
  SectionTools,
  SectionAwareness,
} from "@components";
import { useAmbientControlForScreen } from "@hooks";
import { styles } from "./VibeKeyHome.styles";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

export const VibeKeyHome = () => {
  const { myResults } = useContext(MyResultsContext);
  useAmbientControlForScreen(true);
  const tabBarHeight = useBottomTabBarHeight();
  const positionY = useRef(new Animated.Value(-100)).current;
  const { profile, loading } = useUserProfile();

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
