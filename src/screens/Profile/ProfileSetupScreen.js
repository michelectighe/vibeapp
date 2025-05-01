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
import { profileStyles, profileAssets } from "@styles/StylesProfile";

const ProfileSetupScreen = ({ navigation }) => {
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
    //   style={profileStyles.bg}
    //   resizeMode="cover"
    // >
    <GradientBackground
      colors={[
        Colors.VibeGradient1,
        Colors.VibeGradient2,
        Colors.VibeGradient1,
      ]}
    >
      <View style={profileStyles.container}>
        <Text style={profileStyles.title}>
          Welcome, {user?.displayName || "friend"}
        </Text>
        <ScrollView
          style={{ paddingHorizontal: 16, marginTop: 80 }}
          contentContainerStyle={{ paddingBottom: 160 }}
          showsVerticalScrollIndicator={false}
        >
          {/* <View style={profileStyles.formContainer}> */}
          <Text style={profileStyles.subtitle}>
            What is your intention for using VibeKey?
          </Text>
          <TextInput
            value={goals}
            onChangeText={setGoals}
            placeholder="e.g. Raise my vibration, feel more connected..."
            placeholderTextColor="#aaa"
            multiline
            numberOfLines={4}
            style={profileStyles.inputGoals}
          />

          <Text style={profileStyles.subtitle}>
            What challenges are you currently facing?
          </Text>
          <TextInput
            value={challenges}
            onChangeText={setChallenges}
            placeholder="e.g. Anxiety, burnout, low energy..."
            placeholderTextColor="#aaa"
            multiline
            numberOfLines={3}
            style={profileStyles.inputGoals}
          />

          <Text style={profileStyles.subtitle}>
            What kind of support or tools would help?
          </Text>
          <TextInput
            value={support}
            onChangeText={setSupport}
            placeholder="e.g. Guided meditations, reminders, insights..."
            placeholderTextColor="#aaa"
            multiline
            numberOfLines={3}
            style={profileStyles.inputGoals}
          />
          {/* </View> */}
          <CustomSpiritualButton
            label="Save & Continue"
            onPress={handleSave}
            color={Colors.vcButtonColor}
            textColor={Colors.vcButtonTextColor}
          />
          {/* </View> */}
          <CustomSpiritualButton
            label="Cancel"
            onPress={handleDone}
            color={Colors.vcButtonColor}
            textColor={Colors.vcButtonTextColor}
          />
        </ScrollView>
      </View>
    </GradientBackground>
  );
};

export default ProfileSetupScreen;
