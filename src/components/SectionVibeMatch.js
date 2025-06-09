import React, { useState, useEffect } from "react";
import { Animated, View, Text, StyleSheet } from "react-native";
import { Card } from "@/components";
import { Colors } from "@/constants";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_WIDTH, parseMetric } from "@/utils";
import {
  cardsVibeMatch,
} from "@/data";

const CARD_WIDTH = SCREEN_WIDTH * 0.9;
const SIDE_PADDING = (SCREEN_WIDTH - CARD_WIDTH) / 2;

export const SectionVibeMatch = () => {
 const [cards, setCards] = useState(null);

useEffect(() => {
setCards(cardsVibeMatch);
    
}, []);


  const navigation = useNavigation();
  return (
    <View style={styles.sectionContainer}>
     { cards && (
             <Animated.ScrollView
               horizontal
               snapToInterval={CARD_WIDTH + 12}
               decelerationRate="fast"
               showsHorizontalScrollIndicator={false}
               contentContainerStyle={{ paddingHorizontal: SIDE_PADDING }}
               //   onScroll={/* scrollX tracking if needed */}
               scrollEventThrottle={16}
             >
               {cards.map((card, index) => {
                 return (
                   <View
                     key={card.id || index}
                     style={{
                       width: CARD_WIDTH ,
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
                       isCompact={false}
                       isSquished={card.isSquished}
                     />
                   </View>
                 );
               })}
             </Animated.ScrollView>
     )}
      {/* Divider always shown */}
      <View style={styles.divider} />
            
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