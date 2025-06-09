import React from "react";
import { Text, StyleSheet, View } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import LinearGradient from "react-native-linear-gradient";
import { Colors } from "@/constants";

export const SilverText = ({ text, style = {} }) => {
  const combinedTextStyle = [styles.textBase, style];

  return (
    <MaskedView
      maskElement={
        <View style={styles.centered}>
          <Text
            style={[
              combinedTextStyle,
              {
                color: "black",
                textShadowColor: "#ffffff",
                textShadowOffset: { width: 0, height: 0 },
                textShadowRadius: 4,
              },
            ]}
          >
            {text}
          </Text>
        </View>
      }
    >
      <LinearGradient
        colors={[Colors.gradient1, Colors.gradient2, Colors.gradient3]}
       // colors={["#e0e0e0", "#a0a0a0", "#e0e0e0"]}
        //   colors={["#ffffff", "#b0b0b0", "#ffffff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={[combinedTextStyle, { opacity: 0 }]}>{text}</Text>
      </LinearGradient>
    </MaskedView>
  );
};

const styles = StyleSheet.create({
  textBase: {
    fontSize: 32,
    fontWeight: "bold",
 //   textAlign: "center",
  },
  centered: {
//    justifyContent: "center",
//    alignItems: "center",
  },
});
