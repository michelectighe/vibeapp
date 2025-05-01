import React, { useState, useEffect } from "react";
import { Text } from "react-native";

const TypewriterText = ({ text, delay = 100, style }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      setDisplayedText(text.substring(0, currentIndex));
      currentIndex++;
      if (currentIndex > text.length) {
        clearInterval(intervalId);
      }
    }, delay);
    return () => clearInterval(intervalId);
  }, [text, delay]);

  return <Text style={style}>{displayedText}</Text>;
};

export default TypewriterText;
