import React from "react";
import { View, TextInput, StyleSheet, Dimensions } from "react-native";
import { Fonts } from "@/constants";

const FONT_SIZE = 16;
const LINE_HEIGHT = 28;
const NUM_LINES = Math.floor(200 / LINE_HEIGHT); // You can also make this dynamic

export const LinedTextInput = ({
  value,
  onChangeText,
  placeholder,
  placeholderTextColor,
  style,
  ...rest
}) => {
  return (
    <View style={[styles.container, style]}>
      {/* Draw lines */}
      {Array.from({ length: NUM_LINES }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.line,
            {
              top: i * LINE_HEIGHT + LINE_HEIGHT - 1, // put line below the text
            },
          ]}
        />
      ))}

      {/* Text input over top */}
      <TextInput
        multiline
        style={[
          StyleSheet.absoluteFill,
          styles.textInput,
          {
            fontSize: FONT_SIZE,
            lineHeight: LINE_HEIGHT,
          },
        ]}
        textAlignVertical="top"
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={value}
        onChangeText={onChangeText}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    position: "relative",
    backgroundColor: "transparent",
  },
  line: {
    position: "absolute",
    left: 0,
    right: 0,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  textInput: {
    paddingHorizontal: 12,
    paddingTop: 12,
    color: "#000",
    fontFamily: Fonts.journal,
  },
});

// import React, { useRef, useState } from "react";
// import {
//   View,
//   TextInput,
//   ScrollView,
//   StyleSheet,
//   Dimensions,
//   NativeSyntheticEvent,
//   TextInputContentSizeChangeEventData,
// } from "react-native";
// import { Fonts } from "@/constants";

// const FONT_SIZE = 16;
// const LINE_HEIGHT = 28;
// const PADDING = 12;

// export const LinedTextInput = ({
//   value,
//   onChangeText,
//   placeholder,
//   placeholderTextColor,
//   style,
//   ...rest
// }) => {
//   const [contentHeight, setContentHeight] = useState(200);

//   // Number of lines needed based on content height
//   const numLines = Math.ceil(contentHeight / LINE_HEIGHT);

//   const handleContentSizeChange = (
//     event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>,
//   ) => {
//     const height = event.nativeEvent.contentSize.height;
//     setContentHeight(height + LINE_HEIGHT); // add buffer
//   };

//   return (
//     <ScrollView style={[styles.container, style]}>
//       <View style={{ height: contentHeight }}>
//         {/* Lines */}
//         {Array.from({ length: numLines }).map((_, i) => (
//           <View
//             key={i}
//             style={{
//               position: "absolute",
//               top: i * LINE_HEIGHT + LINE_HEIGHT - 1,
//               left: 0,
//               right: 0,
//               borderBottomWidth: 1,
//               borderColor: "#ccc",
//             }}
//           />
//         ))}

//         {/* Text Input */}
//         <TextInput
//           multiline
//           onContentSizeChange={handleContentSizeChange}
//           style={[
//             StyleSheet.absoluteFill,
//             {
//               fontSize: FONT_SIZE,
//               lineHeight: LINE_HEIGHT,
//               paddingHorizontal: PADDING,
//               paddingTop: PADDING,
//               color: "#000",
//               fontFamily: Fonts.journal,
//             },
//           ]}
//           textAlignVertical="top"
//           placeholder={placeholder}
//           placeholderTextColor={placeholderTextColor}
//           value={value}
//           onChangeText={onChangeText}
//           {...rest}
//         />
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     height: 200, // fixed height scroll area
//   },
// });
