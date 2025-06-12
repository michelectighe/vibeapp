import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Switch,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import { useAuth, useUserProfile } from "@context";
import {
  saveBiometricOptIn,
  clearSavedCredentials,
  getBiometricOptIn,
  getFriendlyError,
} from "@utils";
import { validatePassword, getPasswordStrength } from "@utils/validatePassword";
import { updateDoc, doc } from "firebase/firestore";
import { dbFs } from "@config/firebaseConfig";
import * as keychain from "react-native-keychain";
import {
  GradientBackground,
  SectionLayout,
  CustomSpiritualButton,
  ProfileInput,
} from "@components";
import { getMusicPreference, saveMusicPreference } from "@/services";
import { Colors } from "@constants";
import { styles } from "./UpdateProfileScreen.style";

import { useAmbientControlForScreen } from "@hooks";

export const UpdateProfileScreen = ({ navigation }) => {
  useAmbientControlForScreen(true);
  const { user, updateProfile, updateEmail, updatePassword, authLoading } = useAuth();
  const { profile, updateUserData, fetchUserData } = useUserProfile();
  const [modalVisible, setModalVisible] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [faceIDEnabled, setFaceIDEnabled] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [isAppleLogin, setIsAppleLogin] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [goals, setGoals] = useState("");
  const [challenges, setChallenges] = useState("");
  const [support, setSupport] = useState("");

  useEffect(() => {
    const loadUserData = async () => {
      const profileData = await fetchUserData();
      //console.log("profile:", profileData);
      if (profileData.goals) setGoals(profileData.goals[0]);
      if (profileData.challenges) setChallenges(profileData.challenges[0]);
      if (profileData.support) setSupport(profileData.support[0]);
    };
    loadUserData();
  }, [profile]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!user) return;

    setIsAppleLogin(user.providerData?.some((p) => p.providerId === "apple.com"));
    setName(profile?.name || user.displayName || "");
    setEmail(profile?.email || user.email || "");

    getBiometricOptIn().then(setFaceIDEnabled);
    getMusicPreference().then(setMusicEnabled);
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const confirmIdentity = async () => {
    try {
      const credentials = await keychain.getGenericPassword({
        authenticationPrompt: {
          title: "Confirm identity to update your profile",
        },
      });
      return !!credentials;
    } catch (err) {
      return false;
    }
  };

  const handleUpdate = async () => {
    setPasswordError("");
    if (!isDirty) return;
    try {
      const updates = {};
      const ref = doc(dbFs, "users", user.uid);
      if (password || confirmPassword) {
        const validationError = validatePassword(password, confirmPassword);
        if (validationError) {
          setPasswordError(validationError);
          return;
        }
        const confirmed = await confirmIdentity();
        if (!confirmed) {
          setPasswordError("You must confirm your identity to save changes.");
          return;
        }
        await updatePassword(password);
      }

      if (email && email !== user.email) {
        await updateEmail(email);
        updates.email = email;
      }

      if (name && name !== user.displayName) {
        await updateProfile({ displayName: name });
        updates.name = name;
      }

      faceIDEnabled ? await saveBiometricOptIn(true) : await clearSavedCredentials();
      saveMusicPreference(musicEnabled);
      updateUserData(user.uid, {
        goals: [goals],
        challenges: [challenges],
        support: [support],
      });

      if (Object.keys(updates).length > 0) {
        await updateDoc(ref, updates);
      }
      //console.log("setmodal true");
      //   triggerConfirmation();
      setModalVisible(true);

      //    navigation.replace("Tabs", { screen: "Home" });
    } catch (err) {
      const friendly = getFriendlyError(err.code);
      setPasswordError(friendly || "Failed to update profile.");
    }
  };

  if (authLoading) {
    return (
      <Text style={{ color: Colors.white, textAlign: "center", marginTop: 50 }}>
        Authenticating...
      </Text>
    );
  }

  return (
    <GradientBackground colors={[Colors.gradient1, Colors.gradient2, Colors.gradient3]}>
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>✅ Profile updated successfully!</Text>
            <Pressable
              onPress={() => {
                setModalVisible(false);
                navigation.replace("Tabs", { screen: "Home" });
              }}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <SectionLayout
        topFlex={1}
        middleFlex={0}
        bottomFlex={0}
        // topContent={null}
        safe={false}
        topContent={
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : undefined}
              keyboardVerticalOffset={0}
              style={{ flex: 1 }}
            >
              <View style={styles.titleWrapper}>
                <Text style={styles.title}>Update Profile</Text>
              </View>
              <ScrollView
                contentContainerStyle={{
                  paddingTop: 160,
                  paddingBottom: 100,
                  paddingHorizontal: 24,
                }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
              >
                <ProfileInput
                  label="Name"
                  value={name}
                  onChangeText={(t) => {
                    setName(t);
                    setIsDirty(true);
                  }}
                />
                {!isAppleLogin && (
                  <>
                    <ProfileInput
                      label="Email"
                      value={email}
                      onChangeText={(t) => {
                        setEmail(t);
                        setIsDirty(true);
                      }}
                      keyboardType="email-address"
                    />
                    <ProfileInput
                      label="New Password"
                      value={password}
                      onChangeText={(t) => {
                        setPassword(t);
                        setIsDirty(true);
                      }}
                      secure
                    />
                    <ProfileInput
                      label="Confirm Password"
                      value={confirmPassword}
                      onChangeText={(t) => {
                        setConfirmPassword(t);
                        setIsDirty(true);
                      }}
                      secure
                    />
                    <Text style={{ color: Colors.lightGray, marginVertical: 8 }}>
                      {password ? getPasswordStrength(password) : ""}
                    </Text>
                  </>
                )}
                <Text style={styles.link}>{passwordError}</Text>

                <View style={styles.toggles}>
                  <Switch
                    value={faceIDEnabled}
                    onValueChange={(val) => {
                      setFaceIDEnabled(val);
                      setIsDirty(true);
                    }}
                  />
                  <Text style={styles.switchText}>Enable Face ID</Text>
                </View>

                <View style={styles.toggles}>
                  <Switch
                    value={musicEnabled}
                    onValueChange={(val) => {
                      setMusicEnabled(val);
                      setIsDirty(true);
                    }}
                  />
                  <Text style={styles.switchText}>Enable Music</Text>
                </View>

                <Text style={styles.subtitle}>What is your intention for using VibeKey?</Text>
                <TextInput
                  value={goals}
                  onChangeText={(t) => {
                    setGoals(t);
                    setIsDirty(true);
                  }}
                  placeholder="e.g. Raise my vibration, feel more connected..."
                  multiline
                  style={[styles.inputGoals, { textAlign: "left", height: 100 }]}
                />

                <Text style={styles.subtitle}>What challenges are you currently facing?</Text>
                <TextInput
                  value={challenges}
                  onChangeText={(t) => {
                    setChallenges(t);
                    setIsDirty(true);
                  }}
                  placeholder="e.g. Anxiety, burnout, low energy..."
                  multiline
                  style={[styles.inputGoals, { textAlign: "left", height: 100 }]}
                />

                <Text style={styles.subtitle}>What kind of support or tools would help?</Text>
                <TextInput
                  value={support}
                  onChangeText={(t) => {
                    setSupport(t);
                    setIsDirty(true);
                  }}
                  placeholder="e.g. Guided meditations, reminders, insights..."
                  multiline
                  style={[styles.inputGoals, { textAlign: "left", height: 100 }]}
                />

                <View style={styles.bottomButtons}>
                  <CustomSpiritualButton
                    label="Update"
                    onPress={handleUpdate}
                    color={Colors.buttonBackground}
                    textColor={Colors.buttonText}
                  />
                  <CustomSpiritualButton
                    label="Cancel"
                    onPress={() => navigation.goBack()}
                    color={Colors.buttonBackground}
                    textColor={Colors.buttonText}
                  />

                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        }
      />
    </GradientBackground>
  );
};
