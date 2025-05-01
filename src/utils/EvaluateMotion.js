export function evaluateMotion({ avgMagnitude }) {
  let motionScore = 0;
  let motionLabel = "";
  if (avgMagnitude <= 1.0) {
    motionScore = 100;
    motionLabel = "grounded & still";
  } else if (avgMagnitude <= 1.5) {
    motionScore = 80;
    motionLabel = "subtle flow";
  } else if (avgMagnitude <= 2.0) {
    motionScore = 60;
    motionLabel = "restless energy";
  } else if (avgMagnitude <= 2.5) {
    motionScore = 40;
    motionLabel = "ctive movement";
  } else {
    motionScore = 20;
    motionLabel = "unsettled waves";
  }

  return {
    value: { avgMagnitude },
    score: motionScore,
    label: motionLabel,
  };
}
