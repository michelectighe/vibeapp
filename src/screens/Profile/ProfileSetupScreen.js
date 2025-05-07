import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useUserProfile, useAuth } from "@context";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@config/firebaseConfig";
import {
  GradientBackground,
  CustomSpiritualButton,
  SectionLayout,
} from "@components";
import { Colors } from "@constants";
import { styles } from "./ProfileSetupScreen.style";
import { globalStyles } from "@styles";
import { useAmbientControlForScreen } from "@hooks";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/utils";

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
      } catch (err) {
        console.error("❌ Failed to save profile:", err);
      } finally {
        setSaving(false);
      }
    }
    handleDone();
  };

  const handleDone = () => {
    navigation.replace("SettingsScreen");
  };

  const ScrollableInput = ({ value, onChangeText, placeholder }) => (
    <View
      style={[
        styles.inputGoals,
        { height: SCREEN_HEIGHT * 0.1, width: SCREEN_WIDTH * 0.9 },
      ]}
    >
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        multiline
        style={{ flex: 1, color: "#fff", textAlignVertical: "top" }}
        scrollEnabled
      />
    </View>
  );

  return (
    <GradientBackground
      colors={[Colors.gradient1, Colors.gradient2, Colors.gradient1]}
    >
      <SectionLayout
        topFlex={1}
        middleFlex={3}
        bottomFlex={0}
        topContent={
          <View style={globalStyles.titleWrapper}>
            <Text style={globalStyles.title}>
              Welcome, {user?.displayName || "friend"}
            </Text>
          </View>
        }
        middleContent={
          <View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={80} // tweak if needed for your layout
              >
                <Text style={styles.subtitle}>
                  What is your intention for using VibeKey?
                </Text>
                <ScrollableInput
                  value={goals}
                  onChangeText={setGoals}
                  placeholder="e.g. Raise my vibration, feel more connected..."
                />

                <Text style={styles.subtitle}>
                  What challenges are you currently facing?
                </Text>
                <ScrollableInput
                  value={challenges}
                  onChangeText={setChallenges}
                  placeholder="e.g. Anxiety, burnout, low energy..."
                />

                <Text style={styles.subtitle}>
                  What kind of support or tools would help?
                </Text>
                <ScrollableInput
                  value={support}
                  onChangeText={setSupport}
                  placeholder="e.g. Guided meditations, reminders, insights..."
                />
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </View>
        }
        bottomContent={
          <View style={styles.bottomButtons}>
            <CustomSpiritualButton
              label={saving ? "Saving..." : "Save & Continue"}
              onPress={handleSave}
              color={Colors.buttonBackground}
              textColor={Colors.lightText}
            />
            <CustomSpiritualButton
              label="Cancel"
              onPress={handleDone}
              color={Colors.buttonBackground}
              textColor={Colors.lightText}
            />
          </View>
        }
      />
    </GradientBackground>
  );
};
