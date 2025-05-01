import React, { useContext, useState, useRef, useCallback } from "react";
import { SafeAreaView, Button, StyleSheet, Text } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const backgroundImage = require("@assets/images/backgroundVibeKey.webp");
const logoImage = require("@assets/images/VLogo.png");

export default function TestScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 100 }} edges={["bottom"]}>
      <Text style={{ textAlign: "center" }}>TEST SCREEN</Text>

      <Button
        style={{ TextAlign: "center" }}
        title="Chakra Screen Test"
        onPress={() =>
          navigation.navigate("TopDownStack", { screen: "ChakraScreen" })
        }
      />
      {/* <Button title="Pick an Image" onPress={pickImage} />
          <Button title="Pick an Image" onPress={pickImage} /> */}
    </SafeAreaView>
  );
}
