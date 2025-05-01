import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


export const COLORS = {
  // background: "#0E0B16", // Deep Mystic Purple
  // card: "#4A6572", // Dark Indigo
  // accent: "#FFD700", // Golden Yellow (for highlights)
  // secondaryAccent: "#6A0572", // Mystic Violet (for energy effects)
  // highVibe: "#00FFA3", // Aqua Green (Life Force Energy)
  // mediumVibe: "#FFC300", // Golden Orange (Energy Transformation)
  // lowVibe: "#FF3E3E", // Deep Red (Grounding Alerts)
  // text: "#F8F9FA", // Off-white for clarity
  // textSecondary: "#D3D3D3", // Light gray for soft readability
  // chakraGlow: "#6B4EFF", // Etheric Blue (Subtle Energy Glow)
  // chartBackgroundFrom: '#3A5360',
  // chartBackgroundTo: '#2E3B55',
  // softYellow: '#F2D96B',
  // softRed: '#EC7373',
  // softGreen: '#93D3AB',
  // Background: soft teal gradient
  chartBackgroundFrom: "#3A5360", // top of gradient (teal‐gray)
  chartBackgroundTo: "#2E3B55", // bottom of gradient (slightly deeper teal‐gray)

  // Card or overlay background
  card: "#4A6572", // A dark, desaturated teal/indigo

  // Text colors
  text: "#F8F9FA",        // Off‐white (primary text)
  textSecondary: "#D3D3D3", // Light gray for subtler text

  // Slider colors (feelings)
  happySlider: "#F2D96B", // Soft yellow
  stressedSlider: "#EC7373", // Soft red
  calmSlider: "#93D3AB", // Soft green‐teal

  // Optional accent (for buttons, highlights, etc.)
  accent: "#118AB2", // Deeper teal that stands out

};

export const globalStyles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent', // Transparent background
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 0,
    margin: 0,
  },
  cardWrapper: {
    alignItems: 'center',
    paddingTop: 15,
  },

  mainTitle: {
    fontSize: 44,
    fontFamily: 'AppTitleFont',
    color: COLORS.text,
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 50,
  },

  mainSubtitle: {
    fontSize: 18,
    fontFamily: 'AppFont',
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 10,
    //   fontStyle: 'italic',
    width: '80%',
  },
  title: {
    fontSize: 44,
    fontFamily: 'AppTitleFont',
    color: COLORS.text,
    marginBottom: 40,
    textAlign: 'center',
    marginTop: 10,
  },

  subtitle: {
    fontSize: 12,
    fontFamily: 'AppFont',
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 40,
    //   fontStyle: 'italic',
    width: '80%',
  },

  footer: {
    //  top: 50, //bottom: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  grid: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '35%',
  },
  card: {
    width: '65%',
    aspectRatio: 1,
    backgroundColor: '#4A6572',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50, // Softer rounded corners
    shadowColor: '#00FFA3', // Glowing effect
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 10,
  },
  cardText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'AppFont',
  },
  button: {
    width: '25%',
    aspectRatio: 1,
    backgroundColor: '#4A6572',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50, // Softer rounded corners
    shadowColor: '#00FFA3', // Glowing effect
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 10,
  },
  buttonText: {
    fontFamily: 'AppFont',
    color: COLORS.text, // Bright white for contrast
    fontSize: 12,
    textAlign: 'center',
  },
  recordingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  recordingDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#FF3E3E', // Vibrant red for recording
    marginRight: 8,
  },
  recordingText: {
    fontSize: 16,
    color: '#FF3E3E',
    fontWeight: 'bold',
  },
  cameraContainer: {
    width: '50%',
    height: 150,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 2,
    //borderColor: '#FFD700', // Gold glow for elegance
    alignSelf: 'center',
    shadowColor: '#FFD700',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  camera: {
    flex: 1,
  },
  countdownText: {
    fontFamily: 'AppFont',
    color: COLORS.text, // Bright white for contrast
    fontSize: 18,
    textAlign: 'center',
  },
  instructions: {
    fontSize: 20,
    color: '#D3D3D3', // Light gray for readability
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 15,
    lineHeight: 22,
    opacity: 0.9,
    fontFamily: 'AppFont'
  },
  infoText: {
    fontSize: 16,
    color: '#D3D3D3',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 15,
    lineHeight: 22,
    opacity: 0.9,
  },
  resultText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 15,
    lineHeight: 22,
    opacity: 0.9,
  },
  graphContainer: {
    backgroundColor: 'transparent', // Transparent background
    width: '50%',
    height: '50%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginRight: 20,
    paddingRight: 50,
    borderWidth: 0,
    borderColor: COLORS.background,
    shadowColor: COLORS.background,
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 5,
  },
  chart: {
    borderRadius: 16,
  },
  graph: {
    flex: 1,
  },
  slider: {
    width: 300,
    height: 40,
  },

});
