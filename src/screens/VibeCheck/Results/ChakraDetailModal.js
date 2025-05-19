import React, { useEffect, useRef } from "react";
import { View, Text, Animated, TouchableWithoutFeedback, Dimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Fonts, Colors } from "@constants";
import { chakraInsights } from "@/data";
import { useAmbientControlForScreen } from "@hooks";
import { styles } from "./ChakraDetailModal.styles";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export const ChakraDetailModal = () => {
  useAmbientControlForScreen(true);
  const navigation = useNavigation();
  const route = useRoute();
  const { chakra, originX, originY } = route.params;

  const scale = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(originX)).current;
  const translateY = useRef(new Animated.Value(originY)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const insight = chakraInsights[chakra.id]?.find(
    (range) => chakra.score >= range.min && chakra.score <= range.max,
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
      <View style={{ position: "absolute", width: "100%", height: "100%" }}>
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
