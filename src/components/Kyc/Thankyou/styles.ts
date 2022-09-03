import { StyleSheet } from "react-native";
import Colors from "../../../common/Colors";
import fontFamily from "../../../common/fontFamily";
import {heightLessNum} from "../../../common/AppDimensions"

const styles = StyleSheet.create({
  text: {
    color: Colors.fontColor,
    fontSize: 17,
    fontFamily: fontFamily["Roboto-Regular"],
  },
  checkdContainer: {
   paddingVertical: 30
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10
  },
  container1: {
    flex: heightLessNum ? 0.85 : 0.9
  },
  container2: {
    flex: heightLessNum ? 0.15: 0.1,
    justifyContent: "center"
  }
});

export default styles;
