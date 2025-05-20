import React, { useRef } from "react";
import { Animated, View, Text, StyleSheet, Dimensions } from "react-native";
import { Card } from "@/components";
import { Colors } from "@/constants";
import { useNavigation } from "@react-navigation/native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH * 0.9;
const SIDE_PADDING = (SCREEN_WIDTH - CARD_WIDTH) / 2;

export const SectionWithCards = ({ title, cards, isCompact = false, isScrollable = true }) => {
  return (
    <View style={styles.sectionContainer}>
      {/* Optional title */}
      {/* <Text style={styles.sectionTitle}>{title}</Text> */}

      {isScrollable ? (
        <Animated.ScrollView
          horizontal
          snapToInterval={CARD_WIDTH + 12}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: SIDE_PADDING }}
       //   onScroll={/* scrollX tracking if needed */}
          scrollEventThrottle={16}
        >
          {cards.map((card, index) => (
            <View
              key={card.id || index}
              style={{
              width: isCompact ? CARD_WIDTH / 2 - 10 : CARD_WIDTH,
                marginRight: 12,
              }}
            >
            <Card
                    title={card.title}
                    subtitle={card.subtitle}
                    image={card.image}
                    textColor={card.textColor || Colors.white}
                    onPress={() => {
                      if (card.screen) {
                        navigation.navigate(card.screen.name, card.screen.params);
                      } else if (card.onPress) {
                        card.onPress();
                      }
                    }}

                  />
            </View>
          ))}
        </Animated.ScrollView>
      ) : (
        <View style={{ paddingHorizontal: SIDE_PADDING }}>
          {cards.map((card, index) => (
            <View
              key={card.id || index}
              style={{
                width: isCompact ? CARD_WIDTH / 2 - 10 : CARD_WIDTH,
                marginBottom: 12,
              }}
            >
              <Card
                    title={card.title}
                    subtitle={card.subtitle}
                    image={card.image}
                    textColor={card.textColor || Colors.white}
                    onPress={() => {
                      if (card.screen) {
                        navigation.navigate(card.screen.name, card.screen.params);
                      } else if (card.onPress) {
                        card.onPress();
                      }
                    }}
                    translateX={translateX} 
                  />
            </View>
          ))}
        </View>
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 16,
    marginBottom: 8,
    color: Colors.textDark,
  },
  cardSpacing: {
    width: SCREEN_WIDTH *.9,
    marginLeft: 16,
    marginRight: 8,
  },
  divider: {
  height: 1,
  backgroundColor: 'rgba(255, 255, 255, 0.15)', // soft white line, adjust for dark background
  marginTop: 20,
  marginHorizontal: 16,
  borderRadius: 0.5,
},

});