import React from "react";
import styles from "./styles";
import LinearGradient from "react-native-linear-gradient";
import { Text, View } from "react-native";

interface Props {
  children: JSX.Element;
  offerTitle: string;
}

const GradientCard: React.FC<Props> = ({ children, offerTitle }) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.offerWrapper}>
          <Text style={styles.offerTitle}>{offerTitle}</Text>
        </View>
        <LinearGradient
          colors={["#FFFFFF", "#F3F4F6"]}
          style={styles.gradientStyle}
        >
          {children}
        </LinearGradient>
      </View>
    </>
  );
};

export default GradientCard;
