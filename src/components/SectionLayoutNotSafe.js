import React from "react";
import { View, StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { SCREEN_WIDTH } from "@/utils";

export const SectionLayoutNotSafe = ({
  topContent,
  middleContent,
  bottomContent,
  equalHeight = false,
  topFlex = 1,
  middleFlex = 2,
  bottomFlex = 1,
  style,
}) => {
  const sharedStyle = {
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH,
  };

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          sharedStyle,
          { flex: equalHeight ? 1 : topFlex },
          styles.topPadding,
        ]}
      >
        {topContent}
      </View>
      <View style={[sharedStyle, { flex: equalHeight ? 1 : middleFlex }]}>
        {middleContent}
      </View>
      <View
        style={[
          sharedStyle,
          { flex: equalHeight ? 1 : bottomFlex },
          styles.bottomPadding,
        ]}
      >
        {bottomContent}
      </View>
    </View>
  );
};

const rawStyles = {
  safeArea: {
    flex: 1,
    backgroundColor: "transparent",
  },
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
  },
  topPadding: {
    paddingTop: 20,
  },
};

const styles = StyleSheet.create(scaledStyle(rawStyles));
