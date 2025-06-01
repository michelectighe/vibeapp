// MatchNotificationsScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getDocs, query, where, collection } from "firebase/firestore";
import { dbFs } from "@/config/firebaseConfig";
import { useAuth } from "@context";
import { styles } from "./MatchNotificationScreen.styles";
import { GradientBackground } from "@/components";

export const MatchNotificationScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [sentMatches, setSentMatches] = useState([]);
  const [receivedMatches, setReceivedMatches] = useState([]);

  useEffect(() => {
    console.log('user:', user?.uid)
    if (!user?.uid) return;

    const fetchMatches = async () => {
      const matchRef = collection(dbFs, "matchLinks");

      const sentQuery = query(matchRef, where("sharedByUserId", "==", user.uid));
      const receivedQuery = query(matchRef, where("recipientUserId", "==", user.uid));
console.log('sentQuery:', sentQuery)
console.log('receivedQuery:', receivedQuery)
      const [sentSnap, receivedSnap] = await Promise.all([
        getDocs(sentQuery),
        getDocs(receivedQuery),
      ]);

      setSentMatches(sentSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setReceivedMatches(receivedSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    fetchMatches();
  }, [user?.uid]);

  const renderMatch = (match, type) => (
    <TouchableOpacity
      key={match.matchId}
      style={styles.matchCard}
      onPress={() =>
        navigation.navigate("MatchComparisonScreen", {
          myResultId: type === "sent" ? match.sharedByResultId : match.recipientResultId,
          sharedResultId: type === "sent" ? match.recipientResultId : match.sharedByResultId,
          shareName: type === "sent" ? match.recipientUserName : match.sharedByUserName,
          matchId: match.matchId,
        })
      }
    >
      <Text style={styles.cardTitle}>
        {type === "sent" ? `Sent to ${match.recipientUserName}` : `From ${match.sharedByUserName}`}
      </Text>
      <Text style={styles.cardStatus}>
        {match.completed ? (match.read ? "Viewed ✅" : "Ready to View 🔔") : "Waiting..."}
      </Text>
    </TouchableOpacity>
  );

  return (
    <GradientBackground>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Your Match Activity</Text>

        <Text style={styles.sectionTitle}>Matches You Sent</Text>
        {sentMatches.length === 0 ? (
          <Text style={styles.emptyText}>No sent matches yet.</Text>
        ) : (
          sentMatches.map((m) => renderMatch(m, "sent"))
        )}

        <Text style={styles.sectionTitle}>Matches You Received</Text>
        {receivedMatches.length === 0 ? (
          <Text style={styles.emptyText}>No received matches yet.</Text>
        ) : (
          receivedMatches.map((m) => renderMatch(m, "received"))
        )}
      </ScrollView>
    </GradientBackground>
  );
};
