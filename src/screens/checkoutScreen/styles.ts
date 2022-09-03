import { StyleSheet } from "react-native";
import { SCREEN_HEIGHT } from "../../common/AppDimensions";
import Colors from "../../common/Colors";
import fontFamily from "../../common/fontFamily";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // height: SCREEN_HEIGHT,
  },
  upperContainer: {
    height: SCREEN_HEIGHT / 5,
  },
  upperImgStyle: {
    height: 200,
    alignSelf: 'center',
    width: "200%",
    resizeMode: "contain",
    marginTop: -110,
    marginBottom: -30 
   },
  checkedBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#F7EFEE",
    padding: 15,
    marginVertical: 20,
  },
  payTypeTitle: {
    fontSize: 18,
    color: Colors.fontColor,
    fontFamily: fontFamily["Roboto-Bold"],
  },
  payTypeDesc: {
    fontSize: 12,
    fontFamily: fontFamily["Roboto-Regular"],
    color: Colors.disableColor,
  },
  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    paddingVertical: 5,
    borderBottomColor: Colors.disableColor,
  },
  additionalInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  listHeader: {
    color: Colors.progressBarColor,
    fontFamily: fontFamily["Roboto-Bold"],
    fontSize: 16,
    paddingBottom: 5,
    marginTop: 10,
  },
  listBoldTxt: {
    fontFamily: fontFamily["Roboto-Bold"],
    color: Colors.fontColor,
    fontSize: 16,
  },
  listNameText: {
    fontFamily: fontFamily["Roboto-Regular"],
    color: Colors.fontColor,
    fontSize: 16,
  },
  additionalInfoName: {
    fontFamily: fontFamily["Roboto-Bold"],
    fontSize: 14,
    color: Colors.fontColor,
  },
  additionalInfoValue: {
    fontFamily: fontFamily["Roboto-Regular"],
    color: Colors.fontColor,
    fontSize: 14,
  },
  error: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 898,
    backgroundColor: "rgba(0,0,0,0.3)",
  }
});

export default styles;
