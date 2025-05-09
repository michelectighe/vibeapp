import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, ScrollView } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { SectionLayout } from "@components"; // or your layout wrapper
import { getVibeHistory, groupScores } from "@/utils";

const screenWidth = Dimensions.get("window").width;

// const mockData = {
//   daily: [90, 80, 75, 95, 100, 85, 70],
//   weekly: [85, 78, 92, 88],
//   monthly: [80, 83, 79, 91, 95],
// };

export const VibeHistoryScreen = () => {
  const [selectedRange, setSelectedRange] = useState("daily");
  const [data, setData] = useState(null);
  //  const currentData = mockData[selectedRange];

  useEffect(() => {
    const fetchData = async () => {
      const scores = await getVibeHistory();
      const grouped = groupScores(scores, selectedRange);
      setData(grouped);
    };
    console.log("data", data);
    fetchData();
  }, [selectedRange]); // eslint-disable-line react-hooks/exhaustive-deps

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
          {/* <BarChart
            data={{
              labels: data.map((d) => d.label),
              datasets: [{ data: data.map((d) => d.value) }],
            }}
            width={screenWidth - 40}
            height={220}
            fromZero
            yAxisSuffix=""
            chartConfig={{
              backgroundColor: "#fff",
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(100, 150, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: { borderRadius: 12 },
            }}
            style={styles.chartStyle}
          /> */}
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
