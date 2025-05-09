import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, ScrollView } from "react-native";
import { SectionLayout } from "@components";
import { getVibeHistory, groupScores } from "@/utils";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory-native";

const screenWidth = Dimensions.get("window").width;

export const VibeHistoryScreen = () => {
  const [selectedRange, setSelectedRange] = useState("daily");
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const scores = await getVibeHistory();
      console.log("Scores:", scores);
      const grouped = groupScores(scores, selectedRange);
      setData(grouped);
    };
    fetchData();
  }, [selectedRange]); // eslint-disable-line react-hooks/exhaustive-deps

  const chartData = data
    ? data.map((d) => ({
        x: d.label,
        y: d.value,
      }))
    : [];

  return (
    <SectionLayout
      topFlex={1}
      middleFlex={4}
      topContent={
        <View style={styles.tabContainer}>
          {["daily", "weekly", "monthly"].map((range) => (
            <TouchableOpacity
              key={range}
              onPress={() => setSelectedRange(range)}
              style={[styles.tabButton, selectedRange === range && styles.tabButtonActive]}
            >
              <Text style={[styles.tabText, selectedRange === range && styles.tabTextActive]}>
                {range.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      }
      middleContent={
        <ScrollView contentContainerStyle={styles.chartContainer}>
          {data && (
            <VictoryChart
              width={screenWidth - 20}
              theme={VictoryTheme.material}
              domain={{ y: [0, 100] }}
              animate={{ duration: 800 }}
            >
              <VictoryAxis
                style={{
                  tickLabels: { fontSize: 12 },
                  axis: { stroke: "#ccc" },
                }}
              />
              <VictoryAxis
                dependentAxis
                tickValues={[0, 20, 40, 60, 80, 100]}
                style={{
                  tickLabels: { fontSize: 12 },
                  axis: { stroke: "#ccc" },
                  grid: { stroke: "#ccc", strokeDasharray: "4" },
                }}
              />
              <VictoryBar
                data={chartData}
                barWidth={20}
                style={{
                  data: {
                    fill: "#6495ed",
                    strokeWidth: 0,
                  },
                }}
              />
            </VictoryChart>
          )}
        </ScrollView>
      }
    />
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#eee",
  },
  tabButtonActive: {
    backgroundColor: "#6495ed",
    borderColor: "#6495ed",
  },
  tabText: {
    fontSize: 14,
    color: "#333",
  },
  tabTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
  chartContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  chartStyle: {
    borderRadius: 12,
  },
});
