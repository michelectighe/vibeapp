import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Switch,
  Animated,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TextInput,
} from "react-native";
import { useAuth, useUserProfile } from "@context";
import {
  saveBiometricOptIn,
  clearSavedCredentials,
  getBiometricOptIn,
  getFriendlyError,
} from "@utils";
import { AnimatedVerticalScroll } from "@/components";
import { validatePassword, getPasswordStrength } from "@utils/validatePassword";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@config/firebaseConfig";
import * as keychain from "react-native-keychain";
import {
  GradientBackground,
  SectionLayout,
  CustomSpiritualButton,
  ProfileInput,
} from "@components";
import { getMusicPreference } from "@/services";
import { Colors } from "@constants";
import { styles } from "./UpdateProfileScreen.style";
import { globalStyles } from "@styles";
import { SCREEN_WIDTH } from "@/utils";
import { useAmbientControlForScreen } from "@hooks";

export const UpdateProfileScreen = ({ navigation }) => {
  useAmbientControlForScreen(true);
  const { user, updateProfile, updateEmail, updatePassword, authLoading } = useAuth();
  const { profile } = useUserProfile();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [faceIDEnabled, setFaceIDEnabled] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [isAppleLogin, setIsAppleLogin] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const confirmationAnim = useRef(new Animated.Value(0)).current;
  const [goals, setGoals] = useState("");
  const [challenges, setChallenges] = useState("");
  const [support, setSupport] = useState("");

  useEffect(() => {
    if (profile) {
      if (profile.goals) setGoals(profile.goals);
      if (profile.challenges) setChallenges(profile.challenges);
      if (profile.support) setSupport(profile.support);
    }
  }, [profile]);

  useEffect(() => {
    if (!user) return;

    setIsAppleLogin(user.providerData?.some((p) => p.providerId === "apple.com"));
    setName(profile?.name || user.displayName || "");
    setEmail(profile?.email || user.email || "");

    getBiometricOptIn().then(setFaceIDEnabled);
    getMusicPreference().then(setMusicEnabled);
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const triggerConfirmation = () => {
    console.log("conf trigger");
    Animated.sequence([
      Animated.timing(confirmationAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(1500),
      Animated.timing(confirmationAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

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
      const ref = doc(db, "users", user.uid);
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
        console.log("in email");
        await updateEmail(email);
        updates.email = email;
      }

      if (name && name !== user.displayName) {
        console.log("in name");
        await updateProfile({ displayName: name });
        updates.name = name;
      }

      faceIDEnabled ? await saveBiometricOptIn(true) : await clearSavedCredentials();

      // await setUserMusicPref(musicEnabled);

      if (Object.keys(updates).length > 0) {
        console.log("update doc");
        await updateDoc(ref, updates);
      }

      triggerConfirmation();
      alert("✅ Profile updated successfully!");
      navigation.replace("Tabs", { screen: "Home" });
    } catch (err) {
      const friendly = getFriendlyError(err.code);
      setPasswordError(friendly || "Failed to update profile.");
    }
  };

  const ScrollableInput = ({ value, onChangeText, placeholder }) => (
    <View style={styles.inputGoals}>
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

  if (authLoading) {
    return (
      <Text style={{ color: "#fff", textAlign: "center", marginTop: 50 }}>Authenticating...</Text>
    );
  }

  return (
    <GradientBackground colors={[Colors.gradient1, Colors.gradient2, Colors.gradient1]}>
      <SectionLayout
        topFlex={2}
        middleFlex={6}
        bottomFlex={1}
        topContent={
          <View style={globalStyles.titleWrapper}>
            <Text style={globalStyles.title}>Update Profile</Text>
          </View>
        }
        middleContent={
          <View>
            <AnimatedVerticalScroll style={{ width: SCREEN_WIDTH * 0.9 }}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                  style={{ flex: 1 }}
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                  keyboardVerticalOffset={80} // tweak if needed for your layout
                >
                  <View style={globalStyles.formContainer}>
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
                        <Text style={{ color: "#ccc", marginVertical: 8 }}>
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
                  </View>
                  <View>
                    <Text style={styles.subtitle}>What is your intention for using VibeKey?</Text>
                    <ScrollableInput
                      value={goals}
                      onChangeText={setGoals}
                      placeholder="e.g. Raise my vibration, feel more connected..."
                    />

                    <Text style={styles.subtitle}>What challenges are you currently facing?</Text>
                    <ScrollableInput
                      value={challenges}
                      onChangeText={setChallenges}
                      placeholder="e.g. Anxiety, burnout, low energy..."
                    />

                    <Text style={styles.subtitle}>What kind of support or tools would help?</Text>
                    <ScrollableInput
                      value={support}
                      onChangeText={setSupport}
                      placeholder="e.g. Guided meditations, reminders, insights..."
                    />
                  </View>
                </KeyboardAvoidingView>
              </TouchableWithoutFeedback>
            </AnimatedVerticalScroll>
          </View>
        }
        bottomContent={
          <View>
            <View style={styles.bottomButtons}>
              <CustomSpiritualButton
                label="Update"
                onPress={handleUpdate}
                color={Colors.buttonBackground}
                textColor={Colors.lightText}
              />
              <CustomSpiritualButton
                label="Cancel"
                onPress={() => navigation.goBack()}
                color={Colors.buttonBackground}
                textColor={Colors.lightText}
              />
            </View>
            {/* <Animated.Text
              style={{
                opacity: confirmationAnim,
                transform: [
                  {
                    translateY: confirmationAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-10, 0],
                    }),
                  },
                ],
                textAlign: "center",
                color: "#00ffcc",
                fontSize: 16,
                marginTop: 10,
              }}
            >
              ✅ Profile updated successfully!
            </Animated.Text> */}
          </View>
        }
      />
    </GradientBackground>
  );
};
