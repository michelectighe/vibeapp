import ReactNativeBiometrics from "react-native-biometrics";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Keychain from "react-native-keychain";

export const isBiometricAvailable = async () => {
  const { available } = await ReactNativeBiometrics.isSensorAvailable();
  return available;
};

export const saveBiometricOptIn = async (enabled) => {
  await AsyncStorage.setItem("useBiometrics", JSON.stringify(enabled));
};

export const getBiometricOptIn = async () => {
  const value = await AsyncStorage.getItem("useBiometrics");
  return JSON.parse(value);
};

export const saveCredentials = async (email, password) => {
  await Keychain.setGenericPassword(email, password, {
    accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET,
    accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
    authenticationPrompt: {
      title: "Authenticate to store credentials",
    },
  });
};

export const getSavedCredentials = async () => {
  const credentials = await Keychain.getGenericPassword({
    accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET,
    authenticationPrompt: {
      title: "Authenticate with Face ID",
    },
  });

  if (credentials) {
    return {
      email: credentials.username,
      password: credentials.password,
    };
  } else {
    return { email: null, password: null };
  }
};

export const clearSavedCredentials = async () => {
  await Keychain.resetGenericPassword();
};
