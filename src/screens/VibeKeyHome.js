import React, { useRef, useCallback } from "react";
import * as Animatable from "react-native-animatable";
import { Animated, View, Text, ScrollView } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useUserProfile } from "@context";
import { Colors } from "@constants";
import { GradientBackground, HomeHeaderCard , Card} from "@components";
import { useAmbientControlForScreen } from "@hooks";
import { styles } from "./VibeKeyHome.styles";
import { globalStyles } from "@styles";
import { SectionLayout, SectionWithCards } from "@/components";
import { cardsTools, cardsVibeCheck, cardsVibeMatch, cardsMeditationScan, cardsStreak } from "@/data";


export const VibeKeyHome = () => {
  useAmbientControlForScreen(true);
  const positionY = useRef(new Animated.Value(-100)).current;
  const navigation = useNavigation();
  const { profile, loading } = useUserProfile();

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

const sections = [
  { title: "Vibe Check", cards: cardsVibeCheck, isCompact:false, isScrollable: false},
  { title: "Vibe Match", cards: cardsVibeMatch, isCompact:false, isScrollable: true},
  { title: "Inner Work", cards: cardsTools, isCompact: true, isScrollable: true},
  { title: "Streask", cards: cardsStreak, isCompact:false, isScrollable: true},
  { title: "Meditation", cards: cardsMeditationScan, isCompact:false, isScrollable: false},
];

  return (
    <>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <GradientBackground colors={[ Colors.gradient1, Colors.gradient2, Colors.gradient3]}>
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
                    <SectionWithCards title={section.title} cards={section.cards}  isCompact={section.isCompact}/>
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
