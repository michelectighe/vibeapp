import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Fonts, Colors } from "@constants";
import { chakraInsights } from "@constants";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const ChakraDetailModal = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { chakra, originX, originY } = route.params;
  const [isReady, setIsReady] = useState(false);

  const scale = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(originX)).current;
  const translateY = useRef(new Animated.Value(originY)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const insight = chakraInsights[chakra.id]?.find(
    (range) => chakra.score >= range.min && chakra.score <= range.max
  );

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: SCREEN_WIDTH / 2,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT / 2,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: originX,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: originY,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.goBack();
    });
  };

  return (
    <TouchableWithoutFeedback onPress={handleClose}>
      <View style={StyleSheet.absoluteFill}>
        <Animated.View
          style={[
            styles.expandingCard,

            {
              opacity,
              backgroundColor: chakra.color,
              transform: [
                {
                  translateX: Animated.subtract(translateX, SCREEN_WIDTH / 2),
                },
                {
                  translateY: Animated.subtract(translateY, SCREEN_HEIGHT / 2),
                },
                { scale },
              ],
            },
          ]}
        >
          <Text style={styles.title}>{chakra.name}</Text>
          <Text style={styles.description}>{chakra.meaning}</Text>
          <Text style={styles.score}>Score: {chakra.score}</Text>

          {insight && (
            <View style={styles.insightContainer}>
              <Text style={styles.insightTitle}>{insight.summary}</Text>
              <Text style={styles.insightAdvice}>{insight.advice}</Text>
            </View>
          )}
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  expandingCard: {
    position: "absolute",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontFamily: Fonts.AppTitle,
    color: "#fff",
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    fontFamily: Fonts.AppFont,
    color: "#fff",
    marginHorizontal: 20,
    textAlign: "center",
  },
  score: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  insightContainer: {
    marginTop: 30,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 12,
    padding: 16,
  },
  insightTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 8,
    textAlign: "center",
  },
  insightAdvice: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
});

export default ChakraDetailModal;
