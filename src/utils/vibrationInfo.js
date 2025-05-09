import { vibrationLevels } from "@data";

export const getVibrationInfo = (score) => {
  if (typeof score !== "number" || isNaN(score)) return null;
  return (
    vibrationLevels.find((level) => score >= level.minScore) ??
    vibrationLevels[vibrationLevels.length - 1]
  );
};
