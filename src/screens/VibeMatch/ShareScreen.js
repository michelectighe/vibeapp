import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  Share,
  TextInput,
  Keyboard,
  Switch,
  Text,
  ScrollView,
} from "react-native";
import { getAuth } from "firebase/auth";
import { useAuth, useUserProfile } from "@context";
import { loadResults } from "@utils";
import { GradientBackground, ResultSelector, SectionLayout } from "@components";
import { createMatchLink } from "@services";
import { Colors } from "@constants";
import { useAmbientControlForScreen } from "@hooks";
import { SubscriptionModal } from "@components";
import { globalStyles } from "@styles";
import { styles } from "./ShareScreen.styles";
import { deleteFirestoreRecord } from "@/database";
import { deleteResult } from "@/database";
import { SCREEN_HEIGHT } from "@/utils";

export const ShareScreen = ({ navigation }) => {
  useAmbientControlForScreen(true);
  const { profile } = useUserProfile();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSubModal, setShowSubModal] = useState(false);
  const auth = getAuth();
  const { user, authLoading, isPremium } = useAuth(); // 🔑 assuming `isPremium` is part of auth context
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [shareName, setShareName] = useState(null);

  
  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigation.navigate("Tabs", {
        screen: "Settings",
        params: {
          screen: "SignInScreen",
          params: {
            returnTo: {
              name: "VibeMatch",
              params: { screen: "ShareScreen" },
            },
          },
        },
      });
      // } else if (!isPremium) {
      //   //console.log("not premium - show modal");
      //   setShowSubModal(true);
      //   setLoading(false);
    } else {
      setShareName(user.displayName);
      fetchResults();
    }
  }, [authLoading, user, isPremium]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchResults = async () => {
    const data = await loadResults();
    setResults(data);
    setLoading(false);
  };

  const onShare = async (item) => {
    try {
      const name = profile.displayName;
      const link = await createMatchLink(item.id, auth.currentUser.uid, name, isAnonymous);
      await Share.share({
        message: `Compare your vibe with mine! Tap this link to begin: ${link}`,
      });
    } catch (err) {
      console.error("Share error:", err);
    }
  };

  const onTrash = async (item) => {
    try {
      console.log("userid:", user.uid);
      console.log("trying to delete item:", item.id);

      await deleteFirestoreRecord("results", item.id, user.uid);
      //  await deleteFirestoreRecord("matches", item.id, user.uid);
      deleteResult(item.id, (updatedResults) => {
        setResults(updatedResults); // or however you're storing them in state
      });
      fetchResults();
    } catch (err) {
      console.error("Deletion error:", err);
    }
  };

  const showResults = async (item) => {
    try {
      navigation.navigate("Tabs", {
        screen: "VibeCheck",
        params: {
          screen: "Results",
          params: {
            resultID: item.resultID,
            returnTo: "VibeMatch",
          },
        },
      });
    } catch (err) {
      console.error("Get Results error:", err);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: SCREEN_HEIGHT * 0.2 }} />;
  }

  return (
    <>
      <GradientBackground
        colors={[
          Colors.gradient1Match,
          Colors.gradient2Match,
          Colors.gradient3Match,
          Colors.gradient1Match,
        ]}
      >
        <SectionLayout
          topFlex={1}
          middleFlex={0}
          bottomFlex={0}
          safe={false}
          topContent={
            <>
              <View style={styles.titleWrapper}>
                <Text style={styles.title}>Vibe Match</Text>
                <Text style={styles.subTitle}>Let&apos;s see if your vibes are in sync.</Text>
              </View>
              <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
              >
                {/* <View style={styles.options}>
                  <View style={[styles.anonymous]}>
                    <Text style={[styles.anonymousText]}>anonymous</Text>
                    <Switch
                      style={styles.switch}
                      value={isAnonymous}
                      onValueChange={(val) => {
                        setIsAnonymous(val);
                      }}
                      thumbColor={isAnonymous ? Colors.accent : "#ccc"}
                      trackColor={{ false: "#aaa", true: Colors.accentLight }}
                    />
                  </View>
                  {!isAnonymous && (
                    <View style={[styles.shareAs, {}]}>
                      <Text style={{ color: Colors.textLight }}>Share as: </Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter your name"
                        placeholderTextColor={Colors.mediumGray}
                        value={shareName}
                        onChangeText={setShareName}
                        autoCapitalize="none"
                        returnKeyType="done"
                        onSubmitEditing={Keyboard.dismiss}
                      />
                    </View>
                  )}
                </View> */}
                <ResultSelector
                  results={results}
                  onSelect={(item) => showResults(item)}
                  onShare={onShare}
                  onTrash={onTrash}
                />
              </ScrollView>
            </>
          }
        />
      </GradientBackground>

      <SubscriptionModal
        visible={showSubModal}
        onClose={(shouldUpgrade) => {
          setShowSubModal(false);
          if (!shouldUpgrade) {
            navigation.replace("Tabs", { screen: "Home" });
          }
        }}
        onUpgrade={() => {
          navigation.navigate("Tabs", {
            screen: "Settings",
            params: {
              screen: "SubscriptionScreen",
              params: { returnTo: "ShareScreen" },
            },
          });
        }}
      />
    </>
  );
};
