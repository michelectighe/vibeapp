import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import Purchases from "react-native-purchases";

import { setSubscriptionStatus } from "@utils";
import { styles, profileAssets } from "./StylesProfile";
import { ScrollContainer, GradientBackground } from "@components";
import { Colors, Fonts } from "@constants";
import { useAmbientControlForScreen } from "@hooks";

export const SubscriptionScreen = ({ navigation, route }) => {
  useAmbientControlForScreen(true);
  const { themeColors, theme } = useContext(ThemeContext);
  const { returnTo } = route.params || {};
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const fetchPackages = async () => {
    //   try {
    //     const offerings = await Purchases.getOfferings();
    //     if (offerings.current) {
    //       setPackages(offerings.current.availablePackages);
    //     }
    //   } catch (error) {
    //     console.error("Error fetching subscription packages:", error);
    //   }
    //   setLoading(false);
    // };
    // fetchPackages();
  }, []);

  const handleSubscribe = async (selectedPackage) => {
    try {
      const purchase = await Purchases.purchasePackage(selectedPackage);
      if (purchase.customerInfo.activeSubscriptions.length > 0) {
        await setSubscriptionStatus(true);
        alert("Subscription Successful!");
        navigation.navigate(returnTo || "Home");
      }
    } catch (error) {
      console.error("Purchase failed:", error);
      alert("Purchase failed. Please try again.");
    }
  };

  return (
    // <ImageBackground
    //   source={profileAssets.background}
    //   style={styles.bg}
    //   resizeMode="cover"
    // >
    <GradientBackground
      colors={[Colors.gradient1, Colors.gradient2, Colors.gradient1]}
    >
      <ScrollView
        style={globalStyles.scrollView}
        contentContainerStyle={globalStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Go Premium</Text>

        <View style={styles.featuresBox}>
          <Text style={styles.feature}>
            🔓 Unlock All Features for $4.99/month
          </Text>
          <Text style={styles.feature}>
            ✔ Calculate your vibrational frequency in real time and elevate your
            energy
          </Text>
          <Text style={styles.feature}>
            ✔ Reveal your chakra scores for deeper self-awareness and balance
          </Text>
          <Text style={styles.feature}>
            ✔ Curated meditations and spiritual guidance to raise your frequency
          </Text>
          <Text style={styles.feature}>
            ✔ Guided journaling for reflection, manifestation, and inner growth
          </Text>
          <Text style={styles.feature}>
            ✔ Vibe Match to discover your energetic compatibility with others
            through vibrational frequency alignment
          </Text>
          <Text style={styles.feature}>
            ✔ Meditation location tool to find sacred spaces for deeper
            connection and healing{" "}
          </Text>
          <Text style={styles.feature}>
            ✔ A personalized selection of healing tools, including meditation,
            sound healing, and customized spiritual practices
          </Text>
          <Text style={styles.feature}>
            ✔ Curated meditations and spiritual guidance to raise your frequency
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          packages.map((pkg) => (
            <TouchableOpacity
              key={pkg.identifier}
              style={styles.subscribeButton}
              onPress={() => handleSubscribe(pkg)}
            >
              <Text style={styles.subscribeText}>
                Subscribe for {pkg.product.priceString}
              </Text>
            </TouchableOpacity>
          ))
        )}

        <TouchableOpacity
          onPress={() => navigation.navigate("VibeKeyHome")}
          style={styles.cancelButton}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </GradientBackground>
  );
};
