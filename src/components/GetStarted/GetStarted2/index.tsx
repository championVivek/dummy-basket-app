import { Image, Text, View } from "react-native";
import React from "react";
import styles from "./styles";

const GetStarted2 = () => {
  return (
    <>
      <View style={styles.upperView}>
        <Image
          source={require("../../../../assets/gs2.png")}
          style={{
            height: 300,
            width: "60%",
            resizeMode: "contain",
          }}
        />
      </View>
      <View style={styles.lowerView}>
        <Text style={styles.text1}>Secure fast decisions in taps</Text>
        <Text style={styles.text2}>
          Lorem ipsum dolor sit amet, con sectetur adipiscing elit sequat leo
          quis lorem mattis.
        </Text>
      </View>
    </>
  );
};

export default GetStarted2;
