module.exports = {
  darkMode: "class", // Enables dark mode switching
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/screens/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        screenBg: "#FFFFFF",
        screenBgDark: "#121212",
        textPrimary: "var(--textPrimary)",
        textStandout: "var(--textStandout)",
        textSecondary: "var(--textSecondary)",
        buttonBg: "var(--buttonBg)",
        cardBg: "var(--cardBg)",
      },
    },
    plugins: [],
  },
};
