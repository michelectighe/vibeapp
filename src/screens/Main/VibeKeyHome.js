import React, { useRef, useCallback, useEffect, useState } from "react";
import * as Animatable from "react-native-animatable";
import { Animated, View, Text, ScrollView } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { getLatestResults } from "@/database";
import { useUserProfile } from "@context";
import { Colors } from "@constants";
import { GradientBackground, HomeHeaderCard, Card } from "@components";
import { useAmbientControlForScreen } from "@hooks";
import { styles } from "./VibeKeyHome.styles";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { globalStyles } from "@styles";
import { SectionLayout, SectionWithCards } from "@/components";
import { getTodayGoodNews } from "@/utils";
import {
  cardsTools,
  cardsVibeCheck,
  cardsVibeMatch,
  cardsMeditationScan,
  cardsStreak,
  cardsGoodNews,
} from "@/data";

export const VibeKeyHome = ({ onReady }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  useAmbientControlForScreen(true);
  // console.log("me:", user.uid);
  const tabBarHeight = useBottomTabBarHeight();
  const positionY = useRef(new Animated.Value(-100)).current;
  const navigation = useNavigation();
  const { profile, loading } = useUserProfile();
  const [sections, setSections] = useState([]);
  const [goodNewsCardData, setGoodNewsCard] = useState(null); // not defaulted to cardsGoodNews[0]
  const [goodNewsLoaded, setGoodNewsLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      //console.log("telling app.js we are ready");
      onReady?.(); // <- Only calls it if defined
      // ✅ this sets state in App.js!
    }, 300);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    (async () => {
      const story = await getTodayGoodNews();

      if (story) {
        setGoodNewsCard({
          ...cardsGoodNews[0],
          subtitle: story.title,
          image: { uri: story.imageUrl },
          screen: {
            ...cardsGoodNews[0].screen,
            params: {
              storyId: story.id,
            },
          },
        });
      } else {
        setGoodNewsCard(cardsGoodNews[0]); // fallback to default structure
      }
      setGoodNewsLoaded(true); // ← only after card is ready
    })();
  }, []);

  useEffect(() => {
    if (!goodNewsLoaded) return;
    const buildSections = async () => {
      const cards = [...cardsVibeCheck];
      const userId = user?.uid;
      // Remove the recent results card if not logged in
      if (!userId) {
        const filtered = cards.filter((c) => c.id !== "recent-results");
        setSections([
          {
            title: "Vibe Check",
            cards: filtered,
            isCompact: false,
            isScrollable: false,
          },
          ...otherSections,
        ]);
        return;
      }

      // Fetch latest result
      //e2QRlxDQ97SfKxkucxKzT6Ph4t62
      //  console.log("userId:", userId);
      const latest = await getLatestResults(userId);
      //  console.log("latest results:", latest);
      if (!latest) {
        const filtered = cards.filter((c) => c.id !== "recent-results");
        setSections([
          {
            title: "Vibe Check",
            cards: filtered,
            isCompact: false,
            isScrollable: false,
          },
          ...otherSections,
        ]);
      } else {
        const updated = cards.map((c) =>
          c.id === "recent-results"
            ? {
                ...c,
                subtitle: `Score: ${latest.overallVibrationScore} on ${new Date(
                  latest.timestamp,
                ).toLocaleDateString()}`,
                resultId: latest.resultId,
              }
            : c,
        );

        setSections([
          {
            title: "Vibe Check",
            cards: updated,
            isCompact: false,
            isScrollable: false,
          },
          ...otherSections,
        ]);
      }
    };

    const otherSections = [
      {
        title: "Vibe Match",
        cards: cardsVibeMatch,
        isCompact: false,
        isScrollable: true,
      },
      {
        title: "Inner Work",
        cards: cardsTools,
        isCompact: true,
        isScrollable: true,
      },
      {
        title: "Streaks",
        cards: cardsStreak,
        isCompact: false,
        isScrollable: true,
      },
      {
        title: "Meditation",
        cards: cardsMeditationScan,
        isCompact: false,
        isScrollable: false,
      },
      {
        title: "Good News",
        cards: [goodNewsCardData],
        isCompact: false,
        isScrollable: false,
        isNews: true,
      },
    ];

    buildSections();
  }, [user, goodNewsLoaded]);

  useFocusEffect(
    useCallback(() => {
      positionY.setValue(-30);
      Animated.timing(positionY, {
        toValue: 45,
        duration: 1500,
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
          <ScrollView
            style={[styles.scrollView, { bottom: tabBarHeight + 12 }]}
            contentContainerStyle={[styles.scrollContent, { paddingTop: 100 }]}
            showsVerticalScrollIndicator={false}
          >
            <HomeHeaderCard name={profile?.displayName || "friend"} />

            {sections.map((section, index) => (
              <Animatable.View key={section.title} animation="fadeInUp" delay={index * 100}>
                <SectionWithCards
                  title={section.title}
                  cards={section.cards}
                  isCompact={section.isCompact}
                  isScrollable={section.isScrollable}
                  isNews={section.isNews}
                />
              </Animatable.View>
            ))}
          </ScrollView>
        </GradientBackground>
      )}
    </>
  );
};
