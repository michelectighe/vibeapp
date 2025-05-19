import React, { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";

export const SmoothLetterFadeInText = ({ text = "", delayPerLetter = 80, style }) => {
  const lines = text.split("\n"); // split into paragraphs/lines
  const animatedValuesRef = useRef([]);

  useEffect(() => {
    // Re-initialize animated values when text changes
    animatedValuesRef.current = text.split("").map(() => new Animated.Value(0));

    const animations = animatedValuesRef.current.map((anim, index) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 300,
        delay: index * delayPerLetter,
        useNativeDriver: true,
      })
    );

    Animated.stagger(delayPerLetter / 2, animations).start();
  }, [text, delayPerLetter]);

  let charIndex = 0;

  return (
    <View style={{ alignSelf: "stretch" }}>
      {lines.map((line, lineIdx) => (
        <Text key={lineIdx} style={[style, { flexWrap: "wrap" }]}>
          {line.split("").map((char, i) => {
            const animatedValue = animatedValuesRef.current[charIndex++] ?? new Animated.Value(1);
            return (
              <Animated.Text
                key={`char-${lineIdx}-${i}`}
                style={{
                  opacity: animatedValue,
                  transform: [
                    {
                      translateY: animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [4, 0],
                      }),
                    },
                  ],
                }}
              >
                {char}
              </Animated.Text>
            );
          })}
        </Text>
      ))}
    </View>
  );
};
