// metro.config.js
const { getDefaultConfig } = require("@expo/metro-config");

const config = getDefaultConfig(__dirname);
// Correct assetExts settings
config.resolver.assetExts = [
  ...config.resolver.assetExts.filter((ext) => ext !== "tflite"),
  "cjs",
  "bin",
  "tflite",
];

// Add transformer.assetPlugins to enable base64 support for images
config.transformer = {
  ...config.transformer,
  assetPlugins: ["expo-asset/tools/hashAssetFiles"],
};

// Required for compatibility with RN 0.76+
config.server = {
  ...config.server,
  // experimentalImportSupport: true,
};
module.exports = config;
