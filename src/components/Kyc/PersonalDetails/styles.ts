import { StyleSheet } from "react-native";
import Colors from "../../../common/Colors";
import fontFamily from "../../../common/fontFamily";

const styles = StyleSheet.create({
  title: {
    fontFamily: fontFamily["Roboto-Regular"],
    color: Colors[85858580],
    fontSize: 12,
    paddingTop: 10,
  },
  btnContainer: {
    flex: 0.3,
    justifyContent: "flex-end",
    paddingBottom: 10,
  },
});

export default styles;
