import React, { useRef, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Colors, Fonts } from "@/constants";
import { SCREEN_WIDTH } from "@/utils";
import { parseISO, startOfWeek, addDays, format, addWeeks } from "date-fns";

const ITEM_WIDTH = SCREEN_WIDTH / 7;
const WEEK_WIDTH = ITEM_WIDTH * 7;
const NUM_WEEKS = 30;
const today = new Date();
const midnightToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()); // strip time
const thisSunday = startOfWeek(midnightToday, { weekStartsOn: 0 });

// Generate weeks
const weeks = Array.from({ length: NUM_WEEKS * 2 + 1 }, (_, i) => {
  const weekStart = addWeeks(thisSunday, i - NUM_WEEKS);
  return Array.from({ length: 7 }, (_, d) => {
    const date = addDays(weekStart, d);
    return {
      label: format(date, "EEE"),
      dateString: format(date, "yyyy-MM-dd"),
      fullDate: format(date, "EEEE, MMMM d, yyyy"),
    };
  });
});

// Dynamically find the week that contains today
const todayStr = format(today, "yyyy-MM-dd");
const INITIAL_WEEK_INDEX = weeks.findIndex((week) =>
  week.some((day) => day.dateString === todayStr),
);
console.log("Today is:", format(today, "yyyy-MM-dd"));
console.log(
  "INITIAL_WEEK_INDEX resolves to week starting:",
  weeks[INITIAL_WEEK_INDEX][0].dateString,
);

export const DatePickerStrip = ({ selectedDate, onSelectDate }) => {
  const flatListRef = useRef(null);

const scrollToToday = () => {
  flatListRef.current?.scrollToIndex({
    index: INITIAL_WEEK_INDEX,
    animated: true,
  });

  // ✅ Find the actual today date, not the first day of the week
  const week = weeks[INITIAL_WEEK_INDEX];
  const todayDate = week.find((day) => day.dateString === todayStr)?.dateString;

  if (todayDate) {
    onSelectDate(todayDate);
  }
};


  useEffect(() => {
    setTimeout(() => scrollToToday(), 50);
  }, []);

  return (
    <View style={styles.wrapper}>
      {/* Header */}
      {/* Today button */}
      <TouchableOpacity style={styles.todayButton} onPress={scrollToToday}>
        <Text style={styles.todayButtonText}>Today</Text>
      </TouchableOpacity>

      <Text style={styles.fullDateText}>
        {selectedDate ? format(parseISO(selectedDate), "EEEE, MMMM d, yyyy") : ""}
      </Text>

      {/* Week-based scroller */}
      <FlatList
        ref={flatListRef}
        data={weeks}
        horizontal
        pagingEnabled
        snapToInterval={WEEK_WIDTH}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `week-${index}`}
        getItemLayout={(_, index) => ({
          length: WEEK_WIDTH,
          offset: WEEK_WIDTH * index,
          index,
        })}
        renderItem={({ item: week }) => (
          <View style={{ flexDirection: "row", width: WEEK_WIDTH }}>
            {week.map(({ label, dateString }) => {
              const isSelected = selectedDate === dateString;
              return (
                <TouchableOpacity
                  key={dateString}
                  onPress={() => onSelectDate(dateString)}
                  style={[styles.item, isSelected && styles.selectedItem]}
                >
                  <Text style={[styles.text, isSelected && styles.selectedText]}>{label}</Text>
                  <Text style={[styles.num, isSelected && styles.selectedText]}>
                    {format(parseISO(dateString), "d")}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / WEEK_WIDTH);
          const week = weeks[index];
          if (!week) return;

          // Only update selectedDate if it's outside the current visible week
          const isStillInVisibleWeek = week.some((day) => day.dateString === selectedDate);

          if (!isStillInVisibleWeek) {
            const fallback = week[0]?.dateString;
            if (fallback) onSelectDate(fallback);
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 12,
    marginBottom: 6,
    alignItems: "center",
    width: SCREEN_WIDTH,
  },
  fullDateText: {
    fontFamily: Fonts.title,
    fontSize: 16,
    color: Colors.textLight,
    marginBottom: 4,
  },
  todayButton: {
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: Colors.paleYellow,
  },
  todayButtonText: {
    fontFamily: Fonts.body,
    color: Colors.textDark,
    fontSize: 14,
  },
  item: {
    width: ITEM_WIDTH,
    alignItems: "center",
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: Colors.surface,
    //   marginHorizontal: 4,
  },
  selectedItem: {
    backgroundColor: Colors.paleYellow,
  },
  text: {
    fontFamily: Fonts.body,
    color: Colors.textDark,
    fontSize: 12,
  },
  num: {
    fontFamily: Fonts.title,
    fontSize: 16,
    color: Colors.textDark,
  },
  selectedText: {
    color: Colors.textDark,
    fontWeight: "bold",
  },
});
