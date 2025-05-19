import React, { useRef, useCallback } from "react";
import { Animated, Text, View, ScrollView } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useUserProfile } from "@context";
import { toolsCards } from "@data";
import { GradientBackground, HomeCard, SectionLayout } from "@components";
import { Colors } from "@constants";
import { useAmbientControlForScreen } from "@hooks";
import { styles } from "./ToolsMainScreen.styles";
import { globalStyles } from "@styles";

export const ToolsMainScreen = () => {
  useAmbientControlForScreen(true);
  const positionY = useRef(new Animated.Value(-100)).current;
  const navigation = useNavigation();
  const { loading } = useUserProfile();

  useFocusEffect(
    useCallback(() => {
      positionY.setValue(-30);
      Animated.timing(positionY, {
        toValue: 45,
        duration: 1500,
        useNativeDriver: true,
      }).start();
    }, []), // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <GradientBackground colors={[Colors.gradient1Tools, Colors.gradient2Tools, Colors.gradient1Tools]}>
          <SectionLayout
            topFlex={1}
            middleFlex={0}
            bottomFlex={0}
            safe={false}
            topContent={
              <>
                <View style={styles.titleWrapper}>
                  <Text style={styles.title}>Healing Journey</Text>
                </View>

                <ScrollView
                  style={globalStyles.scrollView}
                  contentContainerStyle={globalStyles.scrollContent}
                  showsVerticalScrollIndicator={false}
                >
                  {toolsCards.map((card) => (
                    <HomeCard
                      key={card.id}
                      title={card.title}
                      subtitle={card.subtitle}
                      icon={card.icon}
                      image={card.image}
                      textColor={card.textColor}
                      onPress={() => navigation.navigate(card.screen)}
                    />
                  ))}
                </ScrollView>
              </>
            }
          />
        </GradientBackground>
      )}
    </>
  );
};
