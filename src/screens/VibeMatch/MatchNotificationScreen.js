// MatchNotificationsScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getDocs, query, where, collection } from "firebase/firestore";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { dbFs } from "@/config/firebaseConfig";
import { useAuth } from "@context";
import { styles } from "./MatchNotificationScreen.styles";
import { GradientBackground } from "@/components";

export const MatchNotificationScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [sentMatches, setSentMatches] = useState([]);
  const [receivedMatches, setReceivedMatches] = useState([]);
  const tabBarHeight = useBottomTabBarHeight();

  useEffect(() => {
    console.log("user:", user?.uid);
    if (!user?.uid) return;

    const fetchMatches = async () => {
      const matchRef = collection(dbFs, "matchLinks");

      const sentQuery = query(
        matchRef,
        where("senderUserId", "==", user.uid),
        where("forComparison", "==", true),
        where("completed", "==", true),
      );
      const receivedQuery = query(matchRef, where("recipientUserId", "==", user.uid));

      const [sentSnap, receivedSnap] = await Promise.all([
        getDocs(sentQuery),
        getDocs(receivedQuery),
      ]);
      const sentMatchesToSee = sentSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const receivedMatchesToSee = receivedSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      // matches is your array from Firestore
      const orderedMatches = [...sentMatchesToSee].sort((a, b) => {
        // 1. Unread first
        if (!!a.read !== !!b.read) {
          return a.read ? 1 : -1; // false (unread) comes before true (read)
        }
        // 2. Newest first by timestamp
        return (b.timestamp ?? 0) - (a.timestamp ?? 0);
      });
      console.log("SEND MATCHED:", sentMatchesToSee);
      console.log("RECEIVED MATHES:", receivedMatchesToSee);
      setSentMatches(orderedMatches);
      setReceivedMatches(receivedMatchesToSee);
    };

    fetchMatches();
  }, [user?.uid]);

  const formatDate = (timestamp) => {
    if (!timestamp?.toDate) return "";
    return timestamp.toDate().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const renderMatch = (match, type) => (
    <TouchableOpacity
      key={match.matchId}
      style={styles.matchCard}
      onPress={() =>
        navigation.navigate("MatchComparisonScreen", {
          matchId: match.matchId,
          viewerRole: type === "sent" ? "sender" : "recipient",
          comparisonResults: match.comparisonResults,
          recipientUserName: match.recipientUserName,
          senderUserName: match.senderUserName,
        })
      }
    >
      {/* {type === "sent" && match.completed && (
        <View style={styles.pendingCard}>
          <Text style={styles.cardStatus}>Sent on: {formatDate(match.timestamp)}</Text>
          <Text style={styles.cardTitle}>{match.recipientUserName} has Matched!</Text>
          <Text style={styles.cardStatus}>{match.read ? "Viewed ✅" : "Ready to View 🔔"}</Text>
        </View>
      )} */}
 
      <Text style={styles.cardTitle}>
        {type === "sent" ? `Sent to ${match.recipientUserName}` : `From ${match.senderUserName}`}
      </Text>
      <Text style={styles.cardStatus}>
        {match.completed ? (match.read ? "Viewed ✅" : "Ready to View 🔔") : "Waiting..."}
      </Text>
      <Text style={styles.cardStatus}>Sent on: {formatDate(match.timestamp)}</Text>
    </TouchableOpacity>
  );

  return (
    <GradientBackground>
      <ScrollView
        style={[styles.scrollView, { bottom: tabBarHeight + 12 }]}
        contentContainerStyle={[styles.scrollContent, { paddingTop: 100 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.matchView}>
          <Text style={styles.title}>Your Match Activity</Text>

          <Text style={styles.sectionTitle}>Matches You`&apos`ve Sent</Text>
          {sentMatches.length === 0 ? (
            <Text style={styles.emptyText}>No sent matches yet.</Text>
          ) : (
         
            sentMatches.map((m) => renderMatch(m, "sent"))
          )}

          <Text style={styles.sectionTitle}>Matches You`&apos`ve Received</Text>
          {receivedMatches.length === 0 ? (
            <Text style={styles.emptyText}>No received matches yet.</Text>
          ) : (
            receivedMatches.map((m) => renderMatch(m, "received"))
          )}
        </View>
      </ScrollView>
    </GradientBackground>
  );
};
