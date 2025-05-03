import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { auth } from "@config/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "@constants";

export const ProfileAvatar = ({ size = 32 }) => {
  const user = auth.currentUser;
  const profilePic = user?.photoURL;
  const name = user?.displayName || user?.email || "U";

  return profilePic ? (
    <FastImage
      source={{ uri: profilePic }}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        marginRight: 0,
        borderColor: Colors.buttonBackground,
        borderWidth: 2,
      }}
    />
  ) : (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        justifyContent: "center",
        alignItems: "center",
        borderColor: Colors.buttonBackground,
        borderWidth: 2,
      }}
    >
      <Text style={{ color: "#fff", fontWeight: "bold" }}>
        {name.charAt(0).toUpperCase()}
      </Text>
    </View>
  );
};
