import React, { useEffect, useRef, useState, useContext } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Animated,
  StyleSheet,
  Dimensions,
  Easing,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
} from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@config/firebaseConfig";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { getFriendlyError } from "@utils";
import { styles, profileAssets } from "./StylesProfile";
import { globalStyles } from "@styles";
import { GradientBackground, ScrollContainer } from "@components";
import { Colors, Fonts } from "@constants";
import { useAmbientControlForScreen } from "@hooks";

export const SignUpScreen = ({ navigation }) => {
  useAmbientControlForScreen(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const handleSignUp = async () => {
    //console.log("handlesignup");
    setError("");
    try {
      if (password.length < 8) {
        setError("Password must be at least 8 characters long.");
        return;
      }

      if (!/[A-Z]/.test(password)) {
        setError("Password must include at least one uppercase letter.");
        return;
      }

      if (!/[0-9]/.test(password)) {
        setError("Password must include at least one number.");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      //console.log("afterUserCredential");
      const user = userCredential.user;
      await updateProfile(userCredential.user, {
        displayName: name,
      });
      // 2. Create Firestore user doc
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: user.email,
        createdAt: serverTimestamp(),
        goals: "", // add anything you want to customize later
      });

      //console.log("✅ User signed up:", name);
      navigation.replace("ProfileSetupScreen");

      //navigation.navigate("SignInScreen");
    } catch (err) {
      console.error(err);
      const friendly = getFriendlyError(err.code);
      setError(friendly);
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
      <ScrollView
        style={globalStyles.scrollView}
        contentContainerStyle={globalStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={80} // tweak if needed for your layout
          >
            <View style={globalStyles.container}>
              <View style={styles.headingContainer}>
                <Text style={styles.heading}>Create Account</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("SignInScreen")}
                >
                  <Text style={styles.signInText}>
                    Already have an account? Sign In
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.formContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  placeholderTextColor="#999"
                  value={name}
                  onChangeText={setName}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#999"
                  autoComplete="email"
                  textContentType="emailAddress"
                  value={email}
                  onChangeText={setEmail}
                />
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Password"
                    placeholderTextColor="#999"
                    autoComplete="password"
                    textContentType="password"
                    secureTextEntry={!passwordVisible}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setPasswordVisible(!passwordVisible)}
                    style={styles.eyeIcon}
                  >
                    <Text>{passwordVisible ? "🙈" : "👁️"}</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={{
                    padding: 3,
                    borderRadius: 15,
                    height: "12%",
                    borderColor: "white",
                    backgroundColor: "transparent",
                  }}
                  onPress={handleSignUp}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontSize: 18,
                    }}
                  >
                    Sign Up
                  </Text>
                  <Text
                    style={{
                      marginTop: 5,
                      textAlign: "center",
                      color: "white",
                      fontSize: 18,
                    }}
                  >
                    {error}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ScrollView>
    </GradientBackground>
  );
};
