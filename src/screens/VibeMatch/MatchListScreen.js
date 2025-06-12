import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAllMatchesForUserFs } from "@/database"; // This is the function from earlier
import { styles } from "./MatchListScreen.styles";
import { GradientBackground, CloseX } from "@/components";
import { Colors } from "@/constants";

export const MatchListScreen = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const loadMatches = async () => {
      try {
        const data = await getAllMatchesForUserFs();
        setMatches(data);
      } catch (e) {
        console.error("Error loading matches:", e);
      } finally {
        setLoading(false);
      }
    };

    loadMatches();
  }, []);

  const handleSelectMatch = (match) => {
    navigation.navigate("MatchComparisonScreen", { match });
  };

  return (
    <GradientBackground>
      <CloseX onPress={() => navigation.goBack()} xColor={Colors.textDark} />
      <Text style={styles.title}>Your Matches</Text>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {matches.map((match) => (
            <TouchableOpacity
              key={match.id}
              style={styles.matchCard}
              onPress={() => handleSelectMatch(match)}
            >
              <Text style={styles.name}>{match.senderUserName || "Unknown User"}</Text>
              <Text style={styles.info}>Score: {match.overallMatch || "?"}</Text>
              <Text style={styles.info}>
                Type:{" "}
                {match.recipientUserId === match.senderUserId
                  ? "Self"
                  : match.recipientUserId
                  ? "Sent"
                  : "Received"}
              </Text>
            </TouchableOpacity>
          ))}

          {matches.length === 0 && (
            <Text style={styles.emptyText}>You don`&apos`t have any matches yet.</Text>
          )}
        </ScrollView>
      )}
    </GradientBackground>
  );
};
