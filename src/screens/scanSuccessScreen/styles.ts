import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../common/Colors";
import fontFamily from "../../common/fontFamily";

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const styles = StyleSheet.create({
  imageBackground: {
    height: "100%",
    width: SCREEN_WIDTH,
  },
  imgOverlay: {
   position: "absolute",
   top: 0,
   bottom: 0,
   right: 0,
   left: 0,
   backgroundColor: 'rgba(50, 70, 94, 0.5)',
   zIndex: 0
  },
  headerText1: {
    color: "#fff",
    fontSize: 30,
    paddingVertical: 5,
    zIndex: 2,
    fontFamily: fontFamily["Roboto-Bold"],
  },
  headerText2: {
    color: "#fff",
    zIndex: 2,
    fontSize: 18,
    fontFamily: fontFamily["Roboto-Bold"],
  },
  lowerView: {
    flex: 1,
    marginTop: -13,
    width: SCREEN_WIDTH,
  },
  lowerUpper: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#fff'
  },
  lowerLower: {
    padding: 20,
    backgroundColor: Colors.appBackground
  },
  colorTilt: {
    height: 50,
    marginTop: -5,
    borderTopWidth: 50,
    borderTopColor: "white",
    borderRightWidth: SCREEN_WIDTH,
    borderRightColor: Colors.appBackground,
  },
  lowerUpperText1: {
    fontFamily: fontFamily["Roboto-Bold"],
    fontSize: 30,
    color: Colors.tblTitleColor
  },
  lowerUpperText2: {
    fontSize: 16,
    fontFamily: fontFamily["Roboto-Light"],
    color: Colors.tblTitleColor
  },
  lowerUpperText2Container: {
    paddingRight: 70,
    paddingVertical: 4
  },
  lowerUpperText3: {
    fontSize: 12,
    fontFamily: fontFamily["Roboto-Light"],
    color: Colors.tblTitleColor
  },
  lowerUpperText3Container: {
    // paddingRight: 120
  },
  lowerUpperTextContainer: {
    paddingLeft: 25,
    paddingTop: 50,
    paddingBottom: 20
  },
  lowerUpperPrice1: {
    fontFamily: fontFamily["Roboto-Regular"],
    color: Colors.tblTitleColor,
    fontSize: 15
  },
  lowerUpperPrice2: {
    fontFamily: fontFamily["Roboto-Bold"],
    color: Colors.tblTitleColor,
    fontSize: 31
  },
  lowerUpperPrice3: {
    fontFamily: fontFamily["Roboto-Regular"],
    color: Colors.tblTitleColor,
    fontSize: 12
  },
  lowerLowerHeader: {
    fontFamily: fontFamily["Roboto-Bold"],
    color: Colors.tblTitleColor,
    fontSize: 25
  },
  lowerLowerText1: {
    fontFamily: fontFamily["Roboto-Medium"],
    fontSize: 18,
    color: Colors["43494ECC"]
  },
  lowerLowerText2: {
    fontFamily: fontFamily["Roboto-Light"],
    fontSize: 16,
    color: Colors["43494ECC"]
  },
  lowerLowerTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.disableColor,
    paddingVertical: 20
  }
});

export default styles;
