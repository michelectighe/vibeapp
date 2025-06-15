// SelfCareScreen.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, ImageBackground } from "react-native";
import { styles } from "./SelfCareScreen.styles";
import selfCareData from "@assets/data/selfCareData.json"; // We'll make this too

export const SelfCareScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [carePlan, setCarePlan] = useState([]);
const imgSource = require("@assets/images/selfCare.png");
  const handleSelect = (item) => {
    if (!carePlan.includes(item)) {
      setCarePlan([...carePlan, item]);
    }
  };

  const renderOptions = () => {
    if (!selectedCategory) return null;

    return (
      <FlatList
        data={selfCareData[selectedCategory]}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.option} onPress={() => handleSelect(item)}>
            <Text style={styles.optionText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    );
  };

  return (
            <ImageBackground source={imgSource} resizeMode="cover" style={styles.imageBackground} >
    <View style = {styles.header}>
      <Text>Take a Moment for You</Text>
      <Text>Choose one or more actions for self care</Text>
 
    
      <View style={styles.buttonRow}>
        {["body", "mind", "spirit"].map((category) => (
          <TouchableOpacity
            key={category}
            style={[styles.categoryButton, selectedCategory === category && styles.activeCategory]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={styles.categoryText}>{category.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {renderOptions()}

      {carePlan.length > 0 && (
        <View style={styles.carePlanContainer}>
          <Text style={styles.carePlanTitle}>Your Care Plan:</Text>
          {carePlan.map((item, index) => (
            <Text key={index} style={styles.carePlanItem}>
              • {item}
            </Text>
          ))}
        </View>
      )}
    </View>
</ImageBackground>
  );
};
