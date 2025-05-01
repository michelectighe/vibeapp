import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
//import FastImage from 'react-native-fast-image';
{/* <FastImage
  style={styles.cardImage}
  source={require('../assets/images/relax.jpg')}
  resizeMode={FastImage.resizeMode.cover}
/> */}
const HomeCard = ({ title, subtitle, icon, onPress, image }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardWrapper}>
      {image && (
        <ImageBackground
          source={image}
          style={styles.card}
          imageStyle={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.overlay}>
            <View style={styles.iconContainer}>
              <Icon name={icon} size={30} color="#FFF" />
            </View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
        </ImageBackground>
      )}
      {!image && (
        <View style={styles.overlay}>
          <View style={styles.iconContainer}>
            <Icon name={icon} size={30} color="#FFF" />
          </View>
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
    padding: 16,
    height: 200, // or whatever height you prefer
    justifyContent: "center",
  },
  backgroundImage: {
    borderRadius: 12,
  },
  overlay: {
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
    color: "#FFF",
  },
  subtitle: {
    fontSize: 14,
    color: "#FFF",
    marginTop: 4,
  },
});

export default HomeCard;
