import { StyleSheet } from "react-native";
import fontFamily from "../../common/fontFamily";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  blurView: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  upperView: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  lowerView: {
    flex: 0.2,
    justifyContent: "center",
  },
  text1: {
    fontFamily: fontFamily["Roboto-Bold"],
    fontSize: 36,
    color: "white",
    paddingVertical: 10,
  },
  text2: {
    fontFamily: fontFamily["Roboto-Regular"],
    fontSize: 18,
    color: "white",
    textAlign: "center",
    paddingVertical: 5,
  },
});

export default styles;
