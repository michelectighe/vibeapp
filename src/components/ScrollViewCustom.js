import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { StyleSheet, ScrollView } from "react-native";
import { scaledStyle } from "@/utils";

export const ScrollViewCustom = ({ children }) => {
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <ScrollView
      style={[styles.scrollView, { bottom: tabBarHeight + 12 }]}
      contentContainerStyle={[styles.scrollContent, { paddingTop: 150 }]}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
};

const rawStyles = {
  scrollView: {
    position: "absolute",
    top: 0,
 //   bottom: 80,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  scrollContent: {
    paddingTop: 170, // this matches the height of your title/logo area
    paddingHorizontal: 20,
    paddingBottom: 160,
  },
};
export const styles = StyleSheet.create(scaledStyle(rawStyles));