import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@config/firebaseConfig";
import { styles } from "./ForgotPasswordScreen.style";
import { globalStyles } from "@styles";
import { GradientBackground, CustomSpiritualButton, SectionLayout } from "@components";
import { getFriendlyError } from "@utils";
import { Colors, Fonts } from "@constants";
import { useAmbientControlForScreen } from "@hooks";
import { SCREEN_WIDTH } from "@/utils";

export const ForgotPasswordScreen = ({ navigation }) => {
  useAmbientControlForScreen(true);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async () => {
    setError("");
    setMessage("");
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage(" Check your inbox for a password reset email.");
    } catch (err) {
      const friendly = getFriendlyError(err.code);
      setError(friendly || "There was a problem with the entered email address.");
      //  setError(err.message);
    }
  };

  return (
    <GradientBackground colors={[Colors.gradient1, Colors.gradient2, Colors.gradient3]}>
      <SectionLayout
        topFlex={1}
        middleFlex={2}
        bottomFlex={1}
        topContent={
          <View style={globalStyles.titleWrapper}>
            <Text style={globalStyles.title}>Reset Your Password</Text>
          </View>
        }
        middleContent={
          <>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <KeyboardAvoidingView
                style={{ flex: 1, width: SCREEN_WIDTH * 0.9 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={80} // tweak if needed for your layout
              >
                <View style={styles.middle}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor={Colors.mediumGray}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />

                  {error ? <Text style={styles.error}>{error}</Text> : null}
                  {message ? <Text style={styles.success}>{message}</Text> : null}

                  <CustomSpiritualButton
                    label="Send Reset Email"
                    onPress={handleReset}
                    color={Colors.buttonBackground}
                    textColor={Colors.textLight}
                  />
                  <TouchableOpacity style={globalStyles.link} onPress={() => navigation.goBack()}>
                    <Text style={globalStyles.link}>← Back to Sign In</Text>
                  </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </>
        }
      />
    </GradientBackground>
    // </ImageBackground>
  );
};
