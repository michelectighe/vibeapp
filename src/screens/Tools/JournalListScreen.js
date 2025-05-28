import React, { useCallback, useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import {
  getJournalEntriesFs,
  deleteJournalEntryFs,
  getJournalEntriesDb,
  deleteJournalEntryDb,
} from "@/database";
import { styles } from "./JournalListScreen.styles";
import { GradientBackground, CloseX, CustomSpiritualButton } from "@/components";
import { Colors } from "@/constants";
import { SCREEN_WIDTH } from "@/utils";

export const JournalListScreen = () => {
  const [entries, setEntries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();
  const tabBarHeight = useBottomTabBarHeight();

  useFocusEffect(
    useCallback(() => {
      fetchEntries();
    }, []),
  );

  const fetchEntries = async () => {
    try {
      const data = await getJournalEntriesFs();
      setEntries(data);
      setFiltered(data);
    } catch (e) {
      console.error("Failed to fetch journal entries:", e);
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleSearch = (text) => {
    setSearch(text);
    setFiltered(
      entries.filter(
        (entry) =>
          entry.prompt?.toLowerCase().includes(text.toLowerCase()) ||
          entry.entry?.toLowerCase().includes(text.toLowerCase()),
      ),
    );
  };

  const handleOpen = (entry) => {
    navigation.navigate("QuantumJournalScreen", { journalEntry: entry });
  };

  const handleDelete = (id) => {
    Alert.alert("Delete Entry", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteJournalEntryFs(id);
            await deleteJournalEntryDb(id);
            fetchEntries(); // refresh list
          } catch (e) {
            console.error("Delete failed:", e);
          }
        },
      },
    ]);
  };

  return (
    <View style={{ flex: 1, width: SCREEN_WIDTH }}>
      <GradientBackground>
        <CloseX xColor={Colors.textDark} onPress={() => navigation.goBack()} />
        <TextInput
          style={styles.search}
          placeholder="Search journal entries..."
          placeholderTextColor={Colors.mediumGray}
          value={search}
          onChangeText={handleSearch}
        />
        <ScrollView
          style={[styles.scrollView, { bottom: tabBarHeight + 12 }]}
          contentContainerStyle={[styles.scrollContent, { paddingTop: 150 }]}
          showsVerticalScrollIndicator={false}
        >
          {filtered.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.entry}
              onLongPress={() => handleDelete(item.id)}
              onPress={() => handleOpen(item)}
            >
              <Text style={styles.prompt}>{item.prompt}</Text>
              <Text style={styles.snippet} numberOfLines={2}>
                {item.entry}
              </Text>
              <Text style={styles.date}>{formatDate(item.id)}</Text>
            </TouchableOpacity>
          ))}

          {filtered.length === 0 && (
            <Text style={{ textAlign: "center", marginTop: 40, color: Colors.textLight }}>
              No entries found.
            </Text>
          )}
          <View style={styles.new}>
            <CustomSpiritualButton
              label="Create New"
              onPress={() => handleOpen()}
              color={Colors.surface}
              textColor={Colors.textDark}
            />
          </View>
        </ScrollView>
      </GradientBackground>
    </View>
  );
};
