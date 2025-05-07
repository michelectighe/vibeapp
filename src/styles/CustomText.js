// src/theme/CustomText.js
import React from "react";
import { Text as RNText, StyleSheet } from "react-native";

// Save the original Text render method
const oldRender = RNText.render;

RNText.render = function (...args) {
  const origin = oldRender.call(this, ...args);

  return React.cloneElement(origin, {
    style: [styles.defaultFont, origin.props.style],
  });
};

const styles = StyleSheet.create({
  defaultFont: {
    fontFamily: "AppFontRegular", // change this to your actual font
  },
});
