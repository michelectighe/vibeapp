export const hexToRgba = (hexOrArray, alpha = 0.6) => {
  const toRgba = (hex) => {
    const cleanHex = hex.replace("#", "");
    const bigint = parseInt(cleanHex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return Array.isArray(hexOrArray) ? hexOrArray.map(toRgba) : toRgba(hexOrArray);
};
