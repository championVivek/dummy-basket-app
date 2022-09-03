import { StyleSheet } from "react-native";
import Colors from "../../../common/Colors";
import fontFamily from "../../../common/fontFamily";

const styles = StyleSheet.create({
  subTitle: {
    fontFamily: fontFamily["Roboto-Regular"],
    color: Colors.fontColor,
    fontSize: 16,
    paddingTop: 10,
  },
  container: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: Colors.disableColor,
    marginVertical: 1.5,
  },
  leftIconContainer: {
    height: 70,
    width: 70,
    backgroundColor: Colors.btnColor,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  typeText: {
    fontSize: 16,
    fontFamily: fontFamily["Roboto-Regular"],
    color: Colors.fontColor,
  },
});

export default styles;
