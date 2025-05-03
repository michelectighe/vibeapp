// layout.js – scaling helpers for responsive design

/**
 * When to use each scaling method:
 *
 * 👉 scale(size):
 *    - Use for widths, heights, icon sizes, borderRadius
 *    - Ensures exact proportional scaling across screen sizes
 *    - Example: width: scale(120)
 *
 * 👉 moderateScale(size, factor = 0.5):
 *    - Use for fontSize, padding, margin, lineHeight
 *    - Softens the scaling so things don’t get too large
 *    - Example: fontSize: moderateScale(16)
 *
 * 👉 verticalScale(size):
 *    - Use for vertical-only values like height, top/bottom padding/margin
 *    - Rarely needed on its own — use when vertical spacing needs fine-tuning
 *
 * 👉 fontScale(size):
 *    - Optional: use to adjust for system font size settings
 *    - Usually used with text only if respecting user scaling is needed
 */

// utils/layout.js
import { Dimensions, PixelRatio } from "react-native";

const { width, height } = Dimensions.get("window");

const guidelineBaseWidth = 390;
const guidelineBaseHeight = 844;

export const scale = (size) => (width / guidelineBaseWidth) * size;
export const verticalScale = (size) => (height / guidelineBaseHeight) * size;
export const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;
export const fontScale = (size) => size * PixelRatio.getFontScale();

// Intelligent scaling
export const scaledStyle = (styles) =>
  Object.fromEntries(
    Object.entries(styles).map(([key, val]) => {
      if (typeof val !== "number") return [key, val];

      // Map properties to appropriate scaling method
      if (["width", "height", "borderRadius"].includes(key)) {
        return [key, scale(val)];
      } else if (key.startsWith("margin") || key.startsWith("padding")) {
        return [key, moderateScale(val)];
      } else if (key.toLowerCase().includes("font") || key === "lineHeight") {
        return [key, moderateScale(val)];
      } else {
        return [key, moderateScale(val)];
      }
    })
  );
