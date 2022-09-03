import { Image, StatusBar } from "react-native";
import React from "react";
import * as Animatable from "react-native-animatable";

const SplashScreen = () => {
  return (
    <Animatable.View animation="fadeIn">
      <StatusBar hidden={true} translucent={false} />
      <Image
        source={require("../../../assets/splash_updated.png")}
        style={{
          height: "100%",
          width: "100%",
          resizeMode: "cover",
        }}
      />
    </Animatable.View>
  );
};

export default SplashScreen;
