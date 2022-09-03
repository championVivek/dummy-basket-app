import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../common/Colors";
import fontFamily from "../../common/fontFamily";

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: Colors.disableColor,
    borderBottomWidth: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  table1Text1: {
    fontFamily: fontFamily["Roboto-Regular"],
    fontSize: 14,
    color: Colors.tblTitleColor,
  },
  table1Text2: {
    fontFamily: fontFamily["Roboto-Medium"],
    fontSize: 16,
    color: Colors.progressBarColor,
  },
  tbl2TitleContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  tbl2TitleStyle: {
    fontFamily: fontFamily["Roboto-Bold"],
    fontSize: 17,
    color: Colors.fontColor,
  },
  tbl2SubTitleStyle: {
    fontSize: 12,
    fontFamily: fontFamily["Roboto-Regular"],
    color: Colors.btnColor,
  },
  tbl2Details: {
    fontSize: 12,
    paddingLeft: 25,
    paddingVertical: 15,
    fontFamily: fontFamily["Roboto-Regular"],
    color: Colors.lineColor,
  },
  tbl2Text1: {
    flex: 0.63,
    paddingLeft: 5,
    fontFamily: fontFamily["Roboto-Regular"],
    color: Colors.btnColor,
  },
  tbl2Text2: {
    flex: 0.3,
    textAlign: "right",
    fontFamily: fontFamily["Roboto-Bold"],
    color: Colors.fontColor,
  },
  descriptionText: {
    color: Colors.btnColor,
    textAlign: "center",
    padding: 10,
  },
  middleView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  box: {
    paddingVertical: 10,
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
  }
});

export default styles;
