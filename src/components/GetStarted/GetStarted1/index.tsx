import { View, Image, Text } from "react-native";
import React from "react";
import styles from "./styles";

const GetStarted1 = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.upperView}>
        <Image
          source={require("../../../../assets/gs1_2.png")}
          style={{
            height: 230,
            width: 120,
          }}
        />
        <Image
          source={require("../../../../assets/gs1_1.png")}
          style={{
            height: 450,
            width: "55%",
            left: 100,
            zIndex: 1,
            position: "absolute",
          }}
        />
        <Image
          source={require("../../../../assets/gs1_3.png")}
          style={{
            height: 230,
            width: 120,
          }}
        />
      </View>
      <View style={styles.lowerView}>
        <Text style={styles.text1}>Apply for finance and checkout</Text>
        <Text style={styles.text2}>
          Lorem ipsum dolor sit amet, con sectetur adipiscing elit sequat leo
          quis lorem mattis.
        </Text>
      </View>
    </View>
  );
};

export default GetStarted1;
