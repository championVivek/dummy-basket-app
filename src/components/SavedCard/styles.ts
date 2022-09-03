import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../common/Colors";
import fontFamily from "../../common/fontFamily";

const width = Dimensions.get("window").width;

    const styles = StyleSheet.create({
        container: {
            flex: 0,
            borderRadius: 15,
            padding: 20,
        },
        noCardContainer: {
            backgroundColor: Colors.appBackground,
            height: 215,
            width: width / 1.23,
            borderRadius: 15,
            padding: 20,
            alignItems: 'center',
            justifyContent: 'center'
        },
        cardNumberContainer: {
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            paddingVertical: 15,
        },
        cardNumberText: {
            fontSize: 28,
            color: "#fff",
            textTransform: "uppercase",
            fontFamily: fontFamily["Roboto-Bold"],
        },
        cardStarText: {
            fontSize: 28,
            color: "#fff",
            textTransform: "uppercase",
            fontFamily: fontFamily["Roboto-Regular"],
            letterSpacing: 1.5,
        },
        cardDetailsContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 20,
            paddingBottom: 5,
        
    paddingHorizontal: 5,
  },
  detailText1: {
    fontFamily: fontFamily["Roboto-Light"],
    color: "#fff",
    fontSize: 12,
  },
  detailText2: {
    fontFamily: fontFamily["Roboto-Bold"],
    color: "#fff",
    fontSize: 12,
    paddingTop: 5,
  },
  noCardText: {
    fontFamily: fontFamily["Roboto-Regular"],
    fontSize: 18,
    color: Colors.disableColor,
  },
});

export default styles;
