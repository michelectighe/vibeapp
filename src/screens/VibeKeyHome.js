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
import { globalStyles } from "@styles";
import { SectionLayout, SectionWithCards } from "@/components";
import {
  cardsTools,
  cardsVibeCheck,
  cardsVibeMatch,
  cardsMeditationScan,
  cardsStreak,
} from "@/data";

export const VibeKeyHome = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  useAmbientControlForScreen(true);
  const positionY = useRef(new Animated.Value(-100)).current;
  const navigation = useNavigation();
  const { profile, loading } = useUserProfile();
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const buildSections = async () => {
      const cards = [...cardsVibeCheck];
      const userID = user?.uid;
      // Remove the recent results card if not logged in
      if (!userID) {
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
      console.log("userID:", userID);
      const latest = await getLatestResults(userID);
      console.log("latest results:", latest);
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
                resultID: latest.resultID,
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
    ];

    buildSections();
  }, [user]);

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
          <SectionLayout
            topFlex={1}
            middleFlex={0}
            bottomFlex={0}
            safe={true}
            topContent={
              <>
                <ScrollView
                  style={styles.scrollView}
                  contentContainerStyle={styles.scrollContent}
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
                      />
                    </Animatable.View>
                  ))}
                </ScrollView>
              </>
            }
          />
        </GradientBackground>
      )}
    </>
  );
};
