import Purchases from "react-native-purchases";
import { Platform } from "react-native";

const REVENUECAT_API_KEY = Platform.select({
  ios: "appl_XwtnTCtapUFWuqbJzwsJllWWxcj",
  android: "your_android_revenuecat_api_key",
});

export const initializeRevenueCat = () => {
  Purchases.configure({ apiKey: REVENUECAT_API_KEY });
};
