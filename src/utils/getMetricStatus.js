export const getMetricStatus = (value, [min, max]) => {
    if (value === null || value === undefined) {
      return { icon: "⚠️", label: "Data missing", style: styles.missing };
    }
  
    const range = max - min;
    const buffer = range * 0.15; // 15% suboptimal threshold on either end
  
    if (value < min || value > max) {
      return { icon: "❌", label: "Outside healthy range", style: styles.outOfRange };
    }
  
    if (value < min + buffer || value > max - buffer) {
      return { icon: "⚠️", label: "Slightly outside optimal", style: styles.suboptimal };
    }
  
    return { icon: "✅", label: "Within healthy range", style: styles.inRange };
  };
  