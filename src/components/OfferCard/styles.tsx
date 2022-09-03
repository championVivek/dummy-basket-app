import { StyleSheet } from "react-native";
import Colors from "../../common/Colors";
import fontFamily from "../../common/fontFamily";

const styles = StyleSheet.create({


  upperView: {
    alignItems: "center",
  },
  middleView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  upperText1: {
    fontSize: 24,
    fontFamily: fontFamily["Roboto-Regular"],
    color: Colors.btnColor,
  },
  upperText2: {
    fontSize: 42,
    fontFamily: fontFamily["Roboto-Bold"],
    color: Colors.progressBarColor,
    paddingVertical: 2,
  },
  upperText3: {
    fontSize: 14,
    fontFamily: fontFamily["Roboto-Regular"],
    color: Colors.btnColor,
  },
  middleText1: {
    fontSize: 14,
    fontFamily: fontFamily["Roboto-Regular"],
    color: Colors.btnColor,
  },
  middleText2: {
    fontSize: 20,
    fontFamily: fontFamily["Roboto-Bold"],
    color: Colors.btnColor,
  },
  box: {
    paddingVertical: 5,
  },
});

export default styles;
