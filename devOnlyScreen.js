import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { doc, setDoc, getDocs, collection, deleteDoc } from "firebase/firestore";
import { db } from "@config/firebaseConfig";
import { uploadDataToFireStore } from "@/utils";
import { useNavigation } from "@react-navigation/native";
import { CloseX, CustomSpiritualButton } from "@components";
import { Colors } from "@constants";
import { truncateCollection, truncateLocalTable } from "@database";

export const DevOnly = () => {
  const navigation = useNavigation();
  const [stories, setStories] = useState([]);
  const [newStory, setNewStory] = useState({
    id: "",
    title: "",
    content: "",
    vibeLevel: "",
    vibeLabel: "",
    imageUrl: "",
    sourceUrl: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [filter, setFilter] = useState("all"); // "all", "today", or "label:Love"

  const fetchStories = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "goodNews"));
      const allStories = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStories(allStories);
    } catch (error) {
      console.error("Error fetching stories:", error);
    }
  };

  const saveStory = async () => {
    try {
      if (!newStory.id || !newStory.title) {
        Alert.alert("Error", "Please enter at least an ID and a Title");
        return;
      }
      const docRef = doc(db, "goodNews", newStory.id);
      await setDoc(docRef, {
        ...newStory,
        vibeLevel: parseInt(newStory.vibeLevel),
        submittedByUser: false,
      });
      Alert.alert("Success", `Story "${newStory.title}" saved.`);
      setNewStory({
        id: "",
        title: "",
        content: "",
        vibeLevel: "",
        vibeLabel: "",
        imageUrl: "",
        sourceUrl: "",
      });
      setIsEditMode(false);
      fetchStories();
    } catch (err) {
      console.error("Save error:", err);
      Alert.alert("Error", "Could not save story.");
    }
  };

  const selectStory = (story) => {
    setNewStory({
      id: story.id,
      title: story.title,
      content: story.content,
      vibeLevel: story.vibeLevel.toString(),
      vibeLabel: story.vibeLabel,
      imageUrl: story.imageUrl,
      sourceUrl: story.sourceUrl,
    });
    setIsEditMode(true);
  };
  const truncateTable = async (table) => {
    // delete from firestore
    try {
      await truncateCollection(table);
      Alert.alert("Success", `${table} "truncated from Firestore"`);

      if (table === "match") {
        await truncateLocalTable("MatchResultsReceived");
        await truncateLocalTable("matchesReceived");
        await truncateLocalTable("matchesSent");
      } else {
        await truncateLocalTable(table);
      }
    } catch (e) {
      console.error("error truncating tables", e);
    }
  };
  const deleteStory = async (id) => {
    Alert.alert("Delete Story", `Are you sure you want to delete story "${id}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteDoc(doc(db, "goodNews", id));
            Alert.alert("Deleted", `Story "${id}" deleted.`);
            fetchStories();
          } catch (err) {
            console.error("Delete error:", err);
            Alert.alert("Error", "Could not delete story.");
          }
        },
      },
    ]);
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CloseX xColor={Colors.textDark} onPress={() => navigation.goBack()} />
      {__DEV__ && (
        <>
          <Text style={[styles.heading, { marginTop: 100 }]}>Dev Control Panel</Text>

          {/* <Button
            title="Upload Backup Stories"
            onPress={async () => {
              const success = await uploadDataToFireStore();
              Alert.alert(
                success ? "Success" : "Error",
                success ? "Stories uploaded." : "Upload failed.",
              );
              fetchStories();
            }}
          /> */}

          <Text style={styles.subheading}>{isEditMode ? "Edit Story" : "Add New Story"}</Text>
          {["id", "title", "content", "vibeLevel", "vibeLabel", "imageUrl", "sourceUrl"].map(
            (field) => (
              <View key={field}>
                <Text>{field}</Text>
                <TextInput
                  placeholder={field}
                  value={newStory[field]}
                  onChangeText={(text) => setNewStory({ ...newStory, [field]: text })}
                  style={styles.input}
                  multiline={field === "content"}
                />
              </View>
            ),
          )}
          <Button title={isEditMode ? "Update Story" : "Save New Story"} onPress={saveStory} />

          {isEditMode && (
            <Button
              title="Cancel Edit"
              color="gray"
              onPress={() => {
                setNewStory({
                  id: "",
                  title: "",
                  content: "",
                  vibeLevel: "",
                  vibeLabel: "",
                  imageUrl: "",
                  sourceUrl: "",
                });
                setIsEditMode(false);
              }}
            />
          )}
          <Text style={styles.subheading}>Filter Stories</Text>
          <View style={styles.filterRow}>
            <Button title="All" onPress={() => setFilter("all")} />
            <Button title="Today" onPress={() => setFilter("today")} />
            <Button title="Love" onPress={() => setFilter("label:Love")} />
            <Button title="Joy" onPress={() => setFilter("label:Joy")} />
            <Button title="Hope" onPress={() => setFilter("label:Hope")} />
          </View>

          <Text style={styles.subheading}>Existing Stories ({stories.length})</Text>
          {stories
            .filter((story) => {
              if (filter === "all") return true;
              if (filter === "today") {
                const today = new Date().toISOString().split("T")[0];
                return story.id === today;
              }
              if (filter.startsWith("label:")) {
                const label = filter.split(":")[1];
                return story.vibeLabel === label;
              }
              return true;
            })
            .map((story) => (
              <View key={story.id} style={styles.storyItem}>
                <Text style={styles.storyTitle}>
                  {story.id}: {story.title}
                </Text>
                <Text style={styles.storyVibe}>
                  Vibe: {story.vibeLabel} ({story.vibeLevel})
                </Text>
                <View style={styles.buttonRow}>
                  <TouchableOpacity onPress={() => selectStory(story)} style={styles.buttonSelect}>
                    <Text style={styles.buttonText}>Select</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => deleteStory(story.id)}
                    style={styles.buttonDelete}
                  >
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
        </>
      )}
      <View>
        <CustomSpiritualButton
          label="Truncate Results Table"
          onPress={() => truncateTable("results")}
          color={Colors.buttonBackground}
          textColor={Colors.buttonText}
        />
        <CustomSpiritualButton
          label="Truncate Match Tables"
          onPress={() => truncateTable("match")}
          color={Colors.buttonBackground}
          textColor={Colors.buttonText}
        />
        <CustomSpiritualButton
          label="Truncate Sticky Notes Table"
          onPress={() => truncateTable("sticky_notes")}
          color={Colors.buttonBackground}
          textColor={Colors.buttonText}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 80,
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subheading: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 8,
    borderRadius: 8,
    marginBottom: 10,
  },
  storyItem: {
    marginBottom: 12,
    padding: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
  },
  storyTitle: {
    fontWeight: "600",
  },
  storyVibe: {
    fontStyle: "italic",
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 8,
    justifyContent: "space-between",
  },
  buttonSelect: {
    backgroundColor: "#4CAF50",
    padding: 6,
    borderRadius: 6,
  },
  buttonDelete: {
    backgroundColor: "#f44336",
    padding: 6,
    borderRadius: 6,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 16,
  },
});
