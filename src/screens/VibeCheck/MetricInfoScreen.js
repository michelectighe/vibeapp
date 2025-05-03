import React from "react";
import { ScrollView, SafeAreaView } from "react-native";
import { ExpandableInfoItem, CloseX, GradientBackground } from "@components";
import { metricDetails } from "@data";
import { Colors } from "@constants";
import { useAmbientControlForScreen } from "@hooks";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./MetricInfoScreen.styles"; // ✅ Externalized styles

export const MetricInfoScreen = () => {
  useAmbientControlForScreen(false);
  const navigation = useNavigation();

  return (
    <GradientBackground
      colors={[
        Colors.VibeGradient1,
        Colors.VibeGradient2,
        Colors.VibeGradient1,
      ]}
      logo={false}
    >
      <SafeAreaView style={styles.safeArea}>
        <CloseX
          xColor={Colors.lightTextColor}
          onPress={() => navigation.goBack()}
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {metricDetails.map((item, index) => (
            <ExpandableInfoItem
              key={index}
              icon={item.name}
              title={item.label}
              description={item.description}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
};
