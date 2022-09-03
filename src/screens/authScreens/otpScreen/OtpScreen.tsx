import { ScrollView, Text, View, TextInput, SafeAreaView } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import styles from "./styles";
import Header from "../../../components/Header/Header";
import AppContainer from "../../../common/AppContainer";
import { AuthScreenIcon } from "../../../../assets/svg";
import commonStyles from "../../../common/styles";
import Button from "../../../components/Button/Button";
import { Props } from "../../../../@types";

const OtpScreen = ({ navigation }: Props) => {
  const [pin, setPin] = useState<object>({
    pin1: "",
    pin2: "",
    pin3: "",
    pin4: "",
    pin5: "",
  });
  const pin1 = useRef<any>();
  const pin2 = useRef<any>();
  const pin3 = useRef<any>();
  const pin4 = useRef<any>();
  const pin5 = useRef<any>();

  useEffect(() => {
    pin1.current.focus();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={[AppContainer.container]}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 50,
        }}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <Header title="Confirm Code" navigation={navigation} />

        <View style={{ alignSelf: "center" }}>
          <AuthScreenIcon />
        </View>

        <View>
          <Text style={commonStyles.authTitle}>Enter OTP</Text>
          <View>
            <Text style={styles.otpText}>We sent a verification code to:</Text>
            <Text style={styles.phNumberText}>+44 0123456789</Text>
          </View>
          <View style={styles.otpContainer}>
            <TextInput
              keyboardType="numeric"
              onChangeText={(pin1) => {
                setPin({ pin1: pin1 });
                if (pin1 !== "") {
                  pin2.current.focus();
                }
              }}
              ref={pin1}
              maxLength={1}
              style={styles.underlineStyleBase}
            />
            <TextInput
              keyboardType="numeric"
              onChangeText={(pin2) => {
                setPin({ ...pin, pin2: pin2 });
                if (pin2 !== "") {
                  pin3.current.focus();
                }
              }}
              ref={pin2}
              maxLength={1}
              style={styles.underlineStyleBase}
            />
            <TextInput
              keyboardType="numeric"
              onChangeText={(pin3) => {
                setPin({ ...pin, pin3: pin3 });
                if (pin3 !== "") {
                  pin4.current.focus();
                }
              }}
              ref={pin3}
              maxLength={1}
              style={styles.underlineStyleBase}
            />
            <TextInput
              keyboardType="numeric"
              onChangeText={(pin4) => {
                setPin({ ...pin, pin4: pin4 });
                if (pin4 !== "") {
                  pin5.current.focus();
                }
              }}
              ref={pin4}
              maxLength={1}
              style={styles.underlineStyleBase}
            />
            <TextInput
              keyboardType="numeric"
              onChangeText={(pin5) => {
                setPin({ ...pin, pin5: pin5 });
              }}
              ref={pin5}
              maxLength={1}
              style={styles.underlineStyleBase}
            />
          </View>

          <Button title="Verify" />

          <View style={{ alignItems: "center" }}>
            <Text style={styles.links}>Send code again</Text>
            <Text style={styles.links}>Change phone number</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OtpScreen;
