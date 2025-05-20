import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  BreathingCircle,
  GradientBackground,
  SectionLayout,
  CloseX,
} from "@components";
import { Colors } from "@/constants";
import { useAmbientControlForScreen } from "@hooks";
import { useRoute, useNavigation } from "@react-navigation/native";
import { styles } from "./BreathingModalScreen.styles"; 

export const BreathingModalScreen = () => {
  useAmbientControlForScreen(true);
  const route = useRoute();
  const navigation = useNavigation();

  const { pattern } = route.params;

  return (
    <GradientBackground colors={[Colors.white, Colors.white]} logo={false}>
      <CloseX xColor={Colors.textDark} onPress={() => navigation.goBack()} />
      <SectionLayout
        topFlex={6}
        middleFlex={3}
        bottomFlex={1}
        topContent={
          <View style={styles.middle}>
            <BreathingCircle pattern={pattern} key={pattern.id} />
          </View>
        }
        middleContent={<></>} // no selector
        bottomContent={
          <View style={{ alignItems: "center" }}>
            <Text style={styles.title}>{pattern.name}</Text>
            <Text style={styles.description}>{pattern.description}</Text>
                        <Text style={styles.timing}>
                          {pattern.inhale}-{pattern.hold1}-{pattern.exhale}
                          {pattern.hold2 ? `-${pattern.hold2}` : ""}
                        </Text>
          </View>
        }
      />
    </GradientBackground>
  );
};
