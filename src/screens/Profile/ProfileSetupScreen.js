import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
} from "react-native";
import { useUserProfile, useAuth } from "@context";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@config/firebaseConfig";
import { GradientBackground, CustomSpiritualButton } from "@components";
import { Colors, Fonts } from "@constants";
import { styles, profileAssets } from "./StylesProfile";
import { useAmbientControlForScreen } from "@hooks";
import { globalStyles } from "@styles";

export const ProfileSetupScreen = ({ navigation }) => {
  useAmbientControlForScreen(true);
  const { user } = useAuth();

  const { profile, setProfile } = useUserProfile();

  const [goals, setGoals] = useState("");
  const [challenges, setChallenges] = useState("");
  const [support, setSupport] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      if (profile.goals) setGoals(profile.goals);
      if (profile.challenges) setChallenges(profile.challenges);
      if (profile.support) setSupport(profile.support);
    }
  }, [profile]);

  const handleSave = async () => {
    if (goals.trim() || challenges.trim() || support.trim()) {
      setSaving(true);
      const updatedProfile = { goals, challenges, support };

      try {
        const ref = doc(db, "users", user.uid);
        await updateDoc(ref, updatedProfile);
        setProfile({ ...profile, ...updatedProfile });
        //console.log("✅ Profile saved:", updatedProfile);
      } catch (err) {
        console.error("❌ Failed to save profile:", err);
      } finally {
        setSaving(false);
      }
    }
    handleDone();
  };
  const handleDone = async () => {
    navigation.replace("SettingsScreen");
  };

  return (
    // <ImageBackground
    //   source={profileAssets.background}
    //   style={styles.bg}
    //   resizeMode="cover"
    // >
    <GradientBackground
      colors={[Colors.gradient1, Colors.gradient2, Colors.gradient1]}
    >
      <View style={styles.container}>
        <Text style={styles.title}>
          Welcome, {user?.displayName || "friend"}
        </Text>
        <ScrollView
          style={globalStyles.scrollView}
          contentContainerStyle={globalStyles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* <View style={styles.formContainer}> */}
          <Text style={styles.subtitle}>
            What is your intention for using VibeKey?
          </Text>
          <TextInput
            value={goals}
            onChangeText={setGoals}
            placeholder="e.g. Raise my vibration, feel more connected..."
            placeholderTextColor="#aaa"
            multiline
            numberOfLines={4}
            style={styles.inputGoals}
          />

          <Text style={styles.subtitle}>
            What challenges are you currently facing?
          </Text>
          <TextInput
            value={challenges}
            onChangeText={setChallenges}
            placeholder="e.g. Anxiety, burnout, low energy..."
            placeholderTextColor="#aaa"
            multiline
            numberOfLines={3}
            style={styles.inputGoals}
          />

          <Text style={styles.subtitle}>
            What kind of support or tools would help?
          </Text>
          <TextInput
            value={support}
            onChangeText={setSupport}
            placeholder="e.g. Guided meditations, reminders, insights..."
            placeholderTextColor="#aaa"
            multiline
            numberOfLines={3}
            style={styles.inputGoals}
          />
          {/* </View> */}
          <CustomSpiritualButton
            label="Save & Continue"
            onPress={handleSave}
            color={Colors.buttonBackground}
            textColor={Colors.lightText}
          />
          {/* </View> */}
          <CustomSpiritualButton
            label="Cancel"
            onPress={handleDone}
            color={Colors.buttonBackground}
            textColor={Colors.lightText}
          />
        </ScrollView>
      </View>
    </GradientBackground>
  );
};
