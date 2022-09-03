import { StyleSheet } from "react-native";
import Colors from "../../common/Colors";
import fontFamily from "../../common/fontFamily";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  subContainer: {
    flex: 0.7,
    justifyContent: "center",
  },
  img: {
    height: 300,
    width: 300,
  },
  text2: {
    fontFamily: fontFamily["Roboto-Regular"],
    color: Colors.fontColor,
    fontSize: 16,
  },
  text1: {
    fontFamily: fontFamily["Roboto-Bold"],
    color: Colors.fontColor,
    fontSize: 20,
  },
});

export default styles;
