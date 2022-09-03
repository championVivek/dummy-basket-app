import { StyleSheet } from "react-native";
import Colors from "../../common/Colors";
import fontFamily from "../../common/fontFamily";

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  input: {
    color: Colors.fontColor,
  },
  innerView: {
    flexDirection: "row",
    justifyContent: "center",
    borderBottomWidth: 1,
  },
  errorContainer: { paddingLeft: 40, marginBottom: 10 },
  errorText: {
    fontFamily: fontFamily["Roboto-Regular"],
    color: Colors.errorColor,
  },
  title: {
    fontFamily: fontFamily["Roboto-Regular"],
    color: Colors[85858580],
    fontSize: 14,
    paddingTop: 10,
  },
});

export default styles;
