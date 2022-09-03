import { StyleSheet } from "react-native";
import Colors from "../../common/Colors";
import fontFamily from "../../common/fontFamily";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  addCardContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  addCardText1: {
    color: Colors.fontColor,
    fontFamily: fontFamily["Roboto-Bold"],
    fontSize: 18,
    flex: 0.5,
  },
  addCardText2: {
    color: Colors.progressBarColor,
    fontFamily: fontFamily["Roboto-Regular"],
    fontSize: 18,
    paddingLeft: 10,
  },
  addCardText2Container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 0.5,
  },
  otherPaymentsHeaderText: {
    fontFamily: fontFamily["Roboto-Bold"],
    color: Colors.fontColor,
    fontSize: 18,
    marginBottom: 20,
  },
  otherPaymentContainer: {
    flexDirection: "row",
    padding: 22,
    borderRadius: 10,
    backgroundColor: Colors.appBackground,
    marginVertical: 5,
  },
  otherPaymentTitle: {
    fontFamily: fontFamily["Roboto-Regular"],
    fontSize: 18,
    color: Colors.fontColor,
  },
  otherPaymentCol1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 0.6,
  },
  otherPaymentCol2: {
    flex: 0.4,
    alignItems: "flex-end",
  },
  amtContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  amtText: {
    fontFamily: fontFamily["Roboto-Regular"],
    fontSize: 16,
    color: Colors.fontColor,
  },
  amtPrice: {
    fontFamily: fontFamily["Roboto-Bold"],
    fontSize: 16,
    color: Colors.fontColor,
  },
});

export default styles;
