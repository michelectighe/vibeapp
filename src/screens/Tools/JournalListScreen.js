// screens/JournalListScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getJournalEntriesFs, deleteJournalEntryFs, getJournalEntriesDb, deleteJournalEntryDb } from "@/database";
import { styles } from "./JournalListScreen.styles"; 

export const JournalListScreen = () => {
  const [entries, setEntries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const data = await getJournalEntriesFs();
      setEntries(data);
      setFiltered(data);
    } catch (e) {
      console.error("Failed to fetch journal entries:", e);
    }
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
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search journal entries..."
        value={search}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.entry} onLongPress={() => handleDelete(item.id)}>
            <Text style={styles.prompt}>{item.prompt}</Text>
            <Text style={styles.snippet} numberOfLines={2}>
              {item.entry}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
