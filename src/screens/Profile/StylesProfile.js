import { StyleSheet } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/utils";
import { scaledStyle } from "@/utils";
import { Colors, Fonts } from "@/constants";
import profileBg from "@assets/images/backgroundProfile.jpg";
import btnImage from "@assets/images/chiclet.webp";

export const profileAssets = {
  background: profileBg,
  buttonImage: btnImage,
};

export const buttonImage = btnImage;

const rawStyles = {
  backLink: {
    marginTop: 20,
    color: "white",
    fontSize: 16,
  },
  bg: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "stretch",
  },
  button: {
    padding: 12,
    borderRadius: 15,
    backgroundColor: "#6c63ff",
    width: "100%",
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  cancelButton: {
    marginTop: 10,
  },

  cancelText: {
    fontSize: 16,
    color: "white",
    textDecorationLine: "underline",
    fontFamily: "AppFont",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    width: "85%",
    padding: 16,
    borderRadius: 20,
    marginBottom: 20,
    elevation: 4, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardText: {
    fontSize: 18,
    color: "#333",
  },
  container: {
    flex: 1,
    top: "5%",
    alignItems: "stretch",
    paddingHorizontal: 0,
    marginBottom: "10%", // adjust based on usage
  },

  error: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
  },
  eyeIcon: {
    padding: 8,
  },

  feature: {
    fontSize: 16,
    fontFamily: "AppFont",
    marginBottom: 10,
    color: "#333",
  },
  featuresBox: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
  },
  forgot: {
    color: "white",
    marginTop: 0,
    fontSize: 14,
    marginBottom: 20,
  },
  formContainer: {
    width: "100%",
    alignItems: "stretch",
  },
  goalsContainer: {
    alignItems: "center",
    alignContent: "stretch",
    padding: 40,
    width: "100%",
  },
  heading: {
    color: "white",
    fontSize: 36,
    textAlign: "center",
    marginBottom: 20,
    //  marginTop: 150,
  },
  headingContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  input: {
    width: "100%",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 15,
    marginBottom: 15,
    fontSize: 16,
    //   textAlignVertical: "top",
  },
  inputGoals: {
    width: "100%",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 15,
    marginBottom: 15,
    fontSize: 16,
    textAlignVertical: "top",
    height: "25%",
  },
  link: {
    color: "white",
    marginTop: 10,
    fontSize: 16,
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,
    paddingHorizontal: 12,
    marginBottom: 15,
    width: "100%",
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    color: "#000",
  },
  signInText: {
    color: "white",
    marginBottom: 20,
  },
  subscribeButton: {
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#46c9fe", // Your accent color?
  },
  subscribeText: {
    fontSize: 18,
    fontFamily: "AppFont",
    color: "#46c9fe",
  },
  success: {
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    color: "white",
    width: "100%",
    padding: 0,
    fontSize: 18,
    marginBottom: 5,
    textAlign: "center",
  },
  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    // marginTop: 10,
    //  marginBottom: 15,
    textAlign: "center",
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
