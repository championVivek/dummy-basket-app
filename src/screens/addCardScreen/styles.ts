import { StyleSheet } from "react-native";
import Colors from "../../common/Colors";
import fontFamily from "../../common/fontFamily";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textInputTitle: {
    color: Colors[85858580],
    fontFamily: fontFamily["Roboto-Regular"],
    fontSize: 16,
  },
  textInputStyle: {
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    width: "100%",
    fontFamily: fontFamily["Roboto-Medium"],
    color: Colors.fontColor,
    fontSize: 18,
    borderColor: Colors.disableColor,
  },
  cardExpiryCvvContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  monthYearText: {
    fontFamily: fontFamily["Roboto-Regular"],
    color: "#F7EFEE",
    fontSize: 10,
  },
});

export default styles;
