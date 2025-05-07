import React, { useRef, useEffect } from "react";
import { ImageBackground, View, Animated } from "react-native";
import { Fonts, Colors } from "@constants";

export const AnimatedButton = ({ buttonType = "", imgSource = "" }) => {
  const imageFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(imageFade, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // //console.log(buttonType);
  if (buttonType === "meditate") imgSource = require("@assets/images/buttonMeditate.webp");
  else if (buttonType === "vibeCheck") imgSource = require("@assets/images/buttonVibeCheck.webp");
  else if (buttonType === "vibeMatch") imgSource = require("@assets/images/buttonVibeMatch.webp");
  // else imgSource = require("@assets/images/button.webp");
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Animated.View
        style={{
          overflow: "hidden",
          opacity: imageFade,
          borderRadius: 70,
     //     backgroundColor: Colors.buttonBg,
          height: 125,
          width: 125,
          alignItems: "center",
          alignContent: "center",
          top: "0%",
          backgroundColor: "transparent",
        }}
      >
        <ImageBackground
          source={imgSource}
          resizeMode="cover"
          style={{
            width: 120,
            height: 120,
            backgroundColor: "transparent",
            opacity: 0.4,
            alignSelf: "center",
            //position: "absolute",
            marginTop: 18,
          }}
        ></ImageBackground>
      </Animated.View>
    </View>
  );
};
