import React from "react";
import { View, StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export const SectionLayout = ({
  topContent,
  middleContent,
  bottomContent,
  equalHeight = false,
  topFlex = 1,
  middleFlex = 2,
  bottomFlex = 1,
  style,
}) => {
  const insets = useSafeAreaInsets();

  const sharedStyle = {
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { paddingBottom: insets.bottom + 60 }]}
    >
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
    </SafeAreaView>
  );
};

const rawStyles = {
  safeArea: {
    flex: 1,
    backgroundColor: "transparent",
  },
  container: {
    flex: 1,
  },
  topPadding: {
    paddingTop: 40,
  },
  bottomPadding: {
    paddingBottom: 20, // base padding
    gap: 16,
  },
};

const styles = StyleSheet.create(scaledStyle(rawStyles));
