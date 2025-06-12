import React, { useState, useEffect } from "react";
import {  View,  StyleSheet } from "react-native";
import { CardVibeMatch } from "@/components";
import { Colors } from "@/constants";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_WIDTH } from "@/utils";
import { GlowingDivider } from "./GlowingDivider";
import { cardsVibeMatch } from "@/data";

const CARD_WIDTH = SCREEN_WIDTH * 0.9;

export const SectionVibeMatch = () => {
 const [cards, setCards] = useState(null);

useEffect(() => {
setCards(cardsVibeMatch);
    
}, []);


  const navigation = useNavigation();
  return (
    <View style={styles.sectionContainer}>
      {cards && (
        <View style={styles.matchRow}>
          {cards.map((card, index) => {
            return (
              <View
                key={card.id || index}
                style={{
                  width: CARD_WIDTH / 2,
                  // marginRight: 12,
                  marginLeft: 14,
                }}
              >
                <CardVibeMatch
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
                  isCompact={false}
                  isSquished={card.isSquished}
                  divider={card.divider}
                />
              </View>
            );
          })}
        </View>
      )}
      {/* Divider always shown */}
      <GlowingDivider width={SCREEN_WIDTH} height={1} />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    alignContent: "center",
    marginBottom: 32,
    justifyContent: "space-between",
  },
  matchRow: {
    alignContent: "center",
    flexDirection: "row",
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.15)", // soft white line, adjust for dark background
    marginTop: 20,
    marginHorizontal: 16,
    borderRadius: 0.5,
  },
});