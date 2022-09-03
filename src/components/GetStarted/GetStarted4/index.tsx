import { Image, Text, View } from "react-native";
import React from "react";
import styles from "./styles";

const GetStarted4 = () => {
  return (
    <>
      <View style={styles.upperView}>
        <Image
          source={require("../../../../assets/gs4.png")}
          style={{
            height: 450,
            width: "100%",
            resizeMode: "cover",
          }}
        />
      </View>
      <View style={styles.lowerView}>
        <Text style={styles.text1}>Manage your payments</Text>
        <Text style={styles.text2}>
          Lorem ipsum dolor sit amet, con sectetur adipiscing elit sequat leo
          quis lorem mattis.
        </Text>
      </View>
    </>
  );
};

export default GetStarted4;
