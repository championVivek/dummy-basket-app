import { StyleSheet } from "react-native";
import Colors from "../../common/Colors";
import fontFamily from "../../common/fontFamily";

const styles = StyleSheet.create({
  btnContainer: {
    flex: 0.3,
    justifyContent: "flex-end",
    paddingBottom: 10,
  },
  accTypeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  accTypeTitle: {
    fontFamily: fontFamily["Roboto-Regular"],
    fontSize: 14,
    color: Colors.disableColor,
    flex: 0.35
  },
  accTypeText: {
    fontFamily: fontFamily["Roboto-Regular"],
    fontSize: 14,
  },
  accTypeContainer: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 15,
  },
  toggleBtnContainer: {
    flexDirection: "row",
    flex: 0.65,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
});

export default styles;
