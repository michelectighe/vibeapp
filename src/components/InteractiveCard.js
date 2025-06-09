// InteractiveCard.js
import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import { TouchableOpacity } from "react-native";
import { Colors, Fonts, SCREEN_HEIGHT } from "@constants";
import { scaledStyle } from "@utils";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const InteractiveCard = ({
  title,
  subtitle,
  children,
  showButtons = false,
  onPress,
  bgColor = Colors.cardBackground,
  textColor = Colors.cardText,
}) => {
  const [contentHeight, setContentHeight] = useState(0);
  const animatedHeight = useRef(new Animated.Value(SCREEN_HEIGHT * 0.4)).current;

  useEffect(() => {
    console.log('contentHeight', contentHeight)
    Animated.timing(animatedHeight, {
      toValue: showButtons ? contentHeight : SCREEN_HEIGHT * 0.4,
      duration: 2600,
      useNativeDriver: false,
    }).start();
  }, [showButtons, contentHeight]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={onPress ? 0.85 : 1}
      style={styles.cardTouchable}
    >
      <Animated.View style={[styles.card, { backgroundColor: bgColor, height: animatedHeight }]}>
        <View style={styles.headerBlock}>
          {title && <Text style={[styles.title, { color: textColor }]}>{title}</Text>}
          {subtitle && <Text style={[styles.subtitle, { color: textColor }]}>{subtitle}</Text>}
        </View>
        <View
          style={styles.contentBlock}
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            setContentHeight(height + 10); // buffer to prevent clipping
          }}
        >
          {children}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const rawStyles = {
  cardTouchable: {
    marginVertical: 10,
  },
  card: {
    borderRadius: 20,
    padding: 16,
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  headerBlock: {
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "300",
    fontFamily: Fonts.body,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
    fontFamily: Fonts.body,
  },
  contentBlock: {
    marginTop: 8,
  },
};

const styles = StyleSheet.create(scaledStyle(rawStyles));
