import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { CardGradient } from "./CardGradient";
import { Colors } from "@/constants";
import { ProgressDots } from "./ProgressDots";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export const MirrorCarousel = ({ items = [], type = "prompt" }) => {
  const scrollRef = useRef();
      const [currentIndex, setCurrentIndex] = useState(0);
  
    const onScrollEnd = (event) => {
      const x = event.nativeEvent.contentOffset.x;
      const index = Math.round(x / SCREEN_WIDTH);
      setCurrentIndex(index % items.length); // optional loop logic
    };

  return (
    <>
      {/* <ProgressDots currentIndex={currentIndex} totalScreens={items.length} /> */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={onScrollEnd}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.track}
      >
        {items.map((item, i) => (
          <View key={i} style={styles.cardWrapper}>
            <CardGradient style={styles.card}>
              <Text style={styles.label}>
                {type === "prompt" ? "💬 Prompt for Reflection" : "🪞 Affirmation"}
              </Text>
              <Text style={styles.content}>{item}</Text>
            </CardGradient>
          </View>
        ))}
      </ScrollView>
      <ProgressDots currentIndex={currentIndex} totalScreens={items.length} />
    </>
  );
};

const styles = StyleSheet.create({
  track: {
 //   alignItems: "center",
  },
  cardWrapper: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    overflow: "hidden",
  },
  card: {
    width: SCREEN_WIDTH * 0.95,
    height: "60%",
    borderRadius: 16,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 14,
    color: Colors.buttonText,
    marginBottom: 8,
    textAlign: "center",
  },
  content: {
    fontSize: 18,
    fontWeight: "500",
    color: Colors.buttonText,
    textAlign: "center",
    paddingHorizontal: 10,
  },
});

// import React, { useState } from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { GestureDetector, Gesture } from "react-native-gesture-handler";
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
//   runOnJS,
// } from "react-native-reanimated";
// import { CardGradient } from "./CardGradient";
// import { Colors } from "@/constants";
// import { SCREEN_WIDTH, SCREEN_HEIGHT } from "@utils";

// export const MirrorCarousel = ({ items = [], type = "prompt" }) => {
//   const [index, setIndex] = useState(0);
//   const offsetX = useSharedValue(0);
//   const dragX = useSharedValue(0);

//   const updateIndex = (direction) => {
//     const newIndex = Math.max(0, Math.min(items.length - 1, index + direction));
//     if (newIndex !== index) {
//       setIndex(newIndex);
//       offsetX.value = withTiming(-newIndex * SCREEN_WIDTH * .95);
//     } else {
//       offsetX.value = withTiming(-index * SCREEN_WIDTH * 1);
//     }
//   };

//   const gesture = Gesture.Pan()
//     .onUpdate((e) => {
//       dragX.value = e.translationX;
//     })
//     .onEnd((e) => {
//       const direction = e.translationX > 0 ? -1 : 1;
//       let newIndex = index + direction;

//       // Clamp index within bounds
//       if (newIndex < 0 || newIndex >= items.length) {
//         newIndex = index; // don't move
//       }

//       runOnJS(setIndex)(newIndex);
//       offsetX.value = withTiming(-newIndex * SCREEN_WIDTH * 0.95);
//       dragX.value = 0;
//     });

//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       transform: [
//         {
//           translateX: offsetX.value + dragX.value,
//         },
//       ],
//     };
//   });

//   return (
//     <GestureDetector gesture={gesture}>
//       <Animated.View style={[styles.track, animatedStyle]}>
//         {items.map((item, i) => (
//           <View key={i} style={styles.cardWrapper}>
//             <CardGradient style={styles.card}>
//               <Text style={styles.label}>
//                 {type === "prompt" ? "💬 Prompt for Reflection" : "🪞 Affirmation"}
//               </Text>
//               <Text style={styles.content}>{item}</Text>
//             </CardGradient>
//           </View>
//         ))}
//       </Animated.View>
//     </GestureDetector>
//   );
// };

// const styles = StyleSheet.create({
//   track: {
//     flexDirection: "row",
//   },
//   cardWrapper: {
//     width: SCREEN_WIDTH * 0.95,
//     height: SCREEN_HEIGHT * 0.1,
//     paddingHorizontal: 10,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "red",
//   },
//   card: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 16,
//     alignItems: "center",
//     alignContent: "center",
//     justifyContent: "center",
//   },
//   label: {
//     fontSize: 14,
//     color: Colors.buttonText,
//     marginBottom: 8,
//     textAlign: "center",
//   },
//   content: {
//     fontSize: 18,
//     fontWeight: "500",
//     color: Colors.buttonText,
//     textAlign: "center",
//     paddingHorizontal: 10,
//   },
// });
