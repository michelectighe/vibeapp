// utils/runOnJSRefCheck.js
import { Worklets } from "react-native-worklets-core";

export const createRefChecker = () =>
  Worklets.createRunOnJS((refValue) => !!refValue);
