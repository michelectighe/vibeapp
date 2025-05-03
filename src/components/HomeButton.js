import React, { useContext, useState, useRef, useEffect } from "react";
import {
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  View,
  Text,
  Modal,
  StyleSheet,
  Animated,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export const HomeButton = () => {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();

  const goHome = () => {
    navigation.navigate("VibeKeyHome");
  };
  const buttonImage = require("@assets/images/button.webp");
  return (
    <TouchableOpacity
      onPress={goHome}
      style={{
        padding: 4,
        borderRadius: 20,
        alignContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
      }} // Dynamically adjust size
    >
      <View
        style={{ position: "absolute", top: height - 60, left: width - 60 }}
      >
        <ImageBackground
          style={{ flex: 1, width: 50, height: 50 }}
          source={buttonImage}
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );
};

