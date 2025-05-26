// zIndexStore.js
import { makeMutable } from "react-native-reanimated";

// Global mutable zIndex counter shared across all components
export const globalZIndexCounter = makeMutable(1);
