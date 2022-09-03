import { View, Text, StatusBar, SafeAreaView, ScrollView, ImageBackground } from "react-native";
import React, { useState } from "react";
import Header from "../../components/Header/Header";
import AppContainer from "../../common/AppContainer";
import styles from "./styles";
import PagerView from "react-native-pager-view";
import Dots from "react-native-dots-pagination";
import Colors from "../../common/Colors";
import Button from "../../components/Button/Button";
import fontFamily from "../../common/fontFamily";
import { routename } from "../../navigation/Routes";
import EncryptedStorage from "react-native-encrypted-storage";
import types from "../../redux/types";
import { useSelector, useDispatch } from "react-redux";
import { isTokenValid, refreshToken, userInfo } from "../../utils/authoService";

const ScanSuccessScreen = ({ navigation }) => {
  const { businessAccount } = useSelector((state) => state.productDataReducer);

  const [imageIndex, setImageindex] = useState<number>(0);
  const [error, setError] = useState<boolean>(false)
  const dispatch = useDispatch();




  const getImages = () => {
    return (
      <View>
        <ImageBackground
          source={require('../../../assets/car.png')}
          resizeMode="contain"
          style={{
            width: '100%',
            height: 250,
          }}
        />
      </View>
    );
  };

  const handleConfirm = async () => {
    try {
      const token = await EncryptedStorage.getItem("@access_token");
      const tokenRefresh = await EncryptedStorage.getItem("@refresh_token");

      if (token && !isTokenValid(token) && tokenRefresh) {
        try {
          const credentials = await refreshToken(tokenRefresh);

          const userProfile = await userInfo(credentials.accessToken);

          await EncryptedStorage.setItem("@user_profile", JSON.stringify(userProfile));
          await EncryptedStorage.setItem("@access_token", credentials.accessToken);
          await EncryptedStorage.setItem("@refresh_token", credentials.refreshToken ? credentials.refreshToken : "null");

          await dispatch({
            type: types.USER_TOKEN,
            payload: credentials.accessToken,
          });
          navigation.replace(routename.PaymentMethodScreen);
        } catch (err) {
          navigation.navigate(routename.LoginScreen);
        }
      } else if (token) {
        await dispatch({
          type: types.USER_TOKEN,
          payload: token,
        });

        navigation.navigate(routename.PaymentMethodScreen);
      } else {
        navigation.navigate(routename.GetStartedScreen);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar hidden={false} barStyle="dark-content" backgroundColor={"#fff"} />
      {error && (
        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: "white",
            zIndex: 22,
          }}
        >
          <Text style={{ color: "black" }}>Product not found</Text>
        </View>
      )}
      <ScrollView bounces={false} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ height: 200 }}>
          <ImageBackground source={require("../../../assets/Dealer.png")} resizeMode="cover" style={styles.imageBackground}>
            <View style={styles.imgOverlay}>
              <View style={[AppContainer.container, { flex: 1 }]}>
                <View style={{ flex: 0.3 }}>
                  <Header navigation={navigation} title="Confirm Scan" color="#fff" rightIcon={false} />
                </View>
                <View style={{ justifyContent: "center", flex: 0.7, zIndex: 2 }}>
                  <Text style={styles.headerText1}>{businessAccount?.legalName}</Text>
                  <Text style={styles.headerText2}>
                    {`${businessAccount?.registeredAddress?.address1}, ${businessAccount?.registeredAddress?.city}, ${businessAccount?.registeredAddress?.postcode}`}
                  </Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.lowerView}>
          <View style={styles.lowerUpper}>
            <View style={styles.lowerUpperTextContainer}>
              <Text style={styles.lowerUpperText1}>Car</Text>
              <View style={styles.lowerUpperText2Container}>
                <Text style={styles.lowerUpperText2}>T12</Text>
              </View>
              <View style={styles.lowerUpperText3Container}>
                <Text style={styles.lowerUpperText3}>2012</Text>
                <Text style={styles.lowerUpperText3}>45kmph</Text>
                <Text style={styles.lowerUpperText3}>India</Text>
              </View>
            </View>
            <View>
              <PagerView style={{ height: 230 }} onPageScroll={(e: any) => setImageindex(e.nativeEvent.position)} initialPage={0} scrollEnabled={true}>
                <>{getImages()}</>
              </PagerView>
              <Dots
                length={1}
                activeDotHeight={10}
                activeDotWidth={10}
                passiveDotHeight={8}
                passiveDotWidth={8}
                marginHorizontal={4}
                activeColor={Colors.tblTitleColor}
                active={imageIndex}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 20,
                paddingVertical: 40,
              }}
            >
              <View style={{ width: "60%" }}>
                <Button
                  title="CONFIRM & BUY"
                  onPress={handleConfirm}
                  customStyle={{
                    borderRadius: 5,
                    width: "100%",
                  }}
                  font_family={fontFamily["Roboto-Medium"]}
                />
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={styles.lowerUpperPrice1}>was £55,400</Text>
                <Text style={styles.lowerUpperPrice2}>564</Text>
                <Text style={styles.lowerUpperPrice3}>or £254.33* / month</Text>
              </View>
            </View>
          </View>
          <View style={styles.colorTilt} />
          <View style={styles.lowerLower}>
            <View>
              <View>
                <Text style={styles.lowerLowerHeader}>Key Features</Text>
              </View>
              <View>
                <View style={styles.lowerLowerTextContainer}>
                  <View style={{ flex: 0.6 }}>
                    (
                    <>
                      <Text style={styles.lowerLowerText1}>Engine</Text>
                      <Text style={styles.lowerLowerText2}>New</Text>
                    </>
                    )
                  </View>
                  <View style={{ flex: 0.4 }}>
                    (
                    <>
                      <Text style={styles.lowerLowerText1}>Transmission</Text>
                      <Text style={styles.lowerLowerText2}>Auto</Text>
                    </>
                    )
                  </View>
                </View>
                <View style={styles.lowerLowerTextContainer}>
                  <View style={{ flex: 0.6 }}>
                    (
                    <>
                      <Text style={styles.lowerLowerText1}>Exterior Color</Text>
                      <Text style={styles.lowerLowerText2}>Silver</Text>
                    </>
                    )
                  </View>
                  <View style={{ flex: 0.4 }}>
                    (
                    <>
                      <Text style={styles.lowerLowerText1}>Interior Color</Text>
                      <Text style={styles.lowerLowerText2}>Classy black</Text>
                    </>
                    )
                  </View>
                </View>
                <View style={styles.lowerLowerTextContainer}>
                  <View style={{ flex: 0.6 }}>
                    (
                    <>
                      <Text style={styles.lowerLowerText1}>Wheels</Text>
                      <Text style={styles.lowerLowerText2}>Normal</Text>
                    </>
                    )
                  </View>
                  <View style={{ flex: 0.4 }}>
                    (
                    <>
                      <Text style={styles.lowerLowerText1}>Package</Text>
                      <Text style={styles.lowerLowerText2}>Existing</Text>
                    </>
                    )
                  </View>
                </View>
                <View style={styles.lowerLowerTextContainer}>
                  <View style={{ flex: 0.4 }}>
                    (
                    <>
                      <Text style={styles.lowerLowerText1}>Fuel Type</Text>
                      <Text style={styles.lowerLowerText2}>Electric</Text>
                    </>
                    )
                  </View>
                  <View style={{ flex: 0.4 }}>
                    (
                    <>
                      <Text style={styles.lowerLowerText1}>Body Style</Text>
                      <Text style={styles.lowerLowerText2}>Metallic</Text>
                    </>
                    )
                  </View>
                </View>
              </View>
            </View>
            <View style={{ marginTop: 40 }}>
              <View>
                <Text style={styles.lowerLowerHeader}>Vehicle Details</Text>
              </View>
              <View>
                <View style={styles.lowerLowerTextContainer}>
                  <View style={{ flex: 0.6 }}>
                    <Text style={styles.lowerLowerText1}>Registration Country</Text>
                    <Text style={styles.lowerLowerText2}>India</Text>
                  </View>
                </View>
                (
                <View style={styles.lowerLowerTextContainer}>
                  <View style={{ flex: 0.6 }}>
                    <>
                      <Text style={styles.lowerLowerText1}>First Registration Date</Text>
                      <Text style={styles.lowerLowerText2}>24-5-2020</Text>
                    </>
                  </View>
                </View>
                )
                (
                <>
                  <View style={[styles.lowerLowerTextContainer, { borderBottomWidth: 0 }]}>
                    <View style={{ flex: 0.6 }}>
                      <Text style={styles.lowerLowerText1}>License Plate Number</Text>
                      <Text style={styles.lowerLowerText2}>123456</Text>
                    </View>
                  </View>
                </>
                )
                (
                <>
                  <View style={[styles.lowerLowerTextContainer, { borderBottomWidth: 0 }]}>
                    <View style={{ flex: 0.6 }}>
                      <Text style={styles.lowerLowerText1}>Engine Number</Text>
                      <Text style={styles.lowerLowerText2}>12346798</Text>
                    </View>
                  </View>
                </>
                )
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScanSuccessScreen;
