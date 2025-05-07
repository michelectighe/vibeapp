import { createContext, useState, useEffect } from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ThemeWrapper from "@components/ThemeWrapper";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemTheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState("dark"); // Default to dark until loaded

  // Load stored theme from AsyncStorage
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem("appTheme");
        if (storedTheme) {
          //console.log("🌟 Loaded stored theme:", storedTheme);
          setTheme(storedTheme);
        } else {
          //console.log("🌙 Using system theme:", systemTheme);
          setTheme(systemTheme || "dark");
        }
      } catch (error) {
        console.error("❌ Error loading theme:", error);
      }
    };
    loadTheme();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Save theme when it changes
  useEffect(() => {
    const saveTheme = async () => {
      try {
        await AsyncStorage.setItem("appTheme", theme);
        //console.log("💾 Theme saved:", theme);
      } catch (error) {
        console.error("❌ Error saving theme:", error);
      }
    };
    saveTheme();
  }, [theme]);

  // Theme Colors
  const themeColors = {
    light: {
      "--screenBg": "#ffffff",
      "--cardBg": "#f5f5f5",
      "--buttonBg": "#bab8b4",
      "--buttonText": "#ffffff",
      "--textPrimary": "#000000",
      "--textSecondary": "#4f4f4f",
      "--textStandout": "#f2ebeb",
    },
    dark: {
      "--screenBg": "#ffffff",
      "--cardBg": "#f5f5f5",
      "--buttonBg": "#bab8b4",
      "--buttonText": "#ffffff",
      "--textPrimary": "#000000",
      "--textSecondary": "#4f4f4f",
      "--textStandout": "#f2ebeb",
    },
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeColors }}>
      <ThemeWrapper>{children}</ThemeWrapper>
    </ThemeContext.Provider>
  );
};
