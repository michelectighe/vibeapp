// SubscriptionScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView } from "react-native";
import Purchases from "react-native-purchases";

import { setSubscriptionStatus } from "@utils";
import { styles } from "./SubscriptionScreen.style";
import { globalStyles } from "@styles";
import { GradientBackground, SectionLayoutNotSafe } from "@components";
import { Colors } from "@constants";
import { useAmbientControlForScreen } from "@hooks";
import { subscriptionFeatures } from "@data";

export const SubscriptionScreen = ({ navigation, route }) => {
  useAmbientControlForScreen(true);

  const { returnTo } = route.params || {};
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Uncomment when you want to fetch from RevenueCat
    const fetchPackages = async () => {
      try {
        const offerings = await Purchases.getOfferings();
        if (offerings.current) {
          setPackages(offerings.current.availablePackages);
        }
      } catch (error) {
        console.error("Error fetching subscription packages:", error);
      }
      setLoading(false);
    };
    fetchPackages();
  }, []);

  const handleSubscribe = async (selectedPackage) => {
    try {
      const purchase = await Purchases.purchasePackage(selectedPackage);
      if (purchase.customerInfo.activeSubscriptions.length > 0) {
        await setSubscriptionStatus(true);
        alert("Subscription Successful!");
        navigation.navigate(returnTo || "Tabs", { screen: "Home" });
      }
    } catch (error) {
      console.error("Purchase failed:", error);
      alert("Purchase failed. Please try again.");
    }
  };

  return (
    <GradientBackground colors={[Colors.gradient1, Colors.gradient2, Colors.gradient1]}>
      <SectionLayoutNotSafe
        topFlex={1}
        middleFlex={0}
        bottomFlex={0}
        topContent={
          <>
            <View style={styles.titleWrapper}>
              <Text style={globalStyles.title}>Go Premium</Text>
            </View>

            <View style={styles.featuresBox}>
              <ScrollView
                style={globalStyles.featureScroll}
                contentContainerStyle={{ padding: 10 }}
                showsVerticalScrollIndicator={false}
              >
                {subscriptionFeatures.map((feature, index) => (
                  <Text key={index} style={styles.feature}>
                    {feature}
                  </Text>
                ))}
              </ScrollView>
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
                  <Text style={styles.subscribeText}>Subscribe for {pkg.product.priceString}</Text>
                </TouchableOpacity>
              ))
            )}

            <TouchableOpacity
              onPress={() => navigation.navigate("Home")}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </>
        }
      />
    </GradientBackground>
  );
};
