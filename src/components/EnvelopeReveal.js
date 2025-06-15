import React, { useRef, useState , useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from "react-native";
import Svg, { Polygon, Rect } from "react-native-svg";
import * as Haptics from "expo-haptics";
import { affirmations } from "@/data";
import { Colors } from "@/constants";
import { hexToRgba } from "@/utils";

export const EnvelopeReveal = () => {
  const [open, setOpen] = useState(false);
  const paperAnim = useRef(new Animated.Value(0)).current;
const stampScale = useRef(new Animated.Value(1)).current;
const stampOpacity = useRef(new Animated.Value(1)).current;
const [currentAffirmation, setCurrentAffirmation] = useState("");

const getRandomAffirmation = () => {
  const index = Math.floor(Math.random() * affirmations.length);
  return affirmations[index];
};

const toggleEnvelope = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

  if (!open) {
    const newAffirmation = getRandomAffirmation();
    setCurrentAffirmation(newAffirmation);
  }

  Animated.timing(paperAnim, {
    toValue: open ? 0 : 1,
    duration: 1200,
    easing: Easing.out(Easing.exp),
    useNativeDriver: true,
  }).start();

  setOpen(!open);
};

  const paperTranslate = paperAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, -195],
  });

  const paperOpacity = paperAnim;
return (
  <View style={styles.container}>
    <TouchableOpacity onPress={toggleEnvelope}>
      <View style={styles.envelopeWrapper}>
        {/* Envelope body */}
        <Svg width={200} height={120}>
          <Rect x="0" y="0" width="200" height="120" fill="#ddd" />
        </Svg>

        {/* Flaps */}
        {!open && (
          <Svg width={200} height={100} style={styles.closedFlap}>
            <Polygon points="0,1 100,90 200,1" fill={hexToRgba(Colors.gradient2, 0.2)} />
          </Svg>
        )}
        {!open && (
          <View style={styles.stampWrapper}>
            <View style={styles.stamp}>
              <Text style={styles.stampLetter}>V</Text>
            </View>
            <View style={styles.messageWrapper}>
            <Text style={styles.openMessage}>Open your daily affirmation</Text>
            </View>
          </View>
        )}

        {open && (
          <>
            <Svg width={200} height={60} style={styles.openFlap}>
              <Polygon points="0,60 100,0 200,60" fill="#ccc" />
            </Svg>
            <Svg width={200} height={60} style={styles.closedFlap}>
              <Polygon points="0,0 100,80 200,0" fill="#999" />
            </Svg>
          </>
        )}
        {/* Inner lining fold to mask top of paper */}
        {/* {open && (
          <Svg width={200} height={60} style={styles.liningFlap}>
            <Polygon points="0,0 100,60 200,0" fill="#bbb" />
          </Svg>
        )} */}

        {/* Paper (now rendered after flap and layered above) */}
        <Animated.View
          style={[
            styles.paper,
            {
              transform: [{ translateY: paperTranslate }],
              opacity: paperOpacity,
            },
          ]}
        >
          <Text style={styles.paperText}>{currentAffirmation}</Text>
        </Animated.View>
      </View>
    </TouchableOpacity>
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 100,
  },
  envelopeWrapper: {
    width: 200,
    height: 120,
    position: "relative",
    alignItems: "center",
    justifyContent: "flex-end",
    zIndex: 99,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  closedFlap: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
  },
  openFlap: {
    position: "absolute",
    top: -60, // adjust as needed for how "open" you want it
    left: 0,
    zIndex: 10,
  },
  paper: {
    position: "absolute",
    width: "80%",
    bottom: -90,
    height: 110,
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    zIndex: 20, // 💥 ensures it's on top
  },
  liningFlap: {
    position: "absolute",
    top: 0, // directly on top of envelope body
    left: 0,
    zIndex: 25, // above the paper, below the outer flap
  },
  messageWrapper: {
    position: "absolute",
    top: 55, // adjust as needed
    left: -70, // center of 200 width
  },
  openMessage: {
    width: "100%",
    textAlign: "center",
  },
  paperText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  stampWrapper: {
    position: "absolute",
    top: 45, // adjust as needed
    left: 80, // center of 200 width
    zIndex: 30,
  },

  stamp: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gradient1, // deep wax red (can try #8B0000 or gold too)
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },

  stampLetter: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
    fontFamily: "Georgia", // gives it that elegant serif look
  },
});
