import React, {  } from "react";
import { Animated, View, StyleSheet } from "react-native";
import { Card } from "@/components";
import { Colors } from "@/constants";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_WIDTH } from "@/utils";

const CARD_WIDTH = SCREEN_WIDTH * 0.9;
const SIDE_PADDING = (SCREEN_WIDTH - CARD_WIDTH) / 2;

export const SectionWithCards = ({
  cards,
  isCompact = false,
  isScrollable = true,
  isNews = false,
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.sectionContainer}>
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
          {cards.map((card, index) => {
            return (
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
                  bgColor={card.bgColor}
                  onPress={() => {
                    if (card.screen) {
                      navigation.navigate(card.screen.name, card.screen.params);
                    } else if (card.onPress) {
                      card.onPress();
                    }
                  }}
                  isCompact={isCompact}
                  isSquished={card.isSquished}
                  isNews={isNews}
                />
              </View>
            );
          })}
        </Animated.ScrollView>
      ) : (
        <View style={{ paddingHorizontal: SIDE_PADDING }}>
          {cards.map((card, index) => {
            return (
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
                  textColor={card.textColor || Colors.textLight}
                  onPress={() => {
                    if (card.id === "recent-results") {
                      // ✅ Explicitly route to nested Results screen
                      navigation.navigate("VibeCheck", {
                        screen: "Results",
                        params: { resultId: card.resultId },
                      });
                    } else if (card.screen) {
                      // ✅ Everything else — use provided screen + params
                      navigation.navigate(card.screen.name, card.screen.params || {});
                    } else if (card.onPress) {
                      card.onPress();
                    }
                  }}
                  isCompact={isCompact}
                  isSquished={card.isSquished}
                  bgColor={card.bgColor || Colors.surface}
                  pulse={card.pulse}
                  isNews={isNews}
                />
              </View>
            );
          })}
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