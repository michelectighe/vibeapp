// components/InfiniteDateStrip.js
import React, { useRef, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { format, addDays, subDays, isSameDay } from "date-fns";
import { Colors, Fonts } from "@/constants";

const ITEM_WIDTH = 60;
const SCREEN_WIDTH = Dimensions.get("window").width;
const INITIAL_INDEX = 365; // anchor today in the middle

export const DatePickerStrip = ({ selectedDate, onSelectDate }) => {
  const flatListRef = useRef(null);

  // Generate 2 years of dates (365 past + today + 365 future)
  const dates = Array.from({ length: 730 + 1 }, (_, i) => addDays(new Date(), i - INITIAL_INDEX));

  useEffect(() => {
    // On first mount, scroll to today
    flatListRef.current?.scrollToIndex({
      index: INITIAL_INDEX,
      animated: false,
    });
  }, []);

  return (
    <View style={styles.wrapper}>
      {/* Big date label */}


      <Text style={styles.fullDateText}>
        {format(new Date(selectedDate), "EEEE, MMMM d, yyyy")}
      </Text>

      <FlatList
        ref={flatListRef}
        horizontal
        data={dates}
        keyExtractor={(item) => item.toISOString()}
        initialScrollIndex={INITIAL_INDEX}
        getItemLayout={(_, index) => ({
          length: ITEM_WIDTH,
          offset: ITEM_WIDTH * index,
          index,
        })}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const dateStr = format(item, "yyyy-MM-dd");
          const label = format(item, "EEE");
          const isSelected = dateStr === selectedDate;

          return (
            <TouchableOpacity
              onPress={() => onSelectDate(dateStr)}
              style={[styles.item, isSelected && styles.selectedItem]}
            >
              <Text style={[styles.text, isSelected && styles.selectedText]}>{label}</Text>
              <Text style={[styles.num, isSelected && styles.selectedText]}>
                {format(item, "d")}
              </Text>
            </TouchableOpacity>
          );
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
  },
  fullDateText: {
    fontFamily: Fonts.title,
    fontSize: 16,
    color: Colors.textLight,
    marginBottom: 8,
  },
  item: {
    width: ITEM_WIDTH,
    alignItems: "center",
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: Colors.surface,
    marginHorizontal: 4,
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
