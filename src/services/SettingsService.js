import AsyncStorage from "@react-native-async-storage/async-storage";

const MUSIC_PREF_KEY = "backgroundMusicEnabled";

export const saveMusicPreference = async (isEnabled) => {
  try {
    await AsyncStorage.setItem(MUSIC_PREF_KEY, JSON.stringify(isEnabled));
  } catch (e) {
    console.error("Failed to save music preference", e);
  }
};

export const getMusicPreference = async () => {
  try {
    const value = await AsyncStorage.getItem(MUSIC_PREF_KEY);
    return value != null ? JSON.parse(value) : true; // default: enabled
  } catch (e) {
    console.error("Failed to load music preference", e);
    return true;
  }
};
