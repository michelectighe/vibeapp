import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, ScrollView } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { SectionLayout } from "@components";
import { getVibeHistory, groupScores, SCREEN_WIDTH } from "@/utils";

const screenWidth = Dimensions.get("window").width;

export const VibeHistoryScreen = () => {
  const [selectedRange, setSelectedRange] = useState("daily");
  const [data, setData] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const scores = await getVibeHistory();
      const grouped = groupScores(scores, selectedRange);
      setData(grouped);
      setSelectedIndex(null);
    };
    fetchData();
  }, [selectedRange]);

  return (
    <SectionLayout
      topFlex={1}
      middleFlex={4}
      bottomFlex={2}
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
        <>
          {data && (
            <View contentContainerStyle={styles.chartContainer}>
              <BarChart
                data={{
                  labels: data.map((d) => d.label),
                  datasets: [
                    {
                      data: data.map((d) => d.value),
                      colors: data.map((d) => () => d.barColor),
                    },
                  ],
                }}
                width={screenWidth - 20}
                height={220}
                fromZero={true}
                segments={5}
                withCustomBarColorFromData={true}
                chartConfig={{
                  backgroundColor: "#fff",
                  backgroundGradientFrom: "#fff",
                  backgroundGradientTo: "#fff",
                  decimalPlaces: 0,
                  color: () => "transparent",
                  labelColor: () => "transparent",
                  propsForBackgroundLines: {
                    stroke: "transparent",
                  },
                }}
                style={styles.barChart}
                verticalLabelRotation={0}
              />

              <View style={styles.dayRow}>
                {data.map((item, index) => (
                  <TouchableOpacity
                    key={item.label}
                    onPress={() => setSelectedIndex(index)}
                    style={[styles.dayButton, selectedIndex === index && styles.dayButtonSelected]}
                  >
                    <Text
                      style={[
                        styles.dayButtonText,
                        selectedIndex === index && styles.dayButtonTextSelected,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </>
      }
      bottomContent={
        <>
          {selectedIndex != null && data ? (
            <View style={styles.detailsBox}>
              <Text style={styles.detailTitle}>{data[selectedIndex].label}</Text>
              <Text style={styles.detailScore}>Vibration Score: {data[selectedIndex].value}</Text>
              <Text style={{ marginTop: 4, color: "#666" }}>
                Color: {data[selectedIndex].barColor}
              </Text>
            </View>
          ) : null}
        </>
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
    width: SCREEN_WIDTH,
  },
  barChart: {
    width: SCREEN_WIDTH,
    alignItems: "center",
    paddingRight: 0,
  },
  dayRow: {
    width: SCREEN_WIDTH,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: -40,
  },

  dayButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 2,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f0f0f0",
  },
  dayButtonSelected: {
    backgroundColor: "#6495ed",
    borderColor: "#6495ed",
  },
  dayButtonText: {
    color: "#333",
    fontSize: 14,
  },
  dayButtonTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },

  detailsBox: {
    marginHorizontal: 20,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#f7f7f7",
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 10,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  detailScore: {
    fontSize: 14,
    color: "#333",
  },
});
