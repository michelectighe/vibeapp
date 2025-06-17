// SelfCareScreen.styles.js
import { StyleSheet } from "react-native";
import { Colors, Fonts } from "@/constants";
import { SCREEN_WIDTH, SCREEN_HEIGHT, hexToRgba } from "@/utils";

export const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  header: {
    marginTop: 100,
  },
  title: {
    fontSize: 54,
    fontFamily: Fonts.italic,
    textAlign: "center",
    color: Colors.selfCareTitle,
    paddingHorizontal: 20,
  },
  subTitle: {
    marginTop: 40,
    fontSize: 16,
    fontFamily: Fonts.body,
    textAlign: "center",
    color: Colors.selfCare,

  },
  subtitleInline: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 18,
    paddingHorizontal: 16,
  },
  infoIcon: {
    fontSize: 16,
    color: "#F4E8CC", // or any accent you prefer
    marginLeft: -64,
    marginTop: 26,
  },

  infoModalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    maxHeight: "80%",
  },
  modalText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#333",
    marginTop: 8,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
  },
  categoryButton: {
    width: SCREEN_WIDTH * 0.25,
    height: SCREEN_HEIGHT * 0.07,
    backgroundColor: Colors.selfCareButton,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 16,
    // borderWidth: 1,
    borderColor: Colors.accent,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activeCategory: {
    backgroundColor: Colors.accent,
  },
  categoryText: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.selfCareTitle,
    textAlign: "center",
  },
  option: {
    backgroundColor: Colors.buttonBackground,
    marginVertical: 6,
    marginHorizontal: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  optionText: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.text,
  },
  carePlanContainer: {
  //  flexDirection: "flex-end",
    backgroundColor: hexToRgba(Colors.selfCare, 0.1),
    marginTop: 24,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginLeft: 10,
    borderRadius: 16,
    width: SCREEN_WIDTH * 0.6,
    maxHeight: SCREEN_HEIGHT *.2,
    alignSelf: "center"
  
  },
  carePlanTitle: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    marginBottom: 8,
    color: Colors.selfCareText,
  },
  carePlanItem: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    marginBottom: 4,
    color: Colors.selfCareText,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    maxHeight: "80%",
    backgroundColor: Colors.selfCare,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: Colors.selfCareButton,
    textAlign: "center",
  },
  closeButton: {
    marginTop: 16,
    alignSelf: "center",
    backgroundColor: Colors.selfCareButton, // Your darker brown
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  checkMark: {
    fontSize: 18,
    color: "#7A5735", // same dark brown as button
    fontWeight: "bold",
  },
});
