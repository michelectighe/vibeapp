import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { SectionLayout } from "@components";
import { getVibeHistory, groupScores, SCREEN_HEIGHT, SCREEN_WIDTH } from "@/utils";
import { styles } from "./VibeHistory.styles";
import { Colors } from "@/constants";
import { vibrationLevels } from "@/data";
import { format } from "date-fns";

export const VibeHistoryScreen = () => {
  const getLevelInfo = (score) => vibrationLevels.find((level) => score >= level.minScore);

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
          {data?.length > 0 && (
            <Text style={styles.yearLabel}>{new Date(data[0].date).getFullYear()}</Text>
          )}
          {data && (
            <View contentContainerStyle={styles.chartContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
                  width={data.length * 60} // dynamically size width based on data
                  height={SCREEN_HEIGHT * 0.3}
                  fromZero={true}
                  segments={5}
                  withCustomBarColorFromData={true}
                  chartConfig={{
                    backgroundColor: Colors.white,
                    backgroundGradientFrom: Colors.white,
                    backgroundGradientTo: Colors.white,
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
              </ScrollView>
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
              <Text style={styles.detailDate}>
                {format(new Date(data[selectedIndex].date), "EEEE, MMMM do")}
              </Text>

              {/* <Text style={styles.detailTitle}>{data[selectedIndex].label}</Text> */}
              <Text style={styles.detailScore}>
                Vibration Score: {data[selectedIndex].value.toFixed(0)}
              </Text>
              <Text style={styles.detailText}>
                {getLevelInfo(data[selectedIndex].value)?.label}
              </Text>
              <Text style={styles.detailDescription}>
                {getLevelInfo(data[selectedIndex].value)?.historyDescription ??
                  "No summary available."}
              </Text>
            </View>
          ) : null}
        </>
      }
    />
  );
};
