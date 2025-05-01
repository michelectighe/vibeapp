import React from "react";
import { ScrollView, SafeAreaView, View } from "react-native";
import { ExpandableInfoItem, CloseX, GradientBackground } from "@components";
import { metricDetails } from "@data";
import { Colors, Fonts } from "@constants";

const MetricInfoScreen = () => {
  return (
    <GradientBackground
      colors={[
        Colors.VibeGradient1,
        Colors.VibeGradient2,
        Colors.VibeGradient1,
      ]}
      logo={false}
    >
      <SafeAreaView style={{ marginTop: 50 }}>
        <CloseX xColor="white" />

        <ScrollView
          style={{ paddingHorizontal: 16, marginTop: 40 }}
          contentContainerStyle={{ paddingBottom: 160 }}
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

export default MetricInfoScreen;
