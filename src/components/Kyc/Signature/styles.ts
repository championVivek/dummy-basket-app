import { StyleSheet } from "react-native";
import Colors from "../../../common/Colors";
import fontFamily from "../../../common/fontFamily";

const styles = StyleSheet.create({
  aggrementText: {
    fontFamily: fontFamily["Roboto-Regular"],
    color: Colors.fontColor,
    fontSize: 20,
    paddingRight: 20,
    marginBottom: 10,
  },
  agreementCardContainer: {
    backgroundColor: Colors.appBackground,
    width: "100%",
    height: 85,
    padding: 20,
    marginVertical: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text1Style: {
    color: Colors.fontColor,
    fontFamily: fontFamily["Roboto-Bold"],
    fontSize: 16,
  },
  text2Style: {
    color: Colors.fontColor,
    fontFamily: fontFamily["Roboto-Regular"],
    fontSize: 12,
  },
  tapDigitalSignContainer: {
    height: 200,
    width: "100%",
    borderWidth: 1,
    borderColor: "#E5EDE8",
    borderRadius: 5,
    marginTop: 10,
    padding: 20,
  },
  tapDigitalSignText2Container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tapDigitalSignText1: {
    color: "#4A4A48",
    fontFamily: fontFamily["Roboto-Bold"],
    fontSize: 12,
  },
  tapDigitalSignText2: {
    color: Colors.fontColor,
    fontFamily: fontFamily["Roboto-Bold"],
    fontSize: 25,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    color: Colors.fontColor,
    fontFamily: fontFamily["Roboto-Regular"],
    fontSize: 14,
  },
  infoText2: {
    color: Colors.fontColor,
    fontFamily: fontFamily["Roboto-Bold"],
    fontSize: 15,
    textDecorationLine: "underline",
  },
});

export default styles;
