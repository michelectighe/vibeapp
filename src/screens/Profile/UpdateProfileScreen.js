import React, {
  useEffect,
  useRef,
  useCallback,
  useState,
  useContext,
} from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Switch,
  Animated,
  ScrollView,
} from "react-native";
import {
  getBiometricOptIn,
  saveBiometricOptIn,
  clearSavedCredentials,
  getFriendlyError,
  setUserMusicPref,
} from "@utils";
import * as keychain from "react-native-keychain";
import { useUserProfile, useAuth } from "@context";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@config/firebaseConfig";
import { styles, profileAssets } from "./StylesProfile";
import { globalStyles } from "@styles";
import {
  saveMusicPreference,
  getMusicPreference,
  playTrack,
  stopTrack,
} from "@services";

import {
  GradientBackground,
  ScrollContainer,
  CustomSpiritualButton,
} from "@components";
import { Colors, Fonts } from "@constants";
import { useAmbientControlForScreen } from "@hooks";

import { useFocusEffect } from "@react-navigation/native";

export const UpdateProfileScreen = ({ navigation }) => {
  useAmbientControlForScreen(true);
  const { user, authLoading, updateProfile, updatePassword, updateEmail } =
    useAuth();
  const { profile, setProfile } = useUserProfile();
  const [faceIDEnabled, setFaceIDEnabled] = useState(false);
  const [isMusicEnabled, setIsMusicEnabled] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setError] = useState("");
  const [passwordChange, setPasswordChange] = useState("");
  const [passwordChangeConfirm, setPasswordChangeConfirm] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [isAppleLogin, setIsAppleLogin] = useState(false);
  const [confirmationAnim] = useState(new Animated.Value(0));

  if (authLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "#fff" }}>Authenticating...</Text>
      </View>
    );
  }

  useEffect(() => {
    const checkProvider = () => {
      const isApple = user?.providerData?.some(
        (p) => p.providerId === "apple.com"
      );
      setIsAppleLogin(isApple);
    };

    checkProvider();
  }, []);

  useEffect(() => {
    getMusicPreference().then(setMusicEnabled);
    //console.log(musicEnabled);
  }, []);

  useEffect(() => {
    const loadBiometricStatus = async () => {
      const optedIn = await getBiometricOptIn();
      setFaceIDEnabled(!!optedIn);
    };

    loadBiometricStatus();
  }, []);

  useEffect(() => {
    const loadInitialData = async () => {
      const optedIn = await getBiometricOptIn();
      setFaceIDEnabled(!!optedIn);

      // check profile first
      if (profile?.name) {
        setName(profile.name);
      } else if (user?.displayName) {
        setName(user.displayName);
      }

      if (profile?.email) {
        setEmail(profile.email);
      } else if (user?.email) {
        setEmail(user.email);
      }
    };

    loadInitialData();
  }, [profile, user]);

  const goBack = () => {
    navigation.goBack();
  };

  const triggerConfirmation = () => {
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

  const getPasswordStrength = (pass) => {
    if (pass.length < 8) return "Too short";
    if (!/[A-Z]/.test(pass)) return "Add an uppercase letter";
    if (!/[0-9]/.test(pass)) return "Add a number";
    return "Strong password";
  };

  const confirmBeforeUpdate = async () => {
    try {
      const credentials = await keychain.getGenericPassword({
        authenticationPrompt: {
          title: "Confirm identity to update your profile",
        },
      });

      return credentials ? true : false;
    } catch (error) {
      //console.log("User canceled biometric auth.");
      return false;
    }
  };

  const handleToggleFaceID = async (value) => {
    setFaceIDEnabled(value);
  };

  const handleToggleMusic = async () => {
    const newValue = !musicEnabled;
    //console.log(newValue);
    setMusicEnabled(newValue);
    setUserMusicPref(newValue);
    await saveMusicPreference(newValue);
    newValue ? await playTrack() : await stopTrack();
  };

  const handleUpdate = async () => {
    setError("");
    //console.log("👤 user from context:", user.displayName);
    //console.log("user ID:", user.uid);
    // //console.log("📄 doc ref path:", ref.path);

    try {
      const updates = {};
      const ref = doc(db, "users", user.uid);

      // First check if the doc exists

      // 🔐 Validate password if entered
      if (passwordChange || passwordChangeConfirm) {
        if (passwordChange !== passwordChangeConfirm) {
          setError("Passwords do not match.");
          return;
        }
        if (passwordChange.length < 8) {
          setError("Password must be at least 8 characters long.");
          return;
        }
        if (!/[A-Z]/.test(passwordChange)) {
          setError("Password must include at least one uppercase letter.");
          return;
        }
        if (!/[0-9]/.test(passwordChange)) {
          setError("Password must include at least one number.");
          return;
        }
        const confirmed = await confirmBeforeUpdate();
        if (!confirmed) {
          setError("You must confirm your identity to save changes.");
          return;
        }

        await updatePassword(passwordChange);
        //console.log("🔐 Password updated");
      }

      // 📨 Update email if changed
      if (email && email !== user.email) {
        await updateEmail(email);
        updates.email = email;
      }

      //console.log("newname:", name);
      //console.log("oldname: ", user.displayName);
      // 👤 Update display name
      if (name && name !== user.displayName) {
        await updateProfile({ displayName: name });
        updates.name = name;
      }

      // 🧠 Face ID settings
      if (faceIDEnabled) {
        await saveBiometricOptIn(true);
      } else {
        await saveBiometricOptIn(false);
        await clearSavedCredentials();
      }

      triggerConfirmation();
      alert("✅ Profile updated successfully!");
      navigation.replace("Tabs", { screen: "Home" });
    } catch (err) {
      console.error("❌ Profile update failed:", err);
      const friendly = getFriendlyError(err.code);
      setError(friendly || "Failed to update profile.");
    }
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
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Update Profile</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("SignInScreen")}
        ></TouchableOpacity>
      </View>
      <ScrollView
        style={globalStyles.scrollView}
        contentContainerStyle={globalStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.bg}>
          <View style={[styles.formContainer, { padding: 15 }]}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#999"
              value={name}
              onChangeText={(text) => {
                setName(text);
                setIsDirty(true);
              }}
            />
            {!isAppleLogin && (
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#999"
                  autoComplete="email"
                  textContentType="emailAddress"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setIsDirty(true);
                  }}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />

                <TextInput
                  style={styles.input}
                  placeholder="New Password"
                  placeholderTextColor="#999"
                  secureTextEntry={!passwordVisible}
                  autoComplete="password"
                  autoCapitalize="none"
                  value={passwordChange}
                  onChangeText={(text) => {
                    setPasswordChange(text);
                    setIsDirty(true);
                  }}
                />
                <TextInput
                  style={[styles.input, { marginBottom: 5 }]}
                  placeholder="Confirm Password"
                  placeholderTextColor="#999"
                  secureTextEntry={!passwordVisible}
                  autoComplete="password"
                  autoCapitalize="none"
                  value={passwordChangeConfirm}
                  onChangeText={(text) => {
                    setPasswordChangeConfirm(text);
                    setIsDirty(true);
                  }}
                />
                <Text
                  style={{ color: "#ccc", marginLeft: 15, marginBottom: 8 }}
                >
                  {passwordChange ? getPasswordStrength(passwordChange) : ""}
                </Text>
                <Text
                  style={{
                    marginTop: 5,
                    textAlign: "center",
                    color: "white",
                    fontSize: 18,
                  }}
                >
                  {passwordError}
                </Text>
              </View>
            )}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 16,
              }}
            >
              <Text style={{ color: "#fff", marginRight: 10 }}>
                Enable Face ID
              </Text>
              <Switch
                value={faceIDEnabled}
                onValueChange={(value) => {
                  handleToggleFaceID(value);
                  setIsDirty(true);
                }}
                trackColor={{ false: "#B39DDB", true: "white" }}
                thumbColor={faceIDEnabled ? "#D1C4E9" : "#f3e5f5"}
              />
              <Text style={{ color: "#fff", marginRight: 10, marginLeft: 10 }}>
                Enable Music
              </Text>
              <Switch
                value={musicEnabled}
                onValueChange={(value) => {
                  handleToggleMusic(value);
                  setIsDirty(true);
                }}
                trackColor={{ false: "#B39DDB", true: "white" }}
                thumbColor={musicEnabled ? "#D1C4E9" : "#f3e5f5"}
              />
            </View>

            <CustomSpiritualButton
              label="Update"
              onPress={handleUpdate}
              color={Colors.buttonBackground}
              textColor={Colors.lightText}
            />
            <CustomSpiritualButton
              label="Cancel"
              onPress={goBack}
              color={Colors.buttonBackground}
              textColor={Colors.lightText}
            />

            <Animated.Text
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
            </Animated.Text>
          </View>
        </View>
      </ScrollView>
    </GradientBackground>
  );
};
