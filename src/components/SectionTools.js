import React, { useState, useEffect } from "react";
import { Animated, View, StyleSheet } from "react-native";
import { Card , CardMotivationalMirror} from "@/components";
import { Colors } from "@/constants";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_WIDTH } from "@/utils";
import { GlowingDivider } from "./GlowingDivider";
import {
  cardsTools,
} from "@/data";

const CARD_WIDTH = SCREEN_WIDTH * 0.9;
const SIDE_PADDING = (SCREEN_WIDTH - CARD_WIDTH) / 2 + 5;

export const SectionTools = () => {
 const [cards, setCards] = useState(null);

useEffect(() => {
setCards(cardsTools);  
}, []);


  const navigation = useNavigation();
  return (
    <View style={styles.sectionContainer}>
      {cards && (
        <Animated.ScrollView
          horizontal
          snapToInterval={CARD_WIDTH + 12}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: SIDE_PADDING }}
          //   onScroll={/* scrollX tracking if needed */}
          scrollEventThrottle={16}
        >
          <CardMotivationalMirror />
          {cards.map((card, index) => {
            return (
              <View
                key={card.id || index}
                style={{
                  width: CARD_WIDTH / 2 - 10,
                  marginRight: 12,
                }}
              >
                <Card
                  title={card.title}
                  subtitle={card.subtitle}
                  image={card.image}
                  textColor={card.textColor || Colors.white}
                  bgColor={card.bgColor}
                  onPress={() => {
                    if (card.screen) {
                      navigation.navigate(card.screen.name, card.screen.params);
                    } else if (card.onPress) {
                      card.onPress();
                    }
                  }}
                  isCompact={true}
                  isSquished={card.isSquished}
                  pulseSub={card.pulseSub}
                  cloudAnim={card.cloudAnim}
                />
              </View>
            );
          })}
        </Animated.ScrollView>
      )}
      {/* Divider always shown */}
      <GlowingDivider width= {SCREEN_WIDTH} height= {1}/>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 32,
  },
  cardSpacing: {
    width: SCREEN_WIDTH * 0.9,
    marginLeft: 16,
    marginRight: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.15)", // soft white line, adjust for dark background
    marginTop: 20,
    marginHorizontal: 16,
    borderRadius: 0.5,
  },
});