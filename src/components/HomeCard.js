import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import FastImage from "react-native-fast-image";

export const HomeCard = ({
  title,
  subtitle,
  icon,
  onPress,
  image,
  textColor,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardWrapper}>
      {image && (
        <View style={styles.card}>
          <FastImage
            style={StyleSheet.absoluteFill}
            source={image}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={styles.overlay}>
            {/* <View style={styles.iconContainer}>
              <Icon name={icon} size={30} color="#FFF" />
            </View> */}
            <Text style={[styles.title, { color: textColor }]}>{title}</Text>
            <Text style={[styles.subtitle, { color: textColor }]}>
              {subtitle}
            </Text>
          </View>
        </View>
      )}
      {!image && (
        <View style={styles.overlay}>
          {/* <View style={styles.iconContainer}>
            <Icon name={icon} size={30} color="#FFF" />
          </View> */}
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    width: 350,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  card: {
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },

  backgroundImage: {
    borderRadius: 12,
  },
  overlay: {
    position: "absolute",
    bottom: 5,
    left: 10,
    backgroundColor: "transparent", // "rgba(0, 0, 0, 0.4)", // optional: for better text readability
    padding: 12,
    borderRadius: 12,
  },
  iconContainer: {
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
});

