import React from "react";
import { ScrollView, SafeAreaView } from "react-native";
import { ExpandableInfoItem, CloseX, GradientBackground } from "@components";
import { metricDetails } from "@data";
import { Colors } from "@constants";
import { useAmbientControlForScreen } from "@hooks";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./MetricInfoScreen.styles";

export const MetricInfoScreen = () => {
  useAmbientControlForScreen(false);
  const navigation = useNavigation();

  return (
    <GradientBackground
      colors={[Colors.gradient1, Colors.gradient2, Colors.gradient3]}
      logo={false}
    >
      <SafeAreaView style={styles.safeArea}>
        <CloseX xColor={Colors.darkText} onPress={() => navigation.goBack()} />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
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
