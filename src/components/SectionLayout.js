import React from "react";
import { View, StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { SCREEN_WIDTH } from "@/utils";

export const SectionLayout = ({
  topContent,
  middleContent,
  bottomContent,
  equalHeight = false,
  topFlex = 1,
  middleFlex = 2,
  bottomFlex = 1,
  style,
  safe = true, // ✅ new prop
}) => {
  const insets = useSafeAreaInsets();

  const sharedStyle = {
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH,
  };

  const Wrapper = safe ? SafeAreaView : View;

  return (
    <Wrapper style={[styles.safeArea, safe && { paddingBottom: insets.bottom + 60 }]}>
      <View style={[styles.container, style]}>
        <View
          style={[
            sharedStyle,
            { backgroundColor: "transparent", flex: equalHeight ? 1 : topFlex },
            styles.topPadding,
          ]}
        >
          {topContent}
        </View>
        <View
          style={[
            sharedStyle,
            { backgroundColor: "transparent", flex: equalHeight ? 1 : middleFlex },
          ]}
        >
          {middleContent}
        </View>
        <View
          style={[
            sharedStyle,
            {
              backgroundColor: "transparent",
              flex: equalHeight ? 1 : bottomFlex,
              justifyContent: "flex-start",
            },
            styles.bottomPadding,
          ]}
        >
          {bottomContent}
        </View>
      </View>
    </Wrapper>
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
  bottomPadding: {
    paddingBottom: 50,
  },
};

const styles = StyleSheet.create(scaledStyle(rawStyles));
