/**
 * SectionLayout
 *
 * A flexible 3-section layout component for structuring screens into top, middle, and bottom parts.
 * Each section accepts content and can have a custom flex ratio or be hidden by setting flex to 0.
 * Use `equalHeight` to make all sections the same size.
 *
 * Responsive padding and spacing are automatically scaled using `scaledStyle`.
 *
 * Usage:
 * <SectionLayout
 *   topFlex={1}
 *   middleFlex={2}
 *   bottomFlex={1}
 *   equalHeight={false}
 *   topContent={<TopComponent />}
 *   middleContent={<MiddleComponent />}
 *   bottomContent={<BottomComponent />}
 * />
 */
import React from "react";
import { View, StyleSheet } from "react-native";
import { scaledStyle } from "@utils";

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
  const sharedStyle = {
    justifyContent: "center",
    alignItems: "center",
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
  container: {
    flex: 1,
  },
  topPadding: {
    paddingTop: 40,
  },
  bottomPadding: {
    paddingBottom: 40,
    gap: 16,
  },
};

const styles = StyleSheet.create(scaledStyle(rawStyles));
