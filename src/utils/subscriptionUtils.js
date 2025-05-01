import AsyncStorage from "@react-native-async-storage/async-storage";

export const setSubscriptionStatus = async (isSubscribed) => {
  try {
    await AsyncStorage.setItem("isSubscribed", isSubscribed ? "true" : "false");
  } catch (error) {
    console.error("Error saving subscription status:", error);
  }
};

export const getSubscriptionStatus = async () => {
  try {
    //console.log('in here');
    const status = await AsyncStorage.getItem("isSubscribed");
    return status === "true"; // Default to false if null
  } catch (error) {
    console.error("Error retrieving subscription status:", error);
    return false; // Default to false if an error occurs
  }
};
