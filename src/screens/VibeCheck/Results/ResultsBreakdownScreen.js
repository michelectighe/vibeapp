import React , { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { useAnalysis } from "@/context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { useAmbientControlForScreen } from "@/hooks";
import { vibrationMetricsInfo } from "@/data/vibrationMetricsInfo";
import { CloseX, ResultsBackground } from "@/components";
import { Colors } from "@/constants";
import { styles } from "./ResultsBreakdownScreen.styles";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_WIDTH , SCREEN_HEIGHT} from "@/utils";



export const ResultsBreakdownScreen = () => {
  useAmbientControlForScreen(true);
  const tabBarHeight = useBottomTabBarHeight();

const navigation = useNavigation();
  const { vibrationInfo } = useAnalysis();
  const [overallColor, setColor] = useState();
  const [overallColor2, setColor2] = useState();
  const [overallColor3, setColor3] = useState();
  const [overallColor4, setColor4] = useState();

  const {
    voiceFrequencyScore,
    // voiceEmotionScore,
    voiceStrengthScore,
    environmentScore,
    motionScore,
    bpmScore,
    hrvScore,
    emotionScore,
    hawkinsScore,
  } = useAnalysis();

  const results = {
    hawkinsScore,
    voiceFrequencyScore,
   // voiceEmotionScore,
    voiceStrengthScore,
    environmentScore,
    motionScore,
    bpmScore,
    hrvScore,
    emotionScore,
    //    overallVibrationScore,
  };
  
  useEffect(() => {
    const result = vibrationInfo;
    if (!result) return;
    if (result) {
      setColor(result.color);
      setColor2(result.color2);
      setColor3(result.color3);
      setColor4(result.color4);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getMetricStatus = (value, [min, max]) => {
    if (value === null || value === undefined || value === "skipped" || value === 0 ) {
      return { icon: "⚠️", label: "Data missing", style: styles.missing };
    }

    const range = max - min;
    const buffer = range * 0.15; // 15% suboptimal threshold on either end

    if (value < min || value > max) {
      return { icon: "❌", label: "Outside healthy range", style: styles.outOfRange };
    }

    if (value < min + buffer) {
      return { icon: "⚠️", label: "Slightly outside healthy range", style: styles.suboptimal };
    }

    if (value > max - buffer) {
      return { icon: "🌟", label: "Optimal range", style: styles.optimal };
    }

    return { icon: "✅", label: "Within healthy range", style: styles.inRange };
  };
function formatValue(val) {
  if (val == null) return "";
  const rounded = Number(val).toFixed(2);
  // Remove trailing ".00" if present
  return rounded.endsWith(".00") ? Number(rounded).toString() : rounded;
}

  return (
    <ResultsBackground
      glowColor={overallColor}
    >
      <CloseX xColor={overallColor4} onPress={() => navigation.goBack()} />

      <ScrollView
        style={[styles.scrollView, { bottom: tabBarHeight + 12 }]}
        contentContainerStyle={[styles.scrollContent, { paddingTop: 150 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* <Text style={styles.title}>Detailed Results</Text> */}

        {Object.entries(results).map(([key, value]) => {
          const info = vibrationMetricsInfo[key];
          if (!info) return null;

          const isObject = value && typeof value === "object";

          const rawScore = isObject && "value" in value ? value.value : value;
          const status = getMetricStatus(rawScore, info.range);

          const displayValue =
            isObject && typeof value.value === "string"
              ? value.value
              : formatValue(rawScore)?.toString() ?? "N/A";
          const displayLabel = isObject && "label" in value ? value.label : null;

          const isMissing = rawScore === null || rawScore === undefined || rawScore ==="skipped" || rawScore === 0;
          // const [min, max] = info.range;
          // const isInRange = !isMissing && rawScore >= min && rawScore <= max;

          return (
            <View key={key} style={[styles.metricBox, {borderColor: overallColor}]}>
              <Text style={styles.metricLabel}>{info.label}</Text>

              <Text style={styles.metricValue}>
                {isMissing ? "No data" : `${displayValue}${info.unit}`}
              </Text>

              {displayLabel && (
                <Text style={styles.metricLabelText}>Interpretation: {displayLabel}</Text>
              )}

              <Text style={[styles.metricStatus, status.style]}>
                {status.icon} {status.label}
              </Text>

              <Text style={styles.metricExplanation}>{info.explanation}</Text>
            </View>
          );
        })}
      </ScrollView>
    </ResultsBackground>
  );
};

