import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import styles from "./styles";

const GetStarted3 = () => {
  return (
    <>
      <View style={styles.upperView}>
        <Image
          source={require("../../../../assets/gs3_updated.png")}
          style={{
            height: 450,
            width: "50%",
            resizeMode: "cover",
          }}
        />
      </View>
      <View style={styles.lowerView}>
        <Text style={styles.text1}>Scan and buy in 5-10minutes</Text>
        <Text style={styles.text2}>
          Lorem ipsum dolor sit amet, con sectetur adipiscing elit sequat leo
          quis lorem mattis.
        </Text>
      </View>
    </>
  );
};

export default GetStarted3;
