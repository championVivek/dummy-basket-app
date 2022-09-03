import PagerView from "react-native-pager-view";
import React, { useEffect, useRef, useState } from "react";
import { ImageBackground, StatusBar, View, Text, TouchableOpacity } from "react-native";
import GetStarted1 from "../../components/GetStarted/GetStarted1";
import GetStarted2 from "../../components/GetStarted/GetStarted2";
import styles from "./styles";
import GetStarted3 from "../../components/GetStarted/GetStarted3";
import GetStarted4 from "../../components/GetStarted/GetStarted4";
import Dots from "react-native-dots-pagination";
import Colors from "../../common/Colors";
import { routename } from "../../navigation/Routes";
import EncryptedStorage from "react-native-encrypted-storage";
import * as Animatable from "react-native-animatable";
import { useDispatch, useSelector } from "react-redux";
import types from "../../redux/types";

const GetStartedScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();

  const pageRef = useRef<any>();
  const [pageIndex, setPageIndex] = useState<number>(0);

  const userToken = useSelector((state) => state.userTokenReducer.token);

  useEffect(() => {
    if (userToken) {      
      navigation.replace(routename.PaymentMethodScreen);
    }
  }, [userToken]);

  const handleSkip = async () => {
    navigation.navigate(routename.SignupScreen);
  };

  const handleLogout = async () => {
    try {
      await EncryptedStorage.removeItem("@access_token");
      await EncryptedStorage.removeItem("@stripe-customer-id");

      dispatch({
        type: types.USER_TOKEN,
        payload: null,
      });
      navigation.navigate(routename.LoginScreen);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Animatable.View animation="fadeIn" duration={1000} style={{ flex: 1 }}>
      <StatusBar hidden />
      <ImageBackground
        source={require("../../../assets/updated_blur_background.png")}
        resizeMode="cover"
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(0,0,0,0.0)",
        }}
      >
        <View style={styles.skipContainer}>
          <TouchableOpacity
            hitSlop={{
              top: 30,
              left: 30,
              right: 30,
            }}
            onPress={handleSkip}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop: 20 }} onPress={handleLogout}>
            <Text style={{ color: "black" }}>Logout</Text>
          </TouchableOpacity>
        </View>
        <PagerView ref={pageRef} onPageSelected={({ nativeEvent }) => setPageIndex(nativeEvent.position)} style={{ flex: 0.8 }} initialPage={0}>
          <View key={1}>
            <GetStarted1 />
          </View>
          <View key={2}>
            <GetStarted2 />
          </View>
          <View key={3}>
            <GetStarted3 />
          </View>
          <View key={4}>
            <GetStarted4 />
          </View>
        </PagerView>
        <View
          style={{
            flex: 0.1,
          }}
        >
          <Dots
            length={4}
            activeDotHeight={10}
            activeDotWidth={10}
            passiveDotHeight={8}
            passiveDotWidth={8}
            marginHorizontal={4}
            alignDotsOnXAxis
            activeColor={Colors.progressBarColor}
            active={pageIndex}
          />
        </View>
      </ImageBackground>
    </Animatable.View>
  );
};

export default GetStartedScreen;
