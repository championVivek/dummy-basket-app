import { StyleSheet } from "react-native";
import fontFamily from "../../../common/fontFamily";

const styles = StyleSheet.create({
  text1: {
    fontFamily: fontFamily["Roboto-Bold"],
    fontSize: 38,
    color: "#FFFFFF",
    textAlign: "center",
  },
  text2: {
    fontFamily: fontFamily["Roboto-Regular"],
    fontSize: 18,
    color: "#FFFFFF",
    textAlign: "center",
    paddingVertical: 10,
  },
  lowerView: {
    flex: 0.35,
    alignItems: "center",
    paddingHorizontal: 40,
    justifyContent: "center",
  },
  upperView: {
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
    flex: 0.65,
  }
});

export default styles;
