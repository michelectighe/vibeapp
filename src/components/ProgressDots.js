// 📌 components/ProgressDots.js
import React from "react";
import { View } from "react-native";

export const ProgressDots = ({ currentIndex, totalScreens }) => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 120,
        left: 0,
        right: 0,
        alignItems: "center",
      }}
    >
      <View style={{ flex: "row", justifyContent: "center" }}>
        {Array.from({ length: totalScreens }).map((_, index) => (
          <View
            key={index}
            className={`h-2 w-2 mx-1 rounded-full ${
              currentIndex === index ? "bg-blue-500 scale-125" : "bg-gray-400"
            }`}
          />
        ))}
      </View>
    </View>
  );
};
